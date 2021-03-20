import React, { useState } from 'react';
import styles from '../../../../styles/pages/admin.module.css';
import { axiosWithAuth } from '../../../../api/axiosWithAuth';

const Analytics = () => {
  const [peopleServed, setPeopleServed] = useState();
  const [familiesServed, setFamiliesServed] = useState();

  function getPeopleServed() {
    axiosWithAuth()
      .get('/analytics')
      .then(res => {
        const peopleServed = res.data.sumPeopleServed;
        const familiesServed = res.data.sumFamiliesServed;

        const numPeopleServed = setPeopleServed(peopleServed[0].count);
        const numFamiliesServed = setFamiliesServed(familiesServed[0].count);

        return [numPeopleServed, numFamiliesServed];
      })
      .catch(err => console.error(err));
  }

  return (
    <div>
      <div className={styles.cardsContainer}>
        {getPeopleServed()}
        <Card value="64" title="Families served" color="#006ab3" />
        <Card
          value={getPeopleServed[0]}
          title="People served"
          color="#006ab3"
        />
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
