import React, { Component } from 'react';
import Home from '../components/BoardHome';

export default class Board extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      lists: [],
      boardTitle: '',
    };
  }

  async componentDidMount() {
    const listsAndCards = await fetch(
      `http://localhost:3002/user/board/${this.props.match.params.boardId}`,
      {
        credentials: 'include',
      },
    )
      .then(res => res.json())
      .then(res => res)
      .catch(err => console.error(err));
    const boardTitle = await this.getBoardTitle();
    this.setState({
      boardTitle,
      lists: listsAndCards,
    });
  }

  handleBoardTitleClicked = async () => {
    const elDiv = document.getElementsByClassName('board-title')[0];
    const elInput = document.createElement('input');
    elInput.value = elDiv.innerHTML;
    elInput.className = 'board-title';
    elInput.onkeypress = e => {
      this.handleBoardTitleChanged(e);
    };
    const parentDiv = elDiv.parentNode;
    parentDiv.replaceChild(elInput, elDiv);
  };

  handleBoardTitleChanged = async e => {
    if (e.charCode === 13) {
      const updatedBoard = {
        boardId: this.props.match.params.boardId,
        boardTitle: document.getElementsByClassName('board-title')[0].value,
      };
      await fetch('http://localhost:3002/user/board', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(updatedBoard),
        credentials: 'include',
      })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.error(err));
      this.setState({
        boardTitle: updatedBoard.boardTitle,
      });
      this.props.location.state = { title: updatedBoard.boardTitle };
      const elInput = document.getElementsByClassName('board-title')[0];
      const elDiv = document.createElement('div');
      elDiv.innerText = elInput.value;
      elDiv.className = 'board-title';
      elDiv.onclick = () => {
        this.handleBoardTitleClicked();
      };
      const parentDiv = elInput.parentNode;
      parentDiv.replaceChild(elDiv, elInput);
    }
  };

  getBoardTitle = async () => {
    const board = await fetch(`http://localhost:3002/user/board-list`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(res =>
        res.find(fetchedBoard => {
          return fetchedBoard.id === Number(this.props.match.params.boardId);
        }),
      );
    return board.title;
  };

  render() {
    return (
      <div>
        <Home />
        <div
          className="board-title"
          onClick={this.handleBoardTitleClicked}
          onKeyPress={this.handleBoardTitleChanged}
          role="button"
          tabIndex="0"
        >
          {this.state.boardTitle}
        </div>
        {this.state.lists.map(listAndCards => {
          return (
            <span key={listAndCards.id}>
              {listAndCards.title}
              {listAndCards.cardLists.map(card => {
                return <span key={card.id}>{card.title}</span>;
              })}
            </span>
          );
        })}
      </div>
    );
  }
}
