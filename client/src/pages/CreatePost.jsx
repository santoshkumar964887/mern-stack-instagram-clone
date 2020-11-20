import React from "react";

export default function CreatePost() {
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
      <input type="text" placeholder="title" />
      <input type="text" placeholder="title" />
      <div className="file-field input-field">
        <div className="btn waves-effect #1e88e5 blue darken-1">
          <span>Upload Image</span>
          <input type="file" />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button
        class="btn waves-effect #1e88e5 blue darken-1"
        type="submit"
        name="action"
      >
        Post Now
      </button>
    </div>
  );
}
