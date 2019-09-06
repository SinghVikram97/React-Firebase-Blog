import React from "react";
import Post from "./Post";
import AddPost from "./AddPost";

const Posts = ({ posts, onCreate, onRemove }) => {
  return (
    <section className="Posts">
      <AddPost onCreate={onCreate} />
      {posts.map(post => (
        <Post {...post} key={post.id} onRemove={onRemove} id={post.id} />
      ))}
    </section>
  );
};

export default Posts;
