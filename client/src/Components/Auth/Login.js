import React, { useContext, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { API } from "../../config/api";
import { UserContext } from "../../Contexts/userContext";

import FormAll from "../Atoms/FormAll";

const Login = ({
  show,
  setShow,
  setShowRegister,
  isLogin,
  setIsLogin,
  setUserRole,
}) => {
  const navigate = useNavigate();
  const handleClose = () => setShow(false);

  const [message, setMessage] = useState(null);
  const [state, dispatch] = useContext(UserContext);

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const data = await API.post("/login", userLogin);

      const alert = <Alert variant="success">Login berhasil!</Alert>;

      setMessage(alert);
      setShow(false);

      let payload = data.data.data;
      dispatch({
        type: "LOGIN_SUCCESS",
        payload,
      });
      navigate("/");

      console.log("isi payload", payload);
      console.log("ini data login", data);
    } catch (error) {
      console.log(error);
      const alert = <Alert variant="danger">Email / password salah!</Alert>;

      setMessage(alert);
    }
  });

  const [statusMessage, setStatusMessage] = useState("");

  // function successLogin(email, password) {
  //   const emailCheck = User.filter((field) => field.email === email);

  //   if (emailCheck.length === 0) {
  //     setStatusMessage("Email belum terdaftar");
  //     return {
  //       status: false,
  //       message: statusMessage,
  //     };
  //   }

  //   const result = User.filter((field) => field.password === password);

  //   if (result.length === 0) {
  //     setStatusMessage("Password Anda Salah");
  //     return {
  //       status: false,
  //       message: statusMessage,
  //     };
  //   }
  //   setStatusMessage("Login success");
  //   return {
  //     status: true,
  //     message: statusMessage,
  //     user: result[0],
  //   };
  // }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          {/* {statusMessage != "" && (
            <p className={!isLogin ? "text-danger" : "text-success"}>
              {statusMessage}
            </p>
          )} */}
          {message && message}
          <Form>
            <div className="text-yellow m-3">
              <h2>Login</h2>
            </div>
            <input
              label="Email"
              type="email"
              placeholder="Email"
              name="email"
              value={userLogin.email}
              onChange={handleChange}
              className="p-3 w-100 rounded rounded-3 my-2 border-0 shadow-lg"
              required
            />
            <input
              label="Password"
              type="password"
              name="password"
              placeholder="Password"
              value={userLogin.password}
              onChange={handleChange}
              className="p-3 w-100 rounded rounded-3 my-2 border-0 shadow-lg"
              required
            />
            <Button
              className="btn-order btn-nav px-5"
              onClick={(e) => handleSubmit.mutate(e)}
            >
              Login
            </Button>
          </Form>
          <p className="mt-3">
            Don't have an account ? click
            <span
              className="fw-bold"
              onClick={() => {
                setShow(false);
                setShowRegister(true);
              }}
            >
              Here
            </span>
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Login;
