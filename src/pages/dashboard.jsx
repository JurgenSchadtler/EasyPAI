/**
 * @file dashboard.jsx
 * @description Dashboard component responsible for rendering the dashboard page of the application.
 * @author jhludwolf
 * @created May 18, 2023
 */

import Layout from "../components/layout";
import "../style/dashboard.css";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper";

import avatars from "../resources/avatars.json";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { FaPeopleArrows } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { createClient } from "@supabase/supabase-js";
import log from "loglevel";

const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNueGlhZ2p6dHppYnRseGRjcXNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyMTQzMDIsImV4cCI6MjAyODc5MDMwMn0.1EcVnTcPW1UoFQLpP4zubKVkpPLMTd5D8n8UtYuNmqI";
const API_URL =
  "https://cnxiagjztzibtlxdcqsa.supabase.co/rest/v1/transfers?select=*";
const USER_URL =
  "https://cnxiagjztzibtlxdcqsa.supabase.co/rest/v1/user?select=*";

const Dashboard = () => {
  const color_palette = ["#646cff", "#8c84ff", "#a798ff", "#bfaeff", "#d8d3ff"];
  const storedUser = localStorage.getItem("username");
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);

  const saved_accounts = [
    "Jürgen Schadtler",
    "José Luis Lobera",
    "JoMi de la Mora",
    "Aurora Cruz",
    "Leo Donovan",
  ];

  const saved_numbers = [
    "**** 4832",
    "**** 4125",
    "**** 8145",
    "**** 4242",
    "**** 4924",
  ];

  const navigate = useNavigate();

  const onCardClick = (n) => {
    log.info("Welcome to the dashboard");
    navigate("/transfer", {
      state: { savedAccount: saved_accounts[n], accNum: saved_numbers[n] },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            apikey: API_KEY,
            Authorization: `Bearer ${API_KEY}`,
          },
        });

        const filteredData = response.data.filter(
          (item) => item.byUser === storedUser
        );

        setData(filteredData);
      } catch (error) {
        log.error("Error:", error);
      }
    };

    fetchData();
  }, []);
  /* 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(USER_URL, {
          headers: {
            apikey: API_KEY,
            Authorization: `Bearer ${API_KEY}`,
          },
        });

        setUser(response.data);
        log.debug("Debug user: ", response.data);
      } catch (error) {
        log.error("Error:", error);
      }
    };

    fetchData();
  }, []); */

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await axios.get(USER_URL, {
          headers: {
            apikey: API_KEY,
            Authorization: `Bearer ${API_KEY}`,
          },
        });

        // Filter the received user data to match the user from local storage
        const matchedUser = response.data.find(
          (u) => u.username === storedUser
        );

        setUser(matchedUser);
        console.log(matchedUser);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData1();
  }, []);

  const handleViewAll = () => {
    navigate("/expenses");
  };

  const handleViewBalance = () => {
    navigate("/balance");
  };

  return (
    <Layout>
      <div className="dashboard-div">
        <h1 className="dashboard-h1">{user[0]?.name}</h1>
        <p className="dashboard-welcome-p">Welcome Back!</p>

        <div className="dashboard-balance-div" onClick={handleViewBalance}>
          <p className="balance-tag">Current balance</p>
          <p className="balance-value">
            {user?.balance?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>

        <p className="dashboard-send-money-tag">Send money to</p>

        <>
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
          >
            {[0, 1, 2, 3, 4].map((n) => (
              <SwiperSlide
                style={{ backgroundColor: color_palette[n] }}
                key={`key-${n}`}
                className=""
                onClick={() => onCardClick(n)}
              >
                <Container>
                  <Row>
                    <Col xs={3}>
                      <img
                        src={avatars.avatars[n]}
                        height="60px"
                        style={{ marginRight: "0.5rem" }}
                      />
                    </Col>
                    <Col
                      xs={9}
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <span className="text-with-shadow">
                        {saved_accounts[n]}
                      </span>
                      <span className="account-number text-with-shadow">
                        {saved_numbers[n]}
                      </span>
                    </Col>
                  </Row>
                </Container>
              </SwiperSlide>
            ))}
          </Swiper>
        </>

        <Container
          fluid
          style={{ marginTop: "1rem" }}
          className="expenses-container"
        >
          <Row>
            <Col xs={6}>
              <p className="expenses-header">Expenses</p>
            </Col>
            <Col xs={6}>
              <div className="expenses-view-all-div">
                <button
                  className="expenses-view-all-button"
                  onClick={handleViewAll}
                >
                  View all
                </button>
              </div>
            </Col>
          </Row>
          <div className="expenses-div">
            {data.map((item, index) => {
              const trimmedDate = item.created_at
                .substring(2, 10)
                .replace(/-/g, "/");
              return (
                <Row className="expenses-row" key={`key-${index}`}>
                  <Col xs={3}>
                    <div className="expenses-icon-div">
                      <FaPeopleArrows className="expenses-icon" />
                    </div>
                  </Col>
                  <Col xs={6} className="expenses-info-div">
                    <div>
                      <p className="expenses-title">{item.description}</p>
                      <p className="expenses-date">{trimmedDate}</p>
                    </div>
                  </Col>
                  <Col xs={3} className="expenses-info-div">
                    <p className="expenses-amount">
                      {item.ammount.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </p>
                  </Col>
                </Row>
              );
            })}
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default Dashboard;
