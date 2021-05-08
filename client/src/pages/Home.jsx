import React, { useState, useEffect, useContext } from "react";
import { userContext } from "../App";
export default function Home() {
  //Hooks
  const [result, setResult] = useState([]);

  const { state } = useContext(userContext);

  // useEffect
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
  }, [result]);

  // Like handler
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
        const newdata = result.map((item) => {
          if (item._id === res._id) {
            return res;
          } else {
            return item;
          }
        });

        setResult(newdata);
      });
  };

  // DisLike handler
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
      .then((res) => {
        // console.log(res);
        const newdata = result.map((item) => {
          if (item._id === res._id) {
            return res;
          } else {
            return item;
          }
        });
        setResult(newdata);
      });
  };
  // Making comment
  const commentHandler = (text, postID) => {
    fetch("/api/v1/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postID,
        text,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        const newdata = result.map((item) => {
          if (item._id === res._id) {
            return res;
          } else {
            return item;
          }
        });

        setResult(newdata);
      });
  };
  return (
    <div className="home">
      {result.length ? (
        result.map((item) => (
          <div key={item._id} className="card home-card">
            <h5>{item.postedBy ? item.postedBy.name : null}</h5>
            <div className="card-image">
              <img src={item.image} alt="card images" />
            </div>
            <div className="card-content">
              <span className="material-icons">favorite_border</span>

              {!item.likes.includes(state._id) ? (
                <i
                  onClick={() => LikeHandler(item._id)}
                  className="material-icons"
                  style={{ cursor: "pointer" }}
                >
                  thumb_up
                </i>
              ) : (
                <i
                  style={{ cursor: "pointer" }}
                  onClick={() => DisLikeHandler(item._id)}
                  className="material-icons"
                >
                  thumb_down
                </i>
              )}
              <h6>{item.likes ? item.likes.length : null} Likes</h6>
              <h6>{item.title}</h6>
              <p> {item.body}</p>
              {item.comments.length
                ? item.comments.map((comment) => {
                    return (
                      <div key={comment._id}>
                        <span
                          style={{ fontSize: "14px", fontWeight: "normal" }}
                        >
                          {comment.text}
                        </span>
                        {"  "}
                        <span style={{ fontSize: "8px", fontWeight: "bold" }}>
                          {" "}
                          {comment.postedBy.name}
                        </span>
                      </div>
                    );
                  })
                : null}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  commentHandler(e.target[0].value, item._id);
                  e.target[0].value = "";
                }}
              >
                <input type="text" placeholder="Add your comment" />
              </form>
            </div>
          </div>
        ))
      ) : (
        <h1 style={{ textAlign: "center" }}> Loading...</h1>
      )}
    </div>
  );
}
