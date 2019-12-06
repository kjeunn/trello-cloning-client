import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import jwtDecode from 'jwt-decode';
import Nav from '../components/Nav';
import Home from '../components/BoardHome';
import { SERVER_ADDRESS } from '../config/.env';

export default class Setting extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      modal: false,
      setPasswordHelperMessage: '',
      helperMessage: '',
      isDeletedAccount: false,
    };
  }

  componentDidMount = async () => {
    this.getUserInfo();
  };

  getUserInfo = async () => {
    const userInfo = await fetch(`${SERVER_ADDRESS}/user/setting`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(res => res)
      .catch(err => console.error(err));
    this.setState({
      email: userInfo.email,
      name: userInfo.name,
    });
  };

  handleSettingNameOrPassword = async e => {
    e.persist();
    console.log(e.target.value);
    console.log(this.props);
    const newPassword = document.getElementsByClassName('new-password')[0]
      .value;
    const confirmNewPassword = document.getElementsByClassName(
      'confirm-new-password',
    )[0].value;
    let isUpdated = false;
    if (e.charCode === 13 || e.target.innerHTML === 'Save') {
      const userInfo = {
        // name: document.getElementsByClassName('name')[0].value,
        name: this.state.name,
        password: document.getElementsByClassName('confirm-new-password')[0]
          .value,
      };
      if (userInfo.name !== '') {
        // isUpdated = true;
        userInfo.name = this.state.name;
      } else {
        userInfo.name = this.state.name;
      }
      if (document.cookie) {
        const decodeToken = jwtDecode(document.cookie);
        if (newPassword === '' || confirmNewPassword === '') {
          isUpdated = false;
          this.setState({
            setPasswordHelperMessage: '변경할 비밀번호를 입력해주세요.',
          });
        } else if (
          decodeToken.email === this.state.email &&
          newPassword === confirmNewPassword
        ) {
          isUpdated = true;
        } else {
          this.setState({
            setPasswordHelperMessage: '비밀번호가 일치하는지 확인해 주세요.',
          });
        }
      }
      if (isUpdated) {
        await fetch(`${SERVER_ADDRESS}/user/setting`, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
          method: 'PUT',
          body: JSON.stringify(userInfo),
          credentials: 'include',
        })
          .then(res => res.json())
          .then(res => res)
          .catch(err => console.error(err));
        this.setState({
          setPasswordHelperMessage: '',
        });
      }
    }
    this.getUserInfo();
  };

  handleDeleteAccount = async () => {
    const userPassword = {
      password: document.getElementsByClassName('check-password')[0].value,
    };
    console.log(userPassword);
    if (document.cookie) {
      const decodeToken = jwtDecode(document.cookie);
      if (decodeToken.email === this.state.email) {
        const response = await fetch(`${SERVER_ADDRESS}/user/account`, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
          method: 'DELETE',
          body: JSON.stringify(userPassword),
          credentials: 'include',
        })
          .then(res => res.json())
          .then(res => {
            console.log(res);
            if (res === 'failure') {
              this.setState({
                helperMessage: '비밀번호를 확인해 주세요.',
              });
            } else if (res === 'success') {
              this.setState({
                isDeletedAccount: true,
              });
            }
          })
          .catch(err => console.error(err));
        console.log(response);
      }
    }
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      helperMessage: '',
    }));
  };

  render() {
    const {
      helperMessage,
      setPasswordHelperMessage,
      isDeletedAccount,
    } = this.state;
    if (isDeletedAccount) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Nav />
        <div className="row pl-1 pt-1 pb-1 pr-2 bg-success justify-content-between">
          <div className="d-inline-block">
            <Home />
          </div>
        </div>
        <div className="container" style={{ height: '100vh' }}>
          <div className="row">
            <div className="col-md-4" />
            <div className="col-md-4" style={{ height: '80vh' }}>
              <div className="m-5 p-3 border border-0 bg-dark rounded-pill">
                <div className="p-2 text-center text-white text-align-center justify-content-center">
                  <h5>{this.state.email}</h5>
                </div>{' '}
                <div className="p-2 text-center text-white text-align-center justify-content-center">
                  <h5>{this.state.name}</h5>
                </div>
              </div>

              {/* <div>이름 변경</div>
        <Input
          type="text"
          className="name"
          placeholder="New name"
          onKeyPress={e => this.handleSettingNameOrPassword(e)}
        />
        <Button onClick={e => this.handleSettingNameOrPassword(e)}>Save</Button> */}
              <div className="pt-3 pb-2 pl-2 text-align-center">
                <h6>비밀번호 변경</h6>
              </div>
              <Input
                type="password"
                className="new-password"
                placeholder="New password"
              />
              <div className="p-1" />
              <Input
                type="password"
                className="confirm-new-password"
                placeholder="Again new password"
              />
              <div className="p-3 text-align-center text-center justify-content-center">
                <small style={{ color: 'red' }}>
                  {setPasswordHelperMessage}
                </small>
              </div>
              <Button
                className="btn-block border-0 text-white bg-dark rounded-lg mb-3"
                onClick={e => this.handleSettingNameOrPassword(e)}
              >
                Save
              </Button>
              <div>
                <Button className="btn-block border-0" onClick={this.toggle}>
                  Delete account
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                  <ModalHeader toggle={this.toggle}>회원탈퇴</ModalHeader>
                  <ModalBody>
                    <Input
                      type="password"
                      className="check-password"
                      placeholder="Check password"
                    />
                  </ModalBody>
                  <div>{helperMessage}</div>
                  <ModalFooter>
                    <Button color="secondary" onClick={this.toggle}>
                      Cancel
                    </Button>
                    <Button color="primary" onClick={this.handleDeleteAccount}>
                      Confirm
                    </Button>
                  </ModalFooter>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
