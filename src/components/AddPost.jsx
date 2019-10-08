import React, { Component } from "react";
import { firestore } from "../firebase";
import { auth } from "../firebase";

class AddPost extends Component {
  state = { Title: "", Content: "" };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      // console.log("State", this.state);
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    // const { onCreate } = this.props;
    const { Title, Content } = this.state;
    const { uid, displayName, photoURL, email } = auth.currentUser || {};
    console.log(uid);
    const post = {
      Title,
      Content,
      User: {
        uid,
        displayName,
        email,
        photoURL
      },
      favorites: 0,
      comments: 0,
      createdAt: new Date()
    };

    // onCreate(post);
    firestore.collection("posts").add(post);

    this.setState({ Title: "", Content: "" });
  };

  render() {
    const { Title, Content } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="AddPost">
        <input
          type="text"
          name="Title"
          placeholder="Title"
          value={Title}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="Content"
          placeholder="Body"
          value={Content}
          onChange={this.handleChange}
        />
        <input className="create" type="submit" value="Create Post" />
      </form>
    );
  }
}

export default AddPost;
