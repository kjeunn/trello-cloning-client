import React, { Component } from 'react';
import Nav from '../components/Nav';

export default class Home extends Component {
  render() {
    return (
      <div style={{ height: '100%' }}>
        <Nav />
        <div style={{ height: '80%' }}>
          <div className="row h-100">
            <div className="col-sm-12 my-auto">
              <div className="w-auto mx-auto">
                <h1 className="text-muted text-center pt-20 pb-20">Trello</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
