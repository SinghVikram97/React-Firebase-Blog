import React, { Component } from "react";
import { auth } from "../firebase";
import { firestore, storage } from "../firebase";

export default class UserProfile extends Component {
  state = {
    displayName: ""
  };
  imageInput = null;

  get uid() {
    return auth.currentUser.uid;
  }

  get userRef() {
    return firestore.doc(`users/${this.uid}`);
  }

  get file() {
    return this.imageInput && this.imageInput.files[0];
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { displayName } = this.state;
    if (displayName) {
      this.userRef.update({ displayName });
    }
    if (this.file) {
      storage
        .ref()
        .child("user-profiles")
        .child(this.uid)
        .child(this.file.name)
        .put(this.file)
        .then(res => res.ref.getDownloadURL())
        .then(photoURL => this.userRef.update({ photoURL }));
    }
  };

  render() {
    const { displayName } = this.state;
    return (
      <section className="UserProfile">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={displayName}
            name="displayName"
            onChange={this.handleChange}
            placeholder="Display Name"
          />
          <input type="file" ref={ref => (this.imageInput = ref)} />
          <input type="submit" className="update" value="Update" />
        </form>
      </section>
    );
  }
}
