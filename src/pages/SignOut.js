import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class SignOut extends Component {
  state = {
    redirectToSignIn: false,
    redirectToSignUp: false,
  };

  setRedirectToSignin = () => {
    this.setState({
      redirectToSignIn: true,
    });
  };

  setRedirectToSignUp = () => {
    this.setState({
      redirectToSignUp: true,
    });
  };

  renderRedirectToSignIn = () => {
    if (this.state.redirectToSignIn) {
      return <Redirect to="/signin" />;
    }
  };

  renderRedirectToSignUp = () => {
    if (this.state.redirectToSignUp) {
      return <Redirect to="/signup" />;
    }
  };

  render() {
    return (
      <div>
        Thanks for using Trello.
        {this.renderRedirectToSignIn()}
        {this.renderRedirectToSignUp()}
        <input
          type="button"
          value="Log In"
          onClick={this.setRedirectToSignin}
        />
        <input
          type="button"
          value="Sign Up"
          onClick={this.setRedirectToSignUp}
        />
      </div>
    );
  }
}
