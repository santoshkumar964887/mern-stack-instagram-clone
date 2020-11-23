import React, { useState, useEffect } from "react";

export default function Home() {
  const [result, setResult] = useState([]);
  useEffect(() => {
    fetch("/api/v1/post", {
      method: "get",
      headers: {
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setResult(result.data);
      });
  }, []);

  return (
    <div className="home">
      {result ? (
        result.map((item) => (
          <div key={item._id} className="card home-card">
            <h5>{item.postedBy.name}</h5>
            <div className="card-image">
              <img src={item.image} alt="card images" />
            </div>
            <div className="card-content">
              <span className="material-icons">favorite_border</span>
              <h6>{item.title}</h6>
              <p> {item.body}</p>
              <input type="text" placeholder="Add your comment" />
            </div>
          </div>
        ))
      ) : (
        <h1 style={{ textAlign: "center" }}> Loading...</h1>
      )}
    </div>
  );
}
