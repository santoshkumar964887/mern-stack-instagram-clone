import React, { useState, useEffect } from "react";
import M from "materialize-css";
import { useHistory } from "react-router-dom";
export default function CreatePost() {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (url) {
      fetch("/api/v1/post", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.error, classes: "#b71c1c red darken-4" });
          } else {
            M.toast({
              html: "Created Post Successfully",
              classes: "#1b5e20 green darken-4",
            });
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url]);

  const postDetails = () => {
    if (!title || !body || !image) {
      M.toast({
        html: "Please provide all the inputs",
        classes: "#b71c1c red darken-4",
      });
    }
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "dkkhbanhm");
    fetch("https://api.cloudinary.com/v1_1/dkkhbanhm/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
      className="card input-filed"
      style={{
        margin: "40px auto",
        maxWidth: "500px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="title"
      />
      <input
        type="text"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="body"
      />
      <div className="file-field input-field">
        <div className="btn waves-effect #1e88e5 blue darken-1">
          <span>Upload Image</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button
        className="btn waves-effect #1e88e5 blue darken-1"
        onClick={postDetails}
        type="submit"
        name="action"
      >
        Post Now
      </button>
    </div>
  );
}
