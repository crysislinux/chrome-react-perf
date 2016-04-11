/* global chrome */
import React, { Children, Component, PropTypes } from 'react';
import ColDragHandler from './ColDragHandler';
import styles from './DoublePanel.css';

const propTypes = {
  children: PropTypes.array.isRequired
};

/* eslint-disable  react/prefer-stateless-function */
export default class DoublePanel extends Component {
  static propTypes = propTypes;
  constructor(props) {
    super(props);
    this.state = {
      leftWidth: 200
    };
    this.handleResize = this.handleResize.bind(this);
  }

  // handle resize callback from the divider
  handleResize(distance) {
    this.setState({
      leftWidth: this.state.leftWidth + distance
    });
  }

  render() {
    const { children } = this.props;
    const childArray = [];
    Children.forEach(children, (child) => {
      childArray.push(child);
    });

    return (
      <div className={styles.doublePanel}>
        <div className={styles.leftPanel}
          style={{ width: this.state.leftWidth }}
        >
          {childArray[0]}
        </div>
        <ColDragHandler onMove={this.handleResize} />
        <div className={styles.rightPanel}>{childArray[1]}</div>
      </div>
    );
  }
}
