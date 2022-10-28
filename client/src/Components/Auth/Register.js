import React, { useState } from "react";
import { Button, Form, Modal, Alert } from "react-bootstrap";
import { useMutation } from "react-query";

import FormAll from "../Atoms/FormAll";
import { API } from "../../config/api";

function Register({ show, setShow, setShowLogin }) {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    role: "",
  });

  console.log(form);
  const { fullname, email, password, phone, gender, role } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post("/register", form);
      setShow(false);
      setShowLogin(true);

      const alert = <Alert variant="success">Resgister Success</Alert>;

      setMessage(alert);

      console.log("ini response register", response);
    } catch (e) {
      console.log(e.response.data.message);
      const alert = <Alert variant="danger">{e.response.data.message}</Alert>;

      setMessage(alert);
    }
  });
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          {message && message}
          <form>
            <div className="text-yellow m-3">
              <h2>Register</h2>
            </div>
            <div>
              <FormAll
                label="Email"
                type="email"
                placeholder="Email"
                value={email}
                name="email"
                required
                onChange={handleChange}
              />
              <FormAll
                label="password"
                type="password"
                placeholder="password"
                value={password}
                name="password"
                required
                onChange={handleChange}
              />
              <FormAll
                label="Full Name"
                type="text"
                placeholder="Full Name"
                value={fullname}
                name="fullname"
                required
                onChange={handleChange}
              />
              <Form.Select
                aria-label="Default select example m-3"
                value={gender}
                name="gender"
                required
                onChange={handleChange}
              >
                <option>Gender</option>
                <option value="Laki-laki">Laki-Laki</option>
                <option value="Perempuan">Perempuan</option>
              </Form.Select>
              <FormAll
                label="Phone Number"
                type="text   "
                placeholder="Phone Number"
                className="mt-3"
                value={phone}
                name="phone"
                required
                onChange={handleChange}
              />
              <Form.Select
                aria-label="Default select example m-3"
                value={role}
                name="role"
                required
                onChange={handleChange}
              >
                <option hidden>Role</option>
                <option value="User">User</option>
                <option value="Partner">Patner</option>
              </Form.Select>
            </div>
          </form>
          <Button
            onClick={(e) => handleSubmit.mutate(e)}
            className="btn-order btn-nav mt-3"
          >
            Register
          </Button>
          <p className="mt-3">
            Already have an account ? Klik{" "}
            <span
              className="fw-bold"
              onClick={() => {
                setShow(false);
                setShowLogin(true);
              }}
            >
              Here
            </span>
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Register;
