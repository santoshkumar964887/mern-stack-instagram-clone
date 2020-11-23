import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import { userContext } from "../App.js";
export default function Login() {
  const history = useHistory();
  const { state, dispatch } = useContext(userContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const HandleSubmit = () => {
    fetch("/api/v1/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "fail") {
          M.toast({
            html: data.message,
            classes: "#b71c1c red darken-4",
          });
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          M.toast({
            html: data.message,
            classes: "#1b5e20 green darken-4",
          });
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
    setEmail("");
    setPassword("");
  };
  return (
    <div className="cardContainer">
      <div className="card input-field">
        <h2 style={{ textAlign: "center" }}>Instagram</h2>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <br />
        <button
          className="btn waves-effect #1e88e5 blue darken-1"
          type="submit"
          name="action"
          onClick={HandleSubmit}
        >
          Login
        </button>
        <br />
        <h6>
          If you don't have account{" "}
          <Link to="/signup">
            <span style={{ color: "#1996fc", fontSize: 14, fontWeight: "600" }}>
              Register here
            </span>
          </Link>{" "}
        </h6>
      </div>
    </div>
  );
}
