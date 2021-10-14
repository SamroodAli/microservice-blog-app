import React, { useState, useEffect } from "react";
import axios from "axios";

const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const { data } = await axios.get("http://localhost:4000/posts");
    console.log(data);
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return <div>posts</div>;
};

export default PostList;
