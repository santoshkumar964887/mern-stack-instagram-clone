import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
export default function Signup() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const PostData = () => {
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(mailformat)) {
      M.toast({
        html: "Please Enter Valid Email Address",
        classes: "#b71c1c red darken-4",
      });
      return;
    }
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (!password.match(passw)) {
      M.toast({
        html:
          "Please Enter a password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter",
        classes: "#b71c1c red darken-4",
      });
      return;
    }
    fetch("/api/v1/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
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
          M.toast({
            html: data.message,
            classes: "#1b5e20 green darken-4",
          });
          history.push("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setName("");
    setPassword("");
    setEmail("");
  };
  return (
    <div className="cardContainer">
      <div className="card input-field">
        <h2 style={{ textAlign: "center" }}>Instagram</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
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
          onClick={PostData}
        >
          Register
        </button>
        <br />
        <h6>
          If you have account{" "}
          <Link to="/login">
            <span style={{ color: "#1996fc", fontSize: 14, fontWeight: "600" }}>
              Login here
            </span>
          </Link>{" "}
        </h6>
      </div>
    </div>
  );
}
