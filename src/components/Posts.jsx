import React from "react";
import Post from "./Post";
import AddPost from "./AddPost";
import { PostsContext } from "../providers/PostsProvider";

const Posts = () => {
  return (
    <section className="Posts">
      <AddPost />
      <PostsContext.Consumer>
        {posts => {
          return posts.map(post => (
            <Post {...post} key={post.id} id={post.id} />
          ));
        }}
      </PostsContext.Consumer>
    </section>
  );
};

export default Posts;
