import React, { useState, useEffect, useContext } from "react";
import "./Login.css";
import PropTypes from "prop-types";
import axios from "axios";
import useToken from "../components/useToken";

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const { setUser } = useToken();

  const [email, setEmail] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = { identifier: username, password };
    const loginUser = await axios
      .post("https://tracking-core.herokuapp.com/auth/local/", body)
      .catch((err) => {
        setError(err);
      });

    setToken(loginUser.data);
  };

  const handleSubmitForSignUp = async (e) => {
    e.preventDefault();

    const body = { username, email, password };
    const signUpUser = await axios
      .post("https://tracking-core.herokuapp.com/auth/local/register", body)
      .catch((err) => {
        setError(err);
      });
    setUser(signUpUser);
  };

  return (
    <div className="background">
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />

        <div className="signup">
          <form onSubmit={handleSubmitForSignUp}>
            <label htmlFor="chk" aria-hidden="true">
              Sign up
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              placeholder="Email"
              required=""
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="pswd"
              placeholder="Password"
              required=""
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="pswd"
              placeholder="Confirm password"
              required=""
            />
            <button className="btn">Sign up</button>
          </form>
        </div>

        <div className="login">
          <form onSubmit={handleSubmit}>
            <label htmlFor="chk" aria-hidden="true">
              Login
            </label>
            <input
              onChange={(e) => setUserName(e.target.value)}
              type="email"
              name="email"
              placeholder="Email"
              required=""
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="pswd"
              placeholder="Password"
              required=""
            />
            {error && (
              <div className="error">
                The email address or password is incorrect
              </div>
            )}
            <button className="btn" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
