import React from "react";
import { useState } from "react";
import axios from "axios";

const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    await axios.post(`http://localhost:5000/posts/${postId}/comments`, {
      content,
    });
    setContent("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>New comment</label>
          <input
            className="mb-3 form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
