/* global chrome */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DoublePanel from '../components/DoublePanel';
import ProfileList from '../components/ProfileList';
import ProfileResult from '../components/ProfileResult';
import {
  connect as connectToContentScript
} from '../actions';
/* eslint-disable  react/prefer-stateless-function */
class App extends Component {
  componentWillMount() {
    this.props.connectToContentScript();
  }
  render() {
    return (
      <DoublePanel>
        <ProfileList />
        <ProfileResult
          measurements={this.props.measurements}
          showItems={this.props.showItems}
          recording={this.props.recording}
        />
      </DoublePanel>
    );
  }
}

function mapStateToProps(state) {
  return {
    measurements: state.measurements,
    showItems: state.showItems,
    recording: state.recording,
  };
}

export default connect(mapStateToProps, {
  connectToContentScript
})(App);
