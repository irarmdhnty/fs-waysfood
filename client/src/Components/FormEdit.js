import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import FormAll from "./Atoms/FormAll";

import iconFile from "../assets/icon-file.svg";
import mapIcon from "../assets/map-icon.png";
import mapsImg from "../assets/maps-img.svg";
import { UserContext } from "../Contexts/userContext";
import { useQuery } from "react-query";
import { API } from "../config/api";

const FormEdit = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const [state, dispatch] = useContext(UserContext);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    image: "",
    fullName: "",
    email: "",
    phone: "",
    location: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  let { data: user } = useQuery("editUserCache", async () => {
    const response = await API.get(`user/${state.user.id}`);
    return response.data.data;
  });

  useEffect(() => {
    if (user) {
      setPreview(user.image);
      setForm({
        ...form,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        location: user.location,
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      if (form.image) {
        formData.set("image", form?.image[0], form?.image[0]?.name);
      }
      formData.set("fullname", form.fullName);
      formData.set("email", form.email);
      formData.set("phone", form.phone);
      formData.set("location", form.location);

      const response = await API.patch("/users/" + user.id, formData);
      console.log("ini data updated user", response.data);

      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <Row>
        <Col className="col-12 col-md-9">
          <FormAll
            name="fullName"
            onChange={handleChange}
            label="Full Name"
            type="text"
            placeholder="Full Name"
            className="border-form border-dark text-dark"
          />
        </Col>
        <Col className="col-12 col-md-3">
          <Form.Group
            className="mb-3 p-2 rounded border border-form border-dark text-dark border-grey3"
            controlId="formBasicEmail"
          >
            {preview && (
              <div>
                <img
                  src={preview}
                  style={{
                    maxWidth: "150px",
                    maxHeight: "150px",
                    objectFit: "cover",
                  }}
                  alt={preview}
                />
              </div>
            )}
            <Form.Control
              name="image"
              onChange={handleChange}
              type="file"
              placeholder="Attach Image"
              hidden
            />
            <Form.Label className="d-flex justify-content-between btn-full align-items-center  ">
              <div className="text-grey3">Attach Image </div>
              <div className="">
                <img src={iconFile} alt="" />
              </div>
            </Form.Label>
          </Form.Group>
        </Col>
      </Row>
      <FormAll
        name="email"
        onChange={handleChange}
        label="Email"
        type="email"
        placeholder="Email"
        className="border-form border-dark text-dark"
      />
      <FormAll
        name="phone"
        onChange={handleChange}
        label="Phone"
        type="text"
        placeholder="Phone"
        className="border-form border-dark text-dark"
      />
      <Row>
        <Col className="col-12 col-md-9">
          <FormAll
            name="location"
            onChange={handleChange}
            label="Location"
            type="text"
            placeholder="Location"
            className="border-form border-dark text-dark"
          />
        </Col>
        <Col className="col-12 col-md-3">
          <div>
            <Button
              className="btn-map btn-nav p-2 mb-3"
              style={{ height: "55px" }}
              onClick={setShow}
            >
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
        <Button className="btn-nav w-25 mt-5 " type="submit">
          Save
        </Button>
      </div>
    </Form>
  );
};

export default FormEdit;
