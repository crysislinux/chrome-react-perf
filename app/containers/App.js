import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DoublePanel from '../components/DoublePanel';
import ProfileList from '../components/ProfileList';
import ProfileResult from '../components/ProfileResult';
import {
  connect as connectToContentScript
} from '../actions';

class App extends Component {
  static propTypes = {
    connectToContentScript: PropTypes.func.isRequired,
    perfs: PropTypes.object.isRequired,
    showItems: PropTypes.object.isRequired,
    recording: PropTypes.bool.isRequired,
  };

  componentWillMount() {
    this.props.connectToContentScript();
  }
  render() {
    return (
      <DoublePanel>
        <ProfileList />
        <ProfileResult
          perfs={this.props.perfs}
          showItems={this.props.showItems}
          recording={this.props.recording}
        />
      </DoublePanel>
    );
  }
}

function mapStateToProps(state) {
  return {
    perfs: state.perfs,
    showItems: state.showItems,
    recording: state.recording,
  };
}

export default connect(mapStateToProps, {
  connectToContentScript
})(App);
