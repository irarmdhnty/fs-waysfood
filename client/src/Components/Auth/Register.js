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

      setTimeout(() => {
        setShow(false);
        setShowLogin(true);
      }, 2000);

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
          <form onSubmit={(e) => handleSubmit.mutate(e)}>
            <div className="text-yellow m-3">
              <h2>Register</h2>
            </div>
            <input
              label="Email"
              type="email"
              placeholder="Email"
              value={email}
              name="email"
              onChange={handleChange}
              className="p-3 w-100 rounded rounded-3 my-2 border-0 shadow-lg"
              required
            />
            <input
              label="password"
              type="password"
              placeholder="password"
              value={password}
              name="password"
              onChange={handleChange}
              className="p-3 w-100 rounded rounded-3 my-2 border-0 shadow-lg"
              required
            />
            <input
              label="Full Name"
              type="text"
              placeholder="Full Name"
              value={fullname}
              name="fullname"
              onChange={handleChange}
              className="p-3 w-100 rounded rounded-3 my-2 border-0 shadow-lg"
              required
            />
            <select
              aria-label="Default select example m-3"
              value={gender}
              name="gender"
              onChange={handleChange}
              className="p-3 w-100 rounded rounded-3 my-2 border-0 shadow-lg"
              required
            >
              <option value="">Gender</option>
              <option value="Laki-laki">Laki-Laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
            <input
              label="Phone Number"
              type="text   "
              placeholder="Phone Number"
              value={phone}
              name="phone"
              onChange={handleChange}
              className="p-3 w-100 rounded rounded-3 my-2 border-0 shadow-lg"
              required
            />
            <select
              aria-label="Default select example m-3"
              value={role}
              name="role"
              onChange={handleChange}
              className="p-3 w-100 rounded rounded-3 my-2 border-0 shadow-lg"
              required
            >
              <option value="">Role</option>
              <option value="User">User</option>
              <option value="Partner">Patner</option>
            </select>
            <Button type="submit" className="btn-order btn-nav mt-3">
              Register
            </Button>
          </form>
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
