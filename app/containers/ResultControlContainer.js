/* global chrome */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ResultControl from '../components/ResultControl';
import {
  changeShowItems,
} from '../actions';

const propTypes = {
  changeShowItems: PropTypes.func.isRequired,
  showItems: PropTypes.object.isRequired,
};

/* eslint-disable  react/prefer-stateless-function */
class ResultControlContainer extends Component {
  static propTypes = propTypes;

  constructor(props) {
    super(props);
    this.printWasted = false;
  }

  render() {
    return (
      <ResultControl
        onShowItemsChange={this.props.changeShowItems}
        showItems={this.props.showItems}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    recording: state.recording,
    measurements: state.measurements,
    showItems: state.showItems,
  };
}

export default connect(mapStateToProps, {
  changeShowItems,
})(ResultControlContainer);
