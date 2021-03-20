import React from 'react';

import { useSelector } from 'react-redux';

import styles from '../../../../styles/pages/admin.module.css';

const Analytics = () => {
  const currentUser = useSelector(state => state.user.currentUser);

  const budget = currentUser.organization.budget;
  return (
    <div>
      <div className={styles.cardsContainer}>
        <Card value="18" title="Families served" color="#006ab3" />
        <Card value="62" title="People served" color="#006ab3" />
        <Card value={`$ ${budget}`} title="Budget" color="#006ab3" />
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
