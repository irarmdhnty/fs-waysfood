import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import FormAll from "./Atoms/FormAll";

import iconFile from "../assets/icon-file.svg";
import mapIcon from "../assets/map-icon.png";
import mapsImg from "../assets/maps-img.svg";

const FormEdit = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  return (
    <Form>
      <Row>
        <Col className="col-12 col-md-9">
          <FormAll
            label="Full Name"
            type="text"
            placeholder="Full Name"
            className="border-form border-dark"
          />
        </Col>
        <Col className="col-12 col-md-3">
          <Form.Group
            className="mb-3 d-flex"
            controlId="formBasicEmail"
            style={{ height: "90%" }}
          >
            <Form.Control type="file" placeholder="Attach Image" hidden  />
            <Form.Label className="d-flex align-items-center border-form border-dark input-img border border-1" >
              Attach Image
            </Form.Label>
            <img
              src={iconFile}
              style={{
                marginLeft: "-30px",
                paddingBottom: "8px",
                width: "20px",
              }}
            />
          </Form.Group>
        </Col>
      </Row>
      <FormAll
        label="Email"
        type="email"
        placeholder="Email"
        className="border-form border-dark"
      />
      <FormAll
        label="Phone"
        type="email"
        placeholder="Phone"
        className="border-form border-dark"
      />
      <Row>
        <Col className="col-12 col-md-9">
          <FormAll
            label="Location"
            type="text"
            placeholder="Location"
            className="border-form border-dark"
          />
        </Col>
        <Col className="col-12 col-md-3">
          <div>
            <Button className="btn-map btn-nav p-2 mb-3" style={{ height: '55px' }} onClick={setShow}>
              Select On Map
              <img src={mapIcon} className="ms-3" />
            </Button>
            <Modal
              size="xl"
              show={show}
              onHide={() => setShow(false)}
              aria-labelledby="example-modal-sizes-title-lg"
            >
              <Modal.Body>
                <img src={mapsImg} className="w-100" />
              </Modal.Body>
            </Modal>
          </div>
        </Col>
      </Row>
      <div className="d-flex justify-content-end">
        <Button
          className="btn-nav w-25 mt-5 "
          type="submit"
          onClick={() => navigate("/profile")}
        >
          Save
        </Button>
      </div>
    </Form>
  );
};

export default FormEdit;
