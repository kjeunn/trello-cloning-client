import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignIn: false,
      helperMessage: '',
    };
  }

  handleLogInBtnClicked = async () => {
    const userInfo = {
      email: document.getElementsByClassName('email')[0].value,
      password: document.getElementsByClassName('password')[0].value,
    };
    await fetch('http://localhost:3002/user/signin', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(userInfo),
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res);
        if (res === 'success') {
          this.setState({
            isSignIn: true,
          });
        } else if (res === 'failure') {
          this.setState({
            helperMessage: '로그인 정보를 확인해주세요',
          });
        }
      });
  };

  render() {
    const { helperMessage, isSignIn } = this.state;
    if (isSignIn) {
      return <Redirect to="/board-list" />;
    }
    return (
      <div>
        signin
        <input type="email" className="email" placeholder="Email" />
        <input type="password" className="password" placeholder="Password" />
        <input
          type="button"
          value="Log In"
          onClick={this.handleLogInBtnClicked}
        />
        <div>{helperMessage}</div>
      </div>
    );
  }
}
