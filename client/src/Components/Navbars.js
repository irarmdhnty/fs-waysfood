import { useContext, useEffect, useState } from "react";
import {
  Badge,
  Button,
  Container,
  Dropdown,
  Form,
  Modal,
  Navbar,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { LoginContext } from "../Contexts/LoginContext";
import { CartContext } from "../Contexts/CartContext";
import Login from "./Auth/Login";
import Register from "./Auth/Register";

import logo from "../assets/logo.svg";
import cart from "../assets/cart.svg";
import users from "../assets/users.svg";
import userIcon from "../assets/user-icon.svg";
import logoutIcon from "../assets/logout-icon.svg";
import foodIcon from "../assets/food-icon.svg";
import admin from "../assets/admin.svg";
import { UserContext } from "../Contexts/userContext";
import { API } from "../config/api";
import { useQuery } from "react-query";

function Navbars() {
  const navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [user, setUser] = useState(null);

  const { cartLength, setCartLength } = useContext(CartContext);

  const getUser = async () => {
    const response = await API.get(`/users/${state.user.id}`);
    setUser(response.data.data);
  };

  useEffect(() => {
    if (state.user) {
      getUser();
    }
  }, [state]);

  const { data: cartData, refetch: getCartLength } = useQuery(
    "cartCache",
    async () => {
      try {
        const response = await API.get("/carts");
        return response.data.data;
      } catch (error) {
        console.log(error);
      }
    }

  );
  

  useEffect(() => {
    getCartLength();
  }, [cartData]);

  const handleLogut = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  return (
    <div>
      <Navbar className="bg-yellow" expand="lg">
        <Container className="d-flex ">
          <Link to="/" style={{ textDecoration: "none" }}>
            <Navbar.Brand>WaysFood</Navbar.Brand>
            <Navbar.Brand>
              <img
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="justify-content-end">
            {!state.isLogin ? (
              <div>
                <Button
                  variant="btn btn-nav text-white mx-3"
                  onClick={() => setShowRegister(true)}
                >
                  Register
                </Button>
                <Button
                  variant="btn btn-nav text-white"
                  onClick={() => setShowLogin(true)}
                >
                  Login
                </Button>
              </div>
            ) : state.user.role == "User" ? (
              <div>
                <Dropdown>
                  <img
                    src={cart}
                    className="mx-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/order")}
                  />
                  {cartData?.length !== 0 && (
                    <Badge
                      style={{ width: "25px", height: "20px" }}
                      className="bg-danger position-absolute badge"
                    >
                      {cartData?.length}
                    </Badge>
                  )}
                  <Dropdown.Toggle variant="bg-yellow" id="dropdown-basic">
                    <img
                      src={user?.image}
                      width={40}
                      height={40}
                      className="rounded-circle"
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => navigate("/profile")}>
                      <img className="me-3" src={userIcon} />
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogut}>
                      <img className="me-3" src={logoutIcon} />
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            ) : (
              <div>
                <Dropdown>
                  <Dropdown.Toggle variant="bg-yellow" id="dropdown-basic">
                    <img
                      src={user?.image}
                      width={40}
                      height={40}
                      className="rounded-circle"
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => navigate("/profile-admin")}>
                      <img className="me-3" src={userIcon} />
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => navigate("/add-product")}>
                      <img className="me-3" src={foodIcon} />
                      Add Product
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogut}>
                      <img className="me-3" src={logoutIcon} />
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Login
        show={showLogin}
        setShow={setShowLogin}
        setShowRegister={setShowRegister}
      />
      <Register
        show={showRegister}
        setShow={setShowRegister}
        setShowLogin={setShowLogin}
      />
    </div>
  );
}

export default Navbars;
