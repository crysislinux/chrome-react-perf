import React, { Component, PropTypes } from 'react';
import ProfileControlContainer from '../containers/ProfileControlContainer';
import styles from './ProfileList.css';

// const propTypes = {
//   recording: PropTypes.bool.isRequired,
// };

/* eslint-disable  react/prefer-stateless-function */
export default class ProfileList extends Component {
  // static propTypes = propTypes;
  constructor(props) {
    super(props);
  }

  render() {
    // const { recording } = this.props;
    return (
      <div className={styles.profileList}>
        <div className={styles.profileControl}>
          <ProfileControlContainer />
        </div>
        <h3 className={styles.label}>Profiles</h3>
        <div className={styles.profiles}>

        </div>
      </div>
    );
  }
}
