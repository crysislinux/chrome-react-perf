import React, { Component, PropTypes } from 'react';
import ResultControlContainer from '../containers/ResultControlContainer';
import shapeMeasurements from '../utils/shapeMeasurements';
import Console from './Console';
import styles from './ProfileResult.css';

const propTypes = {
  measurements: PropTypes.array.isRequired,
  showItems: PropTypes.object.isRequired,
  recording: PropTypes.bool.isRequired,
};

/* eslint-disable  react/prefer-stateless-function */
export default class ProfileResult extends Component {
  static propTypes = propTypes;

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  renderSection(name) {
    const { measurements, showItems } = this.props;
    if (!showItems[name]) {
      return null;
    }

    const shapName = `get${this.capitalize(name)}`;

    const messages = shapeMeasurements[shapName](measurements);

    return (
      <div>
        <h4 className={styles.sectionTitle}>{`Print ${this.capitalize(name)}`}</h4>
        {messages.map((item, index) => <Console key={index} data={item} />)}
      </div>
    );
  }

  renderResult() {
    return (
      <div>
        {this.renderSection('wasted')}
        {this.renderSection('dom')}
        {this.renderSection('inclusive')}
        {this.renderSection('exclusive')}
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
