import { useContext, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";
import { UserContext } from "../Contexts/userContext";

import { Patners } from "../DataDummy/Patners";
import Login from "./Auth/Login";
import Register from "./Auth/Register";

function PartnerCard({ item }) {
  const navigate = useNavigate();

  const [state] = useContext(UserContext);

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleShow = () => {
    setShowLogin(true);
  };

  return (
    <>
      <Card
        onClick={
          state.isLogin ? () => navigate(`/detail/${item.id}`) : handleShow
        }
        style={{ width: "100%" }}
        className="my-3 p-3 border-0"
      >
        <Row className="d-flex align-items-center">
          <Col className="col-5">
            <img src={item.image} style={{ width: "65px", height: "65px" }} />
          </Col>
          <Col className="col-7 ps-0">
            <Card.Title className="ff-abhaya text-start fw-extra-bold f-24">
              {item.fullName}
            </Card.Title>
          </Col>
        </Row>
      </Card>
      <Login
        showLog={showLogin}
        setShowLog={setShowLogin}
        setShowReg={setShowRegister}
      />

      <Register
        showReg={showRegister}
        setShowReg={setShowRegister}
        setShowLog={setShowLogin}
      />
    </>
  );
}

function ContentPatner() {
  let { data: users } = useQuery("usersCache", async () => {
    const response = await API.get("/users");
    return response.data.data;
  });

  return (
    <Container>
      <h2 className="mt-5">Popular Restaurant</h2>
      <Row>
        {users?.map(
          (item, index) =>
            item.role === "partner" && (
              <Col key={index} className="my-3 col-12 col-md-3">
                <PartnerCard item={item} key={index} />
              </Col>
            )
        )}
      </Row>
    </Container>
  );
}

export default ContentPatner;
