import React, {useState, useEffect} from "react";
import Layout2 from "../components/layout2";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { FaPeopleArrows } from "react-icons/fa";

import "../style/expenses.css";


const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1namdsa2xkeHpnbnRqbGRtcGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ1MTUzOTMsImV4cCI6MjAwMDA5MTM5M30.12PsI2OKWJVKXOACa4dXV6jU-nAO8QUVDKooqnjQ1Xc';
const API_URL = 'https://mgjglkldxzgntjldmpgn.supabase.co/rest/v1/transfers?select=*';

const Expenses = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            apikey: API_KEY,
            Authorization: `Bearer ${API_KEY}`
          }
        });

        setData(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };


    fetchData();
  }, []);

  return (
    <Layout2>
      <h1 className="tranfer-header">Expenses</h1>

      <Container fluid style={{ marginTop: "1rem" }} className="">
        <div className="expenses-full-div">
          {data.map((item, index) => {
            const trimmedDate = item.created_at.substring(2, 10).replace(/-/g, '/');
            return (
              <Row className="expenses-full-row" key={`key-${index}`}>
                <Col xs={3}>
                  <div className="expenses-full-icon-div">
                    <FaPeopleArrows className="expenses-full-icon" />
                  </div>
                </Col>
                <Col xs={6} className="expenses-full-info-div">
                  <div>
                    <p className="expenses-full-title">{item.description}</p>
                    <p className="expenses-full-date">{trimmedDate}</p>
                  </div>
                </Col>
                <Col xs={3} className="expenses-full-info-div">
                  <p className="expenses-full-amount">{item.ammount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                </Col>
              </Row>
            );
          })}
        </div>
      </Container>
    </Layout2>
  );
};

export default Expenses;
