import React, { useContext } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { LoginContext } from "../../Contexts/LoginContext";
import patner from "../../assets/patner-img.svg";
import logoName from "../../assets/logo-name.svg";

function ProfileAdmin() {
  const navigate = useNavigate();
  const { isLogin, setIsLogin } = useContext(LoginContext);

  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h2 className="mb-5">My Profile Patner</h2>
          <Row>
            <Col className="col-5 col-lg-5">
              <img alt="user" src={patner} width="210px" />
              <Button className="btn-nav mt-3 w-100" onClick={() => navigate('/edit-admin')}>
                Edit Profile
              </Button>
            </Col>
            <Col>
              <div className="mb-5">
                <p>FullName</p>
                <p className="profile-text">Andi</p>
              </div>
              <div className="mb-5">
                <p>Email</p>
                <p className="profile-text">andi@gmail.com</p>
              </div>
              <div>
                <p>Phone</p>
                <p className="profile-text">082303289</p>
              </div>
            </Col>
          </Row>
        </Col>
        <Col className="col-12 col-md-6">
          <h2 className="mb-5">History Transaction</h2>
          <div style={{ maxHeight:'250px', overflow: 'scroll' }}>
          <Card className="shadow border border-dark d-flex mb-3">
            <Card.Body>
              <Row>
                <Col>
                  <Card.Title>Geprek bensu</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Saturday, 12 March 2021
                  </Card.Subtitle>
                  <Card.Text className="text-danger fw-bold">Total: Rp. 10.000</Card.Text>
                </Col>
                <Col className="ms-5" style={{ textAlign: 'end' }}>
                  <img src={logoName} />
                  <Button className="btn-finish fw-bold fs-5 w-50">Finished</Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card className="shadow border border-dark d-flex mb-3">
            <Card.Body>
              <Row>
                <Col>
                  <Card.Title>Geprek bensu</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Saturday, 12 March 2021
                  </Card.Subtitle>
                  <Card.Text className="text-danger fw-bold">Total: Rp. 10.000</Card.Text>
                </Col>
                <Col className="ms-5" style={{ textAlign: 'end' }}>
                  <img src={logoName} />
                  <Button className="btn-finish fw-bold fs-5 w-50">Finished</Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfileAdmin;
