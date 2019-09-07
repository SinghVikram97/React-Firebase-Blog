import React, { Component } from "react";

import Posts from "./Posts";
import { getIDsAndDocs } from "../utilities";
import { firestore } from "../firebase";
import Authentication from "./Authentication";
import { auth } from "firebase";

class Application extends Component {
  state = {
    posts: [],
    user: null
  };

  // handleCreate = post => {
  //   // const { posts } = this.state;

  //   // console.log(post);

  //   // firestore.collection("posts").add(post);
  //   // .then(docReference => {
  //   //   docReference.get().then(doc => {
  //   //     const newPost = getIDsAndDocs(doc);
  //   //     this.setState({ posts: [newPost, ...posts] });
  //   //   });
  //   // });
  // };

  // handleRemove = id => {
  //   // const allPosts = this.state.posts;
  //   firestore.doc(`posts/${id}`).delete();
  //   // .then(() => {
  //   //   const posts = allPosts.filter(post => post.id !== id);
  //   //   this.setState({ posts });
  //   // });
  // };

  unsubscribeFromFirestore = null;
  unsubscribeFromAuth = null;

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
    this.unsubscribeFromFirestore = firestore
      .collection("posts")
      .onSnapshot(snapshot => {
        let posts = snapshot.docs.map(getIDsAndDocs);
        this.setState({ posts: posts });

        // From logged in to logged out or vice verse
        this.unsubscribeFromAuth = auth().onAuthStateChanged(user => {
          this.setState({ user });
        });
      });
  };

  componentWillUnmount() {
    this.unsubscribeFromFirestore();
  }

  render() {
    const { posts, user } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Authentication user={user} />
        <Posts
          posts={posts}
          // onCreate={this.handleCreate}
          // onRemove={this.handleRemove}
        />
      </main>
    );
  }
}

export default Application;
