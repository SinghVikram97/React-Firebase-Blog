import React, { Component, createContext } from "react";
import { firestore } from "../firebase";
import { getIDsAndDocs } from "../utilities";

export const PostsContext = createContext();

class PostsProvider extends Component {
  state = {
    posts: []
  };
  unsubscribeFromFirestore = null;
  componentDidMount() {
    this.unsubscribeFromFirestore = firestore
      .collection("posts")
      .onSnapshot(snapshot => {
        let posts = snapshot.docs.map(getIDsAndDocs);
        this.setState({ posts: posts });
      });
  }
  componentWillUnmount() {
    this.unsubscribeFromFirestore();
  }

  render() {
    const { posts } = this.state;
    const { children } = this.props;
    return (
      <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>
    );
  }
}

export default PostsProvider;
