import React, { useEffect, useState, useContext } from "react";
import { userContext } from "../App.js";
export default function Profile() {
  const { state } = useContext(userContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("api/v1/mypost", {
      method: "get",
      headers: {
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => setData(result.data));
  }, []);
  console.log(state);
  return (
    <div style={{ width: "60vw", margin: "0px auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          borderBottom: "2px solid gray",
          padding: "30px",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1592598285030-6a57af53b3d0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
          alt="profile images"
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "100px",
            border: "5px solid gray",
            boxShadow: "2px 2px 10px -5px #e8e8e8",
          }}
        />
        <div style={{ marginTop: "5px" }}>
          <h4>{state ? state.name : "Loading"}</h4>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "108%",
            }}
          >
            <h6>15 posts</h6>
            <h6>20 followers</h6>
            <h6>10 following</h6>
          </div>
        </div>
      </div>
      <div className="imageProfileContainer">
        {data.map((item) => {
          return (
            <img
              key={item._id}
              className="imageProfile"
              src={item.image}
              alt="profile images"
            />
          );
        })}
      </div>
    </div>
  );
}
