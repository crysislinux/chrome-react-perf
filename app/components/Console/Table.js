import React from 'react';
import styles from './Table.css';

const propTypes = {
  tabular: React.PropTypes.array.isRequired,
};

function getHeaders(tabular) {
  if (tabular.length === 0) {
    return [];
  }
  return Object.keys(tabular[0]);
}

export default function Table({ tabular }) {
  if (tabular.length === 0) {
    return <div></div>;
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.th}>(index)</th>
          {getHeaders(tabular).map((h) => <th className={styles.th} key={h}>{h}</th>)}
        </tr>
      </thead>
      <tbody>
        {tabular.map((row, index) =>
          <tr key={index} className={styles.tr}>
            <td className={styles.td}>{index}</td>
            {getHeaders(tabular).map((h) => {
              const value = row[h];
              if (typeof value === 'string') {
                return <td key={h} className={styles.stringCell}>"{value}"</td>;
              }
              return <td key={h} className={styles.numberCell}>{value}</td>;
            })}
          </tr>)
        }
      </tbody>
    </table>
  );
}

Table.propTypes = propTypes;
