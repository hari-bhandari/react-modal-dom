import React, { Component } from 'react';
import { EventEmitter } from 'events';
import './index.css';

class ModalManagement extends EventEmitter {
  constructor() {
    super();
    this.dom = null;

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open(dom) {
    this.dom = dom;
    this.emitChange();
  }

  close() {
    this.dom = null;
    this.emitChange();
  }

  emitChange() {
    this.emit('modal', this.dom);
  }
}

export const modal = new ModalManagement();

export default class ModalComponent extends Component {
  state = {
    dom: null,
  };

  componentDidMount() {
    modal.addListener('modal', this.handleModal);
    window.addEventListener('keydown', this.hendleKeyClose);
  }

  componentWillUnmount() {
    modal.removeListener('modal', this.handleModal);
    window.removeEventListener('keydown', this.hendleKeyClose);
  }

  handleModal = (dom) => {
    this.setState({ dom });
  };

  hendleKeyClose = (e) => {
    if (e.code !== 'Escape') return;
    modal.close();
  };

  hendleClickClose = (e) => {
    if (e.target !== e.currentTarget) return;
    modal.close();
  };

  render() {
    const { dom } = this.state;
    return (
      !!dom && (
        <div className='react-modal-backdrop' onClick={this.hendleClickClose}>
          <div className='react-modal-scroll' onClick={this.hendleClickClose}>
            {dom}
          </div>
        </div>
      )
    );
  }
}
