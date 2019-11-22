import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  handleAddCardClicked = async e => {
    if (
      e.charCode === 13 ||
      e.target.value === 'Add a card' ||
      e.target.value === 'Add another card'
    ) {
      const createdCard = {
        listId: this.props.listId,
        cardTitle:
          e.target.value === 'Add a card' ||
          e.target.value === 'Add another card'
            ? e.target.previousSibling.value
            : e.target.value,
        cardDescript: '',
      };
      await fetch('http://localhost:3002/card', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(createdCard),
        credentials: 'include',
      })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.error(err));
      this.props.handleUpdateBoard();
    }
  };

  handleCardTitleOrDescriptClicked = e => {
    const elDiv = e.target;
    const elInput = document.createElement('input');
    elInput.value =
      elDiv.innerHTML === 'Add a more detailed description...'
        ? ''
        : elDiv.innerHTML;
    elInput.className = `${elDiv.className}`;
    elInput.onkeypress = event => {
      this.handleCardTitleOrDescriptKeyPressed(event);
    };
    elInput.onblur = blurEvent => {
      this.handleCardTitleOrDescriptBlurred(blurEvent);
    };
    const parentDiv = elDiv.parentNode;
    parentDiv.replaceChild(elInput, elDiv);
    elInput.focus();
  };

  handleCardTitleOrDescriptKeyPressed = e => {
    if (e.charCode === 13) {
      e.target.blur();
    }
  };

  handleCardTitleOrDescriptBlurred = async e => {
    let isUpdated = false;
    const updatedCard = {
      cardId: this.props.cardData.id,
    };
    if (e.target.value === '' && e.target.className === 'card-descript') {
      updatedCard.cardTitle = this.props.cardData.title;
      updatedCard.cardDescript = '';
      isUpdated = true;
    }
    if (e.target.value !== '') {
      if (e.target.className === 'card-title') {
        updatedCard.cardTitle = e.target.value;
        updatedCard.cardDescript = this.props.cardData.description;
      } else if (e.target.className === 'card-descript') {
        updatedCard.cardDescript = e.target.value;
        updatedCard.cardTitle = this.props.cardData.title;
      }
      isUpdated = true;
    }

    if (isUpdated) {
      await fetch('http://localhost:3002/card', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(updatedCard),
        credentials: 'include',
      })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.error(err));
    }

    const elInput = e.target;
    const elDiv = document.createElement('div');
    let innerText;
    if (elInput.className === 'card-title') {
      innerText =
        updatedCard.cardTitle === undefined
          ? this.props.cardData.title
          : updatedCard.cardTitle;
    } else if (elInput.className === 'card-descript') {
      innerText =
        updatedCard.cardDescript === ''
          ? 'Add a more detailed description...'
          : updatedCard.cardDescript;
    }
    elDiv.innerText = innerText;
    elDiv.className = `${elInput.className}`;
    elDiv.onclick = event => {
      this.handleCardTitleOrDescriptClicked(event);
    };
    const parentDiv = elInput.parentNode;
    parentDiv.replaceChild(elDiv, elInput);
    this.props.handleUpdateBoard();
  };

  handleDeleteCard = async () => {
    const cardId = {
      cardId: this.props.cardData.id,
    };
    await fetch('http://localhost:3002/card', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
      body: JSON.stringify(cardId),
      credentials: 'include',
    })
      .then(res => res.json())
      .then(res => res)
      .catch(err => console.error(err));
    this.props.handleUpdateBoard();
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  };

  render() {
    if (this.props.cardData === undefined) {
      return (
        <div>
          <input
            type="text"
            className="card"
            placeholder={
              this.props.cardsLength === 0
                ? '+ Add a card'
                : '+ Add another card'
            }
            onKeyPress={e => this.handleAddCardClicked(e)}
          />
          <input
            type="button"
            value={
              this.props.cardsLength === 0 ? 'Add a card' : 'Add another card'
            }
            onClick={e => this.handleAddCardClicked(e)}
          />
        </div>
      );
    }
    return (
      <div>
        <Button onClick={this.handleDeleteCard}>X</Button>
        <Button onClick={this.toggle}>{this.props.cardData.title}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            <div
              className="card-title"
              onClick={e => this.handleCardTitleOrDescriptClicked(e)}
              role="button"
              tabIndex="0"
            >
              {this.props.cardData.title}
            </div>
          </ModalHeader>
          <ModalBody>
            Description
            {this.props.cardData.description === '' ? (
              <div
                className="card-descript"
                onClick={e => this.handleCardTitleOrDescriptClicked(e)}
                role="button"
                tabIndex="0"
              >
                Add a more detailed description...
              </div>
            ) : (
              <div
                className="card-descript"
                onClick={e => this.handleCardTitleOrDescriptClicked(e)}
                role="button"
                tabIndex="0"
              >
                {this.props.cardData.description}
              </div>
            )}
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
