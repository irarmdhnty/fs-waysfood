import { useContext, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";
import { UserContext } from "../Contexts/userContext";

import { Patners } from "../DataDummy/Patners";
import Login from "./Auth/Login";
import Register from "./Auth/Register";

function ContentPatner() {
  const navigate = useNavigate();

  const [state] = useContext(UserContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleShow = () => {
    setShowLogin(true);
  };

  let { data: users } = useQuery("usersCache", async () => {
    const response = await API.get("/users");
    console.log("responseeeee", response.data.data);
    return response.data.data;
  });

  const partner = users?.filter((item) => item.role == "Partner");

  return (
    <Container>
      <h2 className="mt-5">Popular Restaurant</h2>
      <Row>
        {partner?.map((item) => (
          <Col key={item?.id} className="my-3 col-12 col-md-3">
            <Card
              style={{  }}
              className="my-3 p-3 border-0 shadow"
              onClick={() => {
                !state.isLogin ? setShowLogin(true) : navigate(`/detail/${item.id}`);
              }}
            >
              <Row className="d-flex align-items-center">
                <Col className="col-5">
                  <img
                    src={item?.image}
                    style={{ width: "65px", height: "65px" }}
                  />
                </Col>
                <Col className="col-7 ps-0">
                  <Card.Title className="ff-abhaya text-start fw-extra-bold f-24">
                    {item.fullName}
                  </Card.Title>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
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
    </Container>
  );
}

export default ContentPatner;
