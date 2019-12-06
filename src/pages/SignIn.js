import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import { SERVER_ADDRESS } from '../config/.env';
import Nav from '../components/Nav';

class SignIn extends Component {
  constructor() {
    super();
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
    await fetch(`${SERVER_ADDRESS}/user/signin`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(userInfo),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.status === 'success') {
          const { cookies } = this.props;
          cookies.set('trello', res.trello);
          this.setState({
            isSignIn: true,
          });
        } else if (res === 'failure') {
          this.setState({
            helperMessage: '로그인 정보를 확인해주세요',
          });
        }
      })
      .catch(err => console.error(err));
  };

  render() {
    const { helperMessage, isSignIn } = this.state;
    if (isSignIn) {
      return <Redirect to="/board-list" />;
    }
    return (
      <div style={{ height: '100%' }}>
        <Nav />
        <div
          className="container text-center justify-content-md-center mw-70%"
          style={{ height: '80%' }}
        >
          <div className="row h-100">
            <div className="col-md-12 my-auto mw-70%">
              <div className="card shadow-sm p-3 bg-white rounded col-md-12 mx-auto ">
                <div className="card-body">
                  <h2 className="card-title text-muted text-center text-justify pt-20 pb-20">
                    Trello
                  </h2>

                  <div className="mt-5 mb-2.5">
                    <input
                      type="email"
                      className="email"
                      style={{ width: '40%' }}
                      placeholder="   Enter email"
                    />
                  </div>

                  <div className="mt-3 mb-2">
                    <input
                      type="password"
                      className="password"
                      style={{ width: '40%' }}
                      placeholder="   Enter password"
                    />
                  </div>
                  <small style={{ color: 'red' }}>{helperMessage}</small>
                  <div className="container">
                    <div className="row mt-5">
                      <div className="col-sm">
                        <input
                          className="btn btn-secondary my-2 my-md-0 mr-5 mx-auto"
                          style={{ width: '40%' }}
                          type="button"
                          value="Log In"
                          onClick={this.handleLogInBtnClicked}
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

export default withCookies(SignIn);
