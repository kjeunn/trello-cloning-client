import React, { Component } from 'react';
import { Input } from 'reactstrap';
import Card from './Card';

export default class List extends Component {
  handleAddListClicked = async e => {
    if (e.charCode === 13 || e.target.value === 'Add List') {
      const elInput = document.getElementsByClassName('list')[0];
      const createdList = {
        boardId: this.props.boardId,
        listTitle: elInput.value,
      };
      await fetch('http://localhost:3002/list', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(createdList),
        credentials: 'include',
      })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.error(err));
      elInput.value = '';
      this.props.handleUpdateBoard();
    }
  };

  handleListTitleClicked = async e => {
    const elDiv = e.target;
    const elInput = document.createElement('input');
    elInput.value = elDiv.innerHTML;
    elInput.className = 'list-title';
    elInput.onkeypress = event => {
      this.handleListTitleKeyPressed(event);
    };
    elInput.onblur = blurEvent => {
      this.handleListTitleBlurred(blurEvent);
    };
    const parentDiv = elDiv.parentNode;
    parentDiv.replaceChild(elInput, elDiv);
    elInput.focus();
  };

  handleListTitleKeyPressed = e => {
    if (e.charCode === 13) {
      e.target.blur();
    }
  };

  handleListTitleBlurred = async e => {
    if (e.target.value !== '') {
      const updatedList = {
        listId: this.props.listData.id,
        listTitle: e.target.value,
      };
      await fetch('http://localhost:3002/list', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(updatedList),
        credentials: 'include',
      })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.error(err));
      // this.setState({
      //   listTitle: updatedList.listTitle,
      // });
    }

    const elInput = e.target;
    const elDiv = document.createElement('div');
    elDiv.innerText =
      elInput.value === '' ? this.props.listData.title : elInput.value;
    elDiv.className = 'list-title';
    elDiv.onclick = event => {
      this.handleListTitleClicked(event);
    };
    const parentDiv = elInput.parentNode;
    parentDiv.replaceChild(elDiv, elInput);
    this.props.handleUpdateBoard();
  };

  handleDeleteClicked = async () => {
    const listId = {
      listId: this.props.listData.id,
    };
    await fetch('http://localhost:3002/list', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
      body: JSON.stringify(listId),
      credentials: 'include',
    })
      .then(res => res.json())
      .then(res => res)
      .catch(err => console.error(err));
    this.props.handleUpdateBoard();
  };

  render() {
    if (this.props.listData === undefined) {
      return (
        <div>
          <input
            type="text"
            className="list"
            placeholder="+ Add anoter list"
            onKeyPress={e => this.handleAddListClicked(e)}
          />
          <input
            type="button"
            value="Add List"
            onClick={e => this.handleAddListClicked(e)}
          />
        </div>
      );
    }
    return (
      <div>
        <Input type="button" value="X" onClick={this.handleDeleteClicked} />
        <div
          className="list-title"
          onClick={e => this.handleListTitleClicked(e)}
          role="button"
          tabIndex="0"
        >
          {this.props.listData.title}
        </div>
        {this.props.listData.cardLists.map(card => (
          <Card
            key={card.id}
            cardData={card}
            listId={this.props.listData.id}
            handleUpdateBoard={this.props.handleUpdateBoard}
          />
        ))}
        <Card
          cardData={undefined}
          cardsLength={this.props.listData.cardLists.length}
          listId={this.props.listData.id}
          handleUpdateBoard={this.props.handleUpdateBoard}
        />
      </div>
    );
  }
}
