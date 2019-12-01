import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {
  Home,
  SignIn,
  SignUp,
  SignOut,
  BoardList,
  Board,
  Setting,
  Page404,
} from '../pages';

export default class App extends Component {
  render() {
    return (
      <div style={{ height: '100vh' }}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signout" component={SignOut} />
          <Route path="/board-list" component={BoardList} />
          <Route path="/board/:boardId" component={Board} />
          <Route path="/setting" component={Setting} />
          <Route path="/404" component={Page404} />
          <Redirect to="/404" />
        </Switch>
      </div>
    );
  }
}
