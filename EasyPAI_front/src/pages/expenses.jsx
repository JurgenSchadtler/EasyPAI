import React from "react";
import Layout2 from "../components/layout2";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { BsBank } from "react-icons/bs";

import "../style/expenses.css";

const Expenses = () => {
  return (
    <Layout2>
      <h1 className="tranfer-header">Expenses</h1>

      <Container fluid style={{ marginTop: "1rem" }} className="">
        <div className="expenses-full-div">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <Row className="expenses-full-row" key={`key-${n}`}>
              <Col xs={3}>
                <div className="expenses-full-icon-div">
                  <BsBank className="expenses-full-icon" />
                </div>
              </Col>
              <Col xs={6} className="expenses-full-info-div">
                <div>
                  <p className="expenses-full-title">Grocery</p>
                  <p className="expenses-full-date">18-05-2023</p>
                </div>
              </Col>
              <Col xs={3} className="expenses-full-info-div">
                <p className="expenses-full-amount">$25</p>
              </Col>
            </Row>
          ))}
        </div>
      </Container>
    </Layout2>
  );
};

export default Expenses;
