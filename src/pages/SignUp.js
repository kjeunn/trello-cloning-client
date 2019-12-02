import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { SERVER_ADDRESS } from '../config/.env';
import Nav from '../components/Nav';

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
    await fetch(`${SERVER_ADDRESS}/user/signup`, {
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
      <div style={{ height: '100%' }}>
        <Nav />
        <div
          className="container text-center justify-content-md-center mw-70%"
          style={{ height: '80%' }}
        >
          <div className="row h-100 justify-content-center">
            <div className="col-md-12 my-auto mw-70%">
              <div className="card shadow-sm p-3 bg-white rounded col-md-12 mx-auto">
                <div className="card-body">
                  <h2 className="card-title text-muted text-center text-justify pt-20 pb-20">
                    Sign Up
                  </h2>
                  <div className="mt-5 mb-2.5">
                    <input
                      type="text"
                      className="name"
                      style={{ width: '40%' }}
                      placeholder="Name"
                    />
                  </div>
                  <div className="mt-3 mb-2">
                    <input
                      type="email"
                      className="email"
                      style={{ width: '40%' }}
                      placeholder="Email"
                    />
                  </div>
                  <div className="mt-3 mb-2">
                    <input
                      type="password"
                      className="password"
                      style={{ width: '40%' }}
                      placeholder="Password"
                    />
                  </div>
                  <small style={{ color: 'red' }}>{helperMessage}</small>
                  <div className="container">
                    <div className="row mt-5">
                      <div className="col-sm">
                        <input
                          className="btn btn-secondary my-2 my-md-0 mr-5 mt-3 mx-auto"
                          style={{ width: '40%' }}
                          type="button"
                          value="Sign Up"
                          onClick={this.handleSignUpButtonClicked}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
