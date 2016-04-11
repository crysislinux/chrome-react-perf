import React from 'react';
import styles from './Log.css';

const propTypes = {
  log: React.PropTypes.string.isRequired,
};

export default function Log({ log }) {
  return (
    <div className={styles.log}>
      {log}
    </div>
  );
}

Log.propTypes = propTypes;
