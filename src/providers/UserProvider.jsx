import React, { Component, createContext } from "react";
import { createUserProfileDocument } from "../firebase";
import { auth } from "firebase";
export const UserContext = createContext();

class UserProvider extends Component {
  state = {
    user: null
  };
  unsubscribeFromAuth = null;
  componentDidMount() {
    this.unsubscribeFromAuth = auth().onAuthStateChanged(async userAuth => {
      const user = await createUserProfileDocument(userAuth);
      this.setState({ user });
    });
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const { user } = this.state;
    const { children } = this.props;
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
  }
}

export default UserProvider;
