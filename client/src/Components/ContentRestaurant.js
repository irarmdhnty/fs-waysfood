import { useNavigate } from "react-router-dom";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { useContext, useState } from "react";

import { RestaurantNear } from "../DataDummy/RestaurantNear";
import { LoginContext } from "../Contexts/LoginContext";

import Login from "./Auth/Login";
import Register from "./Auth/Register";
import { UserContext } from "../Contexts/userContext";
import { useQuery } from "react-query";
import { API } from "../config/api";

function ContentRestaurant() {
  const navigate = useNavigate();

  const [state] = useContext(UserContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleShow = () => {
    setShowLogin(true);
  };

  let { data: usersResto } = useQuery("usersRestoCache", async () => {
    const response = await API.get("/users");
    return response.data.data;
  });

  const restoNear = usersResto?.filter((item) => item.role == "Partner");

  return (
    <Container>
      <h2 className="mt-4">Restaurant Near You</h2>
      <Row>
        {restoNear?.map((item) => (
          <Col key={item?.id} className="my-3 col-12 col-md-3">
            <Card
              width="18 rem"
              className="shadow"
              style={{ cursor: "pointer" }}
              onClick={() => {
                !state.isLogin
                  ? setShowLogin(true)
                  : navigate(`/detail/${item.id}`);
              }}
            >
              <Card.Body className="align-items-center">
                <Image src={item?.image} width="100%" />
                <Card.Title className="mt-3">{item.fullName}</Card.Title>
                <Card.Text>0,6 km</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
        <Login
          show={showLogin}
          setShow={setShowLogin}
          setShowRegister={setShowRegister}
        />
        <Register
          show={showRegister}
          setShow={setShowRegister}
          setShowRegister={setShowLogin}
        />
      </Row>
    </Container>
  );
}

export default ContentRestaurant;
