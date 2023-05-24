import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import { unauthenticateUser } from "../redux/slices/authSlice";

import avatars from "../resources/avatars.json";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const MainNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = async () => {
    dispatch(unauthenticateUser());
    localStorage.removeItem("isAuth");
    navigate('/login');
  };

  return (
    <Navbar style={{ minWidth: "100vw" }}>
      <Container fluid style={{ backgroundColor: "#F1F5FB" }}>
        <Navbar.Brand href="#">
          <img src={avatars.avatars[10]} height="60px" />
        </Navbar.Brand>

        <button onClick={logout}>Log Out</button>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
