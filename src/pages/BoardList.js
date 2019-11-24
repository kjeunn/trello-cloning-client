import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LogOut from '../components/LogOut';

export default class BoardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardList: [],
    };
  }

  componentDidMount = async () => {
    const boardList = await fetch('http://localhost:3002/user/board-list', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(res => res)
      .catch(err => console.error(err));
    this.setState({
      boardList,
    });
  };

  handleCreateBoardClicked = async () => {
    const elInput = document.getElementsByClassName('board')[0];
    const createdBoard = {
      boardTitle: elInput.value,
    };
    await fetch('http://localhost:3002/user/board', {
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

    const boardList = await fetch('http://localhost:3002/user/board-list', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(res => res)
      .catch(err => console.error(err));
    elInput.value = '';
    this.setState({
      boardList,
    });
  };

  render() {
    return (
      <div>
        <LogOut />
        {this.state.boardList.map(board => {
          return (
            <span key={board.id}>
              <Link
                to={{
                  pathname: `/board/${board.id}`,
                  state: { title: board.title },
                }}
              >
                {board.title}
              </Link>
            </span>
          );
        })}
        <input type="text" className="board" placeholder="+ Create new board" />
        <input
          type="button"
          value="Create Board"
          onClick={this.handleCreateBoardClicked}
        />
      </div>
    );
  }
}
