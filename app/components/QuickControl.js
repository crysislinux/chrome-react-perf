import React from 'react';
import styles from './QuickControl.css';

const propTypes = {
  children: React.PropTypes.node
};

export default function QuickControl({ children }) {
  return (
    <div className={styles.quickControl}>
      {children}
    </div>
  );
}

QuickControl.propTypes = propTypes;
