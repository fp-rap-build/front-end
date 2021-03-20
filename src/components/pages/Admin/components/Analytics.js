import React, { useEffect, useState } from 'react';
import styles from '../../../../styles/pages/admin.module.css';
import { axiosWithAuth } from '../../../../api/axiosWithAuth';

const Analytics = () => {
  const [peopleServed, setPeopleServed] = useState();
  const [familiesServed, setFamiliesServed] = useState();

  function getPeopleServed() {
    axiosWithAuth()
      .get('/analytics/people_served')
      .then(res => {
        // const familiesServed = res.data.sumFamiliesServed;
        setPeopleServed(res.data.sumPeopleServed[0].count);
        // const numFamiliesServed = setFamiliesServed(familiesServed[0].count);
      })
      .catch(err => console.error(err));
  }
  function getFamiliesServed() {
    axiosWithAuth()
      .get('/analytics/families_served')
      .then(res => {
        // const familiesServed = res.data.sumFamiliesServed;
        setFamiliesServed(res.data.sumFamiliesServed[0].count);
        // const numFamiliesServed = setFamiliesServed(familiesServed[0].count);
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    getFamiliesServed();
    getPeopleServed();
  }, []);

  return (
    <div>
      <div className={styles.cardsContainer}>
        <Card value={familiesServed} title="Families served" color="#006ab3" />
        <Card value={peopleServed} title="People served" color="#006ab3" />
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
