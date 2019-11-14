import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
    console.log(boardList);
    this.setState({
      boardList,
    });
  };

  render() {
    return (
      <div>
        {this.state.boardList.map(board => {
          return (
            <span>
              <Link to={`/board/${board.id}`}>{board.title}</Link>
            </span>
          );
        })}
      </div>
    );
  }
}
