import React, { useEffect, useContext} from "react";
import { PostContext } from "../../providers/PostProvider";
import { useParams } from "react-router-dom";
import Post from "../Post";

export const UserPosts = () => {
    
    const { getPostByUser, userPosts} = useContext(PostContext);
    const { id } = useParams();

    useEffect(() => {
        getPostByUser(id)
    }, []);

    if (!userPosts) {
    return null;
    }

    return (
        <>
        <div className="container">
            <div className="row justify-content-center">
                <div className="cards-column">
                {
                    userPosts.map((post) => (
                        <Post key={post.id} post={post} />
                ))}
                </div>
            </div>
        </div>
        </>
    )
}