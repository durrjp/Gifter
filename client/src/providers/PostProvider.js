import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState();
  const { getToken } = useContext(UserProfileContext);

  const getAllPosts = () => {
    getToken().then((token) => 
    fetch("/api/post", {
      method: "GET",
      headers: {
        Authorization:  `Bearer ${token}`
      }
    }).then((res) => res.json())
      .then(setPosts));
  }

  const addPost = (post) => (
    getToken().then((token) =>
    fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(post),
    }))
  );

  const searchPosts = (searchTerm) => {
    getToken().then((token) =>
    fetch(`/api/post/search?q=${searchTerm}`, {
      method: "GET",
      headers: {
        Authorization:  `Bearer ${token}`
      }
      })
        .then((res) => res.json())
        .then(setPosts));
  };

  const getPost = (id) => (
    getToken().then((token) =>
    fetch(`/api/post/${id}`, {
      method: "GET",
      headers: {
        Authorization:  `Bearer ${token}`
      }
      }))
        .then((res) => res.json())  
  )

  const getPostByUser = (id) => {
    getToken().then((token) =>
    fetch(`/api/post/getbyuser/${id}`, {
      method: "GET",
      headers: {
        Authorization:  `Bearer ${token}`
      }
      }))
    .then((res) => res.json())
    .then(setUserPosts);
  };

  return (
    <PostContext.Provider value={{ posts, getAllPosts, addPost,setPosts, searchPosts, getPost, getPostByUser, userPosts}}>
      {props.children}
    </PostContext.Provider>
  );
};