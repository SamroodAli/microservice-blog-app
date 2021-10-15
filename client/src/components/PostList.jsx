import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const { data } = await axios.get("http://localhost:4002/posts");
    console.log(data);
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => (
    <div
      key={post.id}
      className="card"
      style={{ width: "30%", marginBottom: "20px" }}
    >
      <div className="card-body">
        <p>{post.title}</p>
        <CommentCreate postId={post.id} />
        <CommentList postId={post.id} />
      </div>
    </div>
  ));
  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};

export default PostList;
