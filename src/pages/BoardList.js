import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import { SERVER_ADDRESS } from '../config/.env';

export default class BoardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardList: [],
    };
  }

  componentDidMount = async () => {
    const boardList = await fetch(`${SERVER_ADDRESS}/user/board-list`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(res => res)
      .catch(err => console.error(err));
    this.setState({
      boardList,
    });
  };

  handleCreateBoardClicked = async e => {
    if (e.charCode === 13 || e.target.value === 'Create Board') {
      const elInput = document.getElementsByClassName('board')[0];
      const createdBoard = {
        boardTitle: elInput.value,
      };
      await fetch(`${SERVER_ADDRESS}/user/board`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(createdBoard),
        credentials: 'include',
      })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.error(err));

      const boardList = await fetch(`${SERVER_ADDRESS}/user/board-list`, {
        credentials: 'include',
      })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.error(err));
      elInput.value = '';
      this.setState({
        boardList,
      });
    }
  };

  render() {
    return (
      <div>
        <Nav />
        <div className="container" style={{ height: '100%' }}>
          <div style={{ height: '80%' }}>
            <div className="row h-100">
              <div className="col-md-12 my-auto p-10">
                <div className="w-auto mx-auto" />
                <div className="m-3">
                  <h5>Personal Boards</h5>
                </div>
                {this.state.boardList.map(board => {
                  return (
                    <span
                      className="container"
                      style={{ width: '700px' }}
                      key={board.id}
                    >
                      <span className="d-inline-block p-5 bg-success border-success rounded-lg">
                        <Link
                          className="text-white"
                          to={{
                            pathname: `/board/${board.id}`,
                            state: { title: board.title },
                          }}
                        >
                          {board.title}
                        </Link>
                      </span>
                    </span>
                  );
                })}
                <div className="row">
                  <div className="d-inline-block p-3 m-3">
                    <input
                      type="text"
                      className="board form-control-static-sm "
                      placeholder="+ Create new board"
                      onKeyPress={e => this.handleCreateBoardClicked(e)}
                    />

                    <span className="d-inline-block p-1">
                      <input
                        type="button"
                        className="btn-sm btn-secondary my-2 my-md-0 mr-5 "
                        value="Create Board"
                        onClick={e => this.handleCreateBoardClicked(e)}
                      />
                    </span>
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
