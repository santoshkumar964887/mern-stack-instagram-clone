import React from "react";
import {Link} from 'react-router-dom';
export default function Signup() {
  return (
    <div className="cardContainer">
      <div className="card input-field">
      <h2 style={{textAlign:"center"}}>Instagram</h2>
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <br/>
        <button
          class="btn waves-effect #1e88e5 blue darken-1"
          type="submit"
          name="action"
        >
           Register
        </button>
        <br/>
        <h6>If you have account <Link to="/login" ><span style={{color:"#1996fc",fontSize:14,fontWeight:"600"}}>Login here</span></Link> </h6>
      </div>
    </div>
  );
}
