import React from "react";
import {Link} from 'react-router-dom';
export default function Login() {
  return (
    <div className="cardContainer">
      <div className="card input-field">
      <h2 style={{textAlign:"center"}}>Instagram</h2>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <br/>
        <button
          class="btn waves-effect #1e88e5 blue darken-1"
          type="submit"
          name="action"
        >
           Login
        </button>
        <br/>
        <h6>If you don't have account <Link to="/signup" ><span style={{color:"#1996fc",fontSize:14,fontWeight:"600"}}>Register here</span></Link> </h6>
      </div>
    </div>
  );
}
