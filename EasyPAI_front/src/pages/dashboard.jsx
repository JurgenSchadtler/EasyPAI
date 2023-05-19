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
import { useNavigate } from "react-router-dom";

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
    "José Luis Lobera",
    "Miles Archer",
    "Stella Blake",
    "Aurora Cruz",
    "Leo Donovan",
    "Scarlett Knight",
  ];

  const navigate = useNavigate();

  const onCardClick = (n) => {
    console.log(`Click on card no. ${n}`);
	navigate('/transfer');
  };

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
                        **** 4832
                      </span>
                    </Col>
                  </Row>
                </Container>
              </SwiperSlide>
            ))}
          </Swiper>
        </>

        <Container fluid style={{ marginTop: "1rem" }} className="">
          <Row>
            <Col xs={6}>
              <p className="expenses-header">Expenses</p>
            </Col>
            <Col xs={6}>
              <div className="expenses-view-all-div">
                <button className="expenses-view-all-button">View all</button>
              </div>
            </Col>
          </Row>
          <div className="expenses-div">
            {[0, 1, 2, 3, 4, 5, 6].map((n) => (
              <Row className="expenses-row" key={`key-${n}`}>
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
            ))}
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default Dashboard;
