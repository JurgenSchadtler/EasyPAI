import React from "react";
import Layout from "../components/layout";
import "../style/dashboard.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper";

import avatars from "../resources/avatars.json";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { BsBank } from "react-icons/bs";

const Dashboard = () => {
  const color_palette = [
    "#646cff",
    "#8c84ff",
    "#a798ff",
    "#bfaeff",
    "#d8d3ff",
    "#f0efff",
  ];

  const saved_accounts = [
    "José Luis",
    "Miles Archer",
    "Stella Blake",
    "Aurora Cruz",
    "Leo Donovan",
    "Scarlett Knight",
  ];

  return (
    <Layout>
      <div className="dashboard-div">
        <h1 className="dashboard-h1">Jürgen</h1>
        <p className="dashboard-welcome-p">Welcome Back!</p>

        <div className="dashboard-balance-div">
          <p className="balance-tag">Current balance</p>
          <p className="balance-value">$2,090.20</p>
        </div>

        <p className="dashboard-send-money-tag">Send money to</p>

        <>
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
          >
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <SwiperSlide style={{ backgroundColor: color_palette[n] }}>
                <img
                  src={avatars.avatars[n]}
                  height="60px"
                  style={{ marginRight: "0.5rem" }}
                />
                <span className="text-with-shadow">{saved_accounts[n]}</span>
              </SwiperSlide>
            ))}
          </Swiper>
        </>

        <Container fluid style={{ marginTop: "1rem" }} className="">
          <Row className="expenses-row">
            <Col xs={6}>
              <p className="expenses-header">Expenses</p>
            </Col>
            <Col xs={6}>
              <div className="expenses-view-all-div">
                <button className="expenses-view-all-button">View all</button>
              </div>
            </Col>
          </Row>
          <Row className="expenses-row">
            <Col xs={3}>
              <div className="expenses-icon-div">
                <BsBank className="expenses-icon" />
              </div>
            </Col>
            <Col xs={6} className="expenses-info-div">
              <div>
                <p className="expenses-title">Grocery</p>
                <p className="expenses-date">18-05-2023</p>
              </div>
            </Col>
            <Col xs={3} className="expenses-info-div">
              <p className="expenses-amount">$25</p>
            </Col>
          </Row>
		  <Row className="expenses-row">
            <Col xs={3}>
              <div className="expenses-icon-div">
                <BsBank className="expenses-icon" />
              </div>
            </Col>
            <Col xs={6} className="expenses-info-div">
              <div>
                <p className="expenses-title">Cinema</p>
                <p className="expenses-date">16-05-2023</p>
              </div>
            </Col>
            <Col xs={3} className="expenses-info-div">
              <p className="expenses-amount">$9.9</p>
            </Col>
          </Row>
		  <Row className="expenses-row">
            <Col xs={3}>
              <div className="expenses-icon-div">
                <BsBank className="expenses-icon" />
              </div>
            </Col>
            <Col xs={6} className="expenses-info-div">
              <div>
                <p className="expenses-title">Income</p>
                <p className="expenses-date">10-05-2023</p>
              </div>
            </Col>
            <Col xs={3} className="expenses-info-div">
              <p className="expenses-amount">$69</p>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

export default Dashboard;
