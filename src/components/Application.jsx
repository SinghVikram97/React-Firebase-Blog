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

  handleRemove = id => {
    const allPosts = this.state.posts;
    firestore
      .doc(`posts/${id}`)
      .delete()
      .then(() => {
        const posts = allPosts.filter(post => post.id !== id);
        this.setState({ posts });
      });
  };

  unsubscribe = null;

  componentDidMount = () => {
    // firestore
    //   .collection("posts")
    //   .get()
    //   .then(snapshot => {
    //     // snapshot.forEach(doc => {
    //     //   console.log(doc.data());
    //     // });
    //     let posts = snapshot.docs.map(getIDsAndDocs);
    //     // console.log(posts);
    //     this.setState({ posts: posts }, () => {
    //       console.log("HI", this.state.posts);
    //     });
    //   });

    // Subsrcibe to changes in database so that we don't need to refresh each time
    this.unsubscribe = firestore.collection("posts").onSnapshot(snapshot => {
      let posts = snapshot.docs.map(getIDsAndDocs);
      this.setState({ posts: posts });
    });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { posts } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Posts
          posts={posts}
          onCreate={this.handleCreate}
          onRemove={this.handleRemove}
        />
      </main>
    );
  }
}

export default Application;
