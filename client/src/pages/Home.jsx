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
  const LikeHandler = (id) => {
    fetch("/api/v1/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postID: id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        const newdata = [res, ...result];
        setResult(newdata);
      });
  };
  const DisLikeHandler = (id) => {
    fetch("/api/v1/dislike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postID: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  };
  console.log(result);
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
              <i
                onClick={() => LikeHandler(item._id)}
                className="material-icons"
                style={{ cursor: "pointer" }}
              >
                thumb_up
              </i>
              <i
                style={{ cursor: "pointer" }}
                onClick={() => DisLikeHandler(item._id)}
                className="material-icons"
              >
                thumb_down
              </i>
              <h6>{item.likes.length} Likes</h6>
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
