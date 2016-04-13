import React, { Component, PropTypes } from 'react';
import ResultControlContainer from '../containers/ResultControlContainer';
import Console from './Console';
import styles from './ProfileResult.css';

const propTypes = {
  perfs: PropTypes.object.isRequired,
  showItems: PropTypes.object.isRequired,
  recording: PropTypes.bool.isRequired,
};

/* eslint-disable  react/prefer-stateless-function */
export default class ProfileResult extends Component {
  static propTypes = propTypes;

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  isEmpty(perfs) {
    for (const p in perfs) {
      if (perfs.hasOwnProperty(p)) {
        if (perfs[p].length > 0) {
          return false;
        }
      }
    }

    return true;
  }

  renderSection(name) {
    const { perfs, showItems } = this.props;
    const messages = perfs[name];
    if (!showItems[name] || perfs[name].length === 0) {
      return null;
    }

    return (
      <div>
        <h4 className={styles.sectionTitle}>{`Print ${this.capitalize(name)}`}</h4>
        {messages.map((item, index) => <Console key={index} data={item} />)}
      </div>
    );
  }

  renderResult() {
    const empty = <div>Nothing to print. Click on "Start" to start recording</div>;
    return (
      <div>
        {this.renderSection('wasted')}
        {this.renderSection('dom')}
        {this.renderSection('inclusive')}
        {this.renderSection('exclusive')}
        {this.isEmpty(this.props.perfs) && empty}
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className={styles.resultControl}>
          <ResultControlContainer />
        </div>
        <div className={styles.result}>
          {this.props.recording && <div>Recording</div>}
          {!this.props.recording && this.renderResult()}
        </div>
      </div>
    );
  }
}
