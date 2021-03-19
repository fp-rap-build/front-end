import React from 'react';

import styles from '../../../../styles/pages/admin.module.css';

const Analytics = () => {
  return (
    <div>
      <div className={styles.cardsContainer}>
        <Card value="18" title="Families served" color="#006ab3" />
        <Card value="62" title="People served" color="#006ab3" />
        <Card value="$ 1000" title="Budget" color="#006ab3" />
      </div>
    </div>
  );
};

const Card = props => {
  return (
    <div style={{ backgroundColor: props.color }} className={styles.card}>
      <h3 className={styles.value}>{props.value}</h3>
      <h4 className={styles.title}>{props.title}</h4>
    </div>
  );
};

export default Analytics;
