import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      isSignUp: false,
      helperMessage: '',
    };
  }

  handleSignUpButtonClicked = async () => {
    const userInfo = {
      name: document.getElementsByClassName('name')[0].value,
      email: document.getElementsByClassName('email')[0].value,
      password: document.getElementsByClassName('password')[0].value,
    };
    await fetch('http://localhost:3002/user/signup', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(userInfo),
    })
      .then(res => res.json())
      .then(res => {
        if (res === 'success') {
          this.setState({
            isSignUp: true,
          });
        } else if (res === 'failure') {
          this.setState({
            helperMessage: '이미 존재하는 이메일입니다.',
          });
        }
      })
      .catch(err => console.error(err));
  };

  render() {
    const { isSignUp, helperMessage } = this.state;
    if (isSignUp) {
      return <Redirect to="/signin" />;
    }
    return (
      <div>
        signup
        <input type="text" className="name" placeholder="Name" />
        <input type="email" className="email" placeholder="Email" />
        <input type="password" className="password" placeholder="Password" />
        <input
          type="button"
          value="Sign Up"
          onClick={this.handleSignUpButtonClicked}
        />
        <div>{helperMessage}</div>
      </div>
    );
  }
}
