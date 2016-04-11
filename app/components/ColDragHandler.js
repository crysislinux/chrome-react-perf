import React, { Component, PropTypes } from 'react';
import styles from './ColDragHandler.css';

const propTypes = {
  onMove: PropTypes.func,
};

/* eslint-disable  react/prefer-stateless-function */
export default class DoublePanel extends Component {
  static propTypes = propTypes;
  constructor(props) {
    super(props);
    this.mouseDown = false;
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseDown(e) {
    e.preventDefault();

    this.mouseDown = true;
    this.startX = e.clientX;
  }

  handleMouseMove(e) {
    e.preventDefault();
    if (!this.mouseDown) {
      return;
    }

    const movingX = e.clientX;

    if (this.props.onMove) {
      this.props.onMove(movingX - this.startX);
    }
    this.startX = movingX;
  }

  handleMouseUp() {
    if (!this.mouseDown) {
      return;
    }
    this.mouseDown = false;
    this.restoreCursor();
  }

  handleMouseEnter() {
    this.setColResizeCursor();
  }

  handleMouseLeave() {
    if (!this.mouseDown) {
      this.restoreCursor();
    }
  }

  setColResizeCursor() {
    if (!this.cursor) {
      this.cursor = document.body.style.cursor;
      document.body.style.cursor = 'col-resize';
    }
  }

  restoreCursor() {
    document.body.style.cursor = this.cursor;
    this.cursor = null;
  }

  render() {
    return (
      <div className={styles.handler}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className={styles.line}></div>
      </div>
    );
  }
}
