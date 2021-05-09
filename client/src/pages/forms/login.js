import React, { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import NavigationBar from "../../components/navbar/navbar.js";
import Footer from "../../components/footer/footer.js";
import "./form.css";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useAuth();
  // console.log(login)
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    if (emailRef.current.value === "" || passwordRef.current.value == "") {
      return setError("Please fill all fields");
    }

    try {
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (err) {
      setError(err.message);
      console.log(err.message);
    }

    setLoading(false);
  }
  return (
    <div className="auth-black-bg">
      <NavigationBar></NavigationBar>
      <div className="form-container form-container-login">
        <h1>Login</h1>
        {error ? (
          <Alert variant="success" className="mb-5">
            {error}
          </Alert>
        ) : (
          ""
        )}
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <i className="bx bxs-user"></i>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              ref={emailRef}
            />
          </div>

          <div className="input-field">
            <i className="bx bxs-key"></i>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              minLength="6"
              ref={passwordRef}
            />
          </div>
          <button className="btn-submit">Login!</button>
        </form>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Login;
