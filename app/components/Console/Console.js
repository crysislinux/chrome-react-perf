import React from 'react';
import Log from './Log';
import Table from './Table';
import styles from './Console.css';

const propTypes = {
  data: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.array,
  ]).isRequired,
};

function renderData(data) {
  if (typeof data === 'string') {
    return <Log log={data} />;
  }

  return <Table tabular={data} />;
}

export default function Console({ data }) {
  return (
    <div className={styles.console}>
      {renderData(data)}
    </div>
  );
}

Console.propTypes = propTypes;
