/* global chrome */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ResultControl from '../components/ResultControl';
import {
  changeShowItems,
  getPerfData,
} from '../actions';

const propTypes = {
  recording: PropTypes.bool.isRequired,
  changeShowItems: PropTypes.func.isRequired,
  showItems: PropTypes.object.isRequired,
  getPerfData: PropTypes.func.isRequired,
};

class ResultControlContainer extends Component {
  static propTypes = propTypes;

  componentWillReceiveProps(nextProps) {
    // get result after stop
    if (this.props.recording && !nextProps.recording) {
      // this.props.getWasted();
      this.props.getPerfData();
    }
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
    showItems: state.showItems,
  };
}

export default connect(mapStateToProps, {
  changeShowItems,
  getPerfData,
})(ResultControlContainer);
