import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";

import "../style/transfer.css";
import "../style/index.css";
import { useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import avatars from "../resources/avatars.json";

const Transfer = () => {
  const balance = 2090.2;
  const [amount, setAmount] = useState("0.00");
  const [canTransfer, setCanTransfer] = useState(true);

  const navigate = useNavigate();

  const onReturnClick = () => {
    navigate("/");
  };

  const onKeyboardClick = (symbol) => {
    let currentAmount = parseFloat(amount.replace(/,/g, "")); // Remove comma and parse as float

    if (symbol === -1) {
      // Handle special case for decimal point
      currentAmount = currentAmount / 10;
    } else {
      currentAmount = currentAmount * 10 + symbol / 100;
    }

    currentAmount > balance ? setCanTransfer(false) : setCanTransfer(true);
    setAmount(formatAmount(currentAmount));
  };

  const formatAmount = (amount) => {
    // Convert the amount to a formatted string with comma for thousands separator
    const formattedAmount = amount
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formattedAmount;
  };

  const symbols = [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, -1];

  return (
    <div className="transfer-div">
      <div className="transfer-header-div">
        <BiArrowBack className="back-icon" onClick={onReturnClick} />
      </div>
      <div className="transfer-main-div">
        <h1 className="tranfer-header">Send Money</h1>

        <div
          className={`${
            canTransfer ? "" : "transfer-error"
          }`}
        >
          <div className="transfer-input-div">
            <p className="transfer-input-amount">
              <span className="tranfer-dollar-sign">$</span>
              {amount}
            </p>
          </div>
          <p className="transfer-balance">Balance: ${formatAmount(balance)}</p>
        </div>

        <div className="tranfer-user-card-div">
          <Container>
            <Row>
              <Col xs={3}>
                <img
                  src={avatars.avatars[0]}
                  height="60px"
                  style={{ marginRight: "0.5rem" }}
                />
              </Col>
              <Col xs={9} style={{ display: "flex", flexDirection: "column" }}>
                <span className="card-text">José Luis Lobera</span>
                <span className="account-number">**** 4832</span>
              </Col>
            </Row>
          </Container>
        </div>

        <button className="transfer-button">Confirm</button>

        <div className="keyboard-div">
          <Container>
            <Row>
              {symbols.map((symbol, i) => (
                <Col xs={4} key={`key-${i}`} className="keyboard-col">
                  <div
                    className="keyboard-key-div"
                    onClick={() => onKeyboardClick(symbol)}
                  >
                    <p>{symbol !== -1 ? symbol : <FiDelete />}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
