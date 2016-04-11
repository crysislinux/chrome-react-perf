/* global chrome */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ProfileControl from '../components/ProfileControl';
import {
  startRecord,
  stopRecord,
  getLastMeasurements,
} from '../actions';

const propTypes = {
  recording: PropTypes.bool.isRequired,
  startRecord: PropTypes.func.isRequired,
  stopRecord: PropTypes.func.isRequired,
  getLastMeasurements: PropTypes.func.isRequired,
};

/* eslint-disable  react/prefer-stateless-function */
class ProfileListContainer extends Component {
  static propTypes = propTypes;
  constructor(props) {
    super(props);
    this.handleToggleRecordClick = this.handleToggleRecordClick.bind(this);
  }

  handleToggleRecordClick() {
    if (this.props.recording) {
      this.props.stopRecord();
      this.props.getLastMeasurements();
    } else {
      this.props.startRecord();
    }
  }

  render() {
    const { recording } = this.props;

    return (
      <ProfileControl
        recording={recording}
        onToggleRecordClick={this.handleToggleRecordClick}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    recording: state.recording,
  };
}

export default connect(mapStateToProps, {
  startRecord,
  stopRecord,
  getLastMeasurements,
})(ProfileListContainer);
