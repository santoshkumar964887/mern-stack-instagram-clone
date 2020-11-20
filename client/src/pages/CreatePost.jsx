import React, { useState } from "react";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const HandleSubmit = () => {
    console.log(image, body, title);
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
        onClick={HandleSubmit}
        type="submit"
        name="action"
      >
        Post Now
      </button>
    </div>
  );
}
