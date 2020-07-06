import React, { useState } from "react";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState();

  const getAllPosts = () => {
    return fetch("api/post")
      .then((res) => res.json())
      .then(setPosts);
  };

  const addPost = (post) => {
    return fetch("api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
  };

  const searchPosts = (searchTerm) => {
    return fetch(`api/post/search?q=${searchTerm}`)
        .then((res) => res.json())
        .then(setPosts);
  };

  const getPost = (id) => {
    return fetch(`/api/post/${id}`).then((res) => res.json())
    
  };

  const getPostByUser = (id) => {
    return fetch(`/api/post/getbyuser/${id}`).then((res) => res.json())
    .then(setUserPosts);
  };

  return (
    <PostContext.Provider value={{ posts, getAllPosts, addPost,setPosts, searchPosts, getPost, getPostByUser, userPosts}}>
      {props.children}
    </PostContext.Provider>
  );
};