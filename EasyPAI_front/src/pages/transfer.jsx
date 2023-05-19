import React, { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";
import axios from "axios";


import "../style/transfer.css";
import "../style/index.css";
import { useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Toaster, toast } from 'sonner'

import avatars from "../resources/avatars.json";
import Layout2 from "../components/layout2";

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1namdsa2xkeHpnbnRqbGRtcGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ1MTUzOTMsImV4cCI6MjAwMDA5MTM5M30.12PsI2OKWJVKXOACa4dXV6jU-nAO8QUVDKooqnjQ1Xc';
const USER_URL = 'https://mgjglkldxzgntjldmpgn.supabase.co/rest/v1/user?select=*';

const Transfer = () => {
  const balance = 2090.2;
  const [amount, setAmount] = useState("0.00");
  const [canTransfer, setCanTransfer] = useState(true);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(USER_URL, {
          headers: {
            apikey: API_KEY,
            Authorization: `Bearer ${API_KEY}`
          }
        });

        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = () => {
    postRequest(); // Call the first action
  };


  const postRequest = async () => {
    try {
      if (user[0]?.balance >= amount) {
        const response = await axios.post(
          'https://mgjglkldxzgntjldmpgn.supabase.co/rest/v1/transfers',
          {
            ammount: parseInt(amount),
            description: 'Pago a Luis'
          },
          {
            headers: {
              'Content-Type': 'application/json',
              apikey: API_KEY,
              Authorization: `Bearer ${API_KEY}`,
              Prefer: 'return=minimal'
            }
          }
        );

        const newBalance = user[0]?.balance - parseInt(amount);


        // Update user table
        const updateResponse = await axios.patch(
          'https://mgjglkldxzgntjldmpgn.supabase.co/rest/v1/user?id=eq.1',
          {
            balance: newBalance
          },
          {
            headers: {
              'Content-Type': 'application/json',
              apikey: API_KEY,
              Authorization: `Bearer ${API_KEY}`,
              Prefer: 'return=minimal'
            }
          }
        );

        toast.success('Transaction successful!'); // Call the second action

        
        setTimeout(() => {
          navigate('/');
        }, 2000); // 2000 milliseconds (2 seconds)
      } else {
        toast.error('Insuficient funds')
      }

    } catch (error) {
      console.error('Error:', error);
    }
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
    <Layout2>
      <h1 className="tranfer-header">Send Money</h1>

      <div className={`${canTransfer ? "" : "transfer-error"}`}>
        <div className="transfer-input-div">
          <p className="transfer-input-amount">
            <span className="tranfer-dollar-sign">$</span>
            {amount}
          </p>
        </div>
        <p className="transfer-balance">Balance: {user[0]?.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
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

      <Toaster position="top-center" richColors />
      <button className="transfer-button" onClick={() => handleButtonClick()}>Confirm</button>


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
    </Layout2>
  );
};

export default Transfer;
