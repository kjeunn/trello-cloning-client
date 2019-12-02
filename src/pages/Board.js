import React, { Component } from 'react';
import Home from '../components/BoardHome';
import Nav from '../components/Nav';
import List from '../components/List';
import { SERVER_ADDRESS } from '../config/.env';

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      boardTitle: '',
    };
  }

  componentDidMount = async () => {
    await this.handleUpdateBoard();
  };

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
      await fetch(`${SERVER_ADDRESS}/user/board`, {
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
    const board = await fetch(`${SERVER_ADDRESS}/user/board-list`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(res => {
        return res.find(fetchedBoard => {
          return fetchedBoard.id === Number(this.props.match.params.boardId);
        });
      });
    return board.title;
  };

  handleUpdateBoard = async () => {
    const listsAndCards = await fetch(
      `${SERVER_ADDRESS}/user/board/${this.props.match.params.boardId}`,
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
  };

  handleDeleteBoard = async () => {
    const boardId = {
      boardId: this.props.match.params.boardId,
    };
    await fetch(`${SERVER_ADDRESS}/user/board`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
      body: JSON.stringify(boardId),
      credentials: 'include',
    })
      .then(res => res.json())
      .then(res => res)
      .catch(err => console.error(err));
    this.props.history.push('/board-list');
  };

  render() {
    return (
      <div>
        <Nav />
        <div className="row pl-1 pt-1 pb-1 pr-2 bg-success justify-content-between">
          <div className="d-inline-block">
            <Home />
          </div>
          <input
            type="button"
            className="btn btn-sm border-1 border-white bg-success text-white rounded-lg pt-0 pb-0 pl-5 pr-5 mr-5"
            value="Delete all"
            onClick={this.handleDeleteBoard}
          />
        </div>
        <div className="row w-100">
          <div className="container p-3" style={{ fontSize: '1.5rem' }}>
            <div className="d-inline text-dark text-left text-justify">
              <div
                className="board-title"
                onClick={this.handleBoardTitleClicked}
                onKeyPress={this.handleBoardTitleChanged}
                role="button"
                tabIndex="0"
              >
                {this.state.boardTitle}
              </div>
            </div>
          </div>
          <div
            className="container-fluid p-0 m-0"
            style={{ height: '100vh', overflowX: 'auto' }}
          >
            <div className="container d-flex p-0">
              {this.state.lists.map(listAndCards => {
                return (
                  <span className="row p-3">
                    <span className="col-md-6">
                      <List
                        key={listAndCards.id}
                        listData={listAndCards}
                        boardId={this.props.match.params.boardId}
                        handleUpdateBoard={this.handleUpdateBoard}
                      />
                    </span>
                  </span>
                );
              })}
              <span className="row pl-3 pr-3 pt-2 pb-2">
                <span className="col-md-6 pull-right">
                  <List
                    listData={undefined}
                    boardId={this.props.match.params.boardId}
                    handleUpdateBoard={this.handleUpdateBoard}
                  />
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
