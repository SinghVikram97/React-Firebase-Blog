import React, { Component } from "react";

import Posts from "./Posts";
import { getIDsAndDocs } from "../utilities";
import { firestore } from "../firebase";

class Application extends Component {
  state = {
    posts: []
  };

  handleCreate = post => {
    const { posts } = this.state;

    console.log(post);

    firestore
      .collection("posts")
      .add(post)
      .then(docReference => {
        docReference.get().then(doc => {
          const newPost = getIDsAndDocs(doc);
          this.setState({ posts: [newPost, ...posts] });
        });
      });
  };

  componentDidMount = () => {
    firestore
      .collection("posts")
      .get()
      .then(snapshot => {
        // snapshot.forEach(doc => {
        //   console.log(doc.data());
        // });
        let posts = snapshot.docs.map(getIDsAndDocs);
        // console.log(posts);
        this.setState({ posts: posts }, () => {
          console.log("HI", this.state.posts);
        });
      });
  };

  render() {
    const { posts } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Posts posts={posts} onCreate={this.handleCreate} />
      </main>
    );
  }
}

export default Application;
