import React, { useContext, useEffect, useRef} from "react";
import { PostContext } from "../providers/PostProvider";
import Post from "./Post";

const PostList = () => {
  const { posts, getAllPosts, searchPosts } = useContext(PostContext);
  const search = useRef("")

  useEffect(() => {
    getAllPosts();
  }, []);

    const debounce = (func, wait) => {
        let timeout;
    
        return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            func(...args);
        };
    
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        };
    };

    const startSearching = debounce(() => {
        if (search.current.value === "") {
            getAllPosts();
        } else {
            searchPosts(search.current.value);
        }
    }, 800);

  return (
    <>
    <div className="searchBar">
        <input
            type="text"
            ref={search}
            className="inputSearch"
            onKeyUp={ e => startSearching() }
            name="userSearch"
            placeholder="Search here"
        />
    </div>
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {
            posts.map((post) => (
                <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default PostList;