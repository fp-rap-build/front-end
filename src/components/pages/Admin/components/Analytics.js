import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { Form, Input, message, Button } from 'antd';

import { EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

import styles from '../../../../styles/pages/admin.module.css';
import { axiosWithAuth } from '../../../../api/axiosWithAuth';
import LoadingComponent from '../../../common/LoadingComponent';

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

  const currentUser = useSelector(state => state.user.currentUser);
  const orgId = currentUser.organization.id;

  const [budget, setBudget] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      let organization = await axiosWithAuth().get(`/orgs/${orgId}`);

      setBudget(organization.data.budget);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleNewBudgetSubmit = async () => {
    try {
      await axiosWithAuth().put(`/orgs/${orgId}`, { budget });
    } catch (error) {
      message.error('error setting budget');
    }
  };

  const handleBudgetChange = e => {
    const { value } = e.target;

    if (isNaN(value)) return; // Only process numbers

    setBudget(value);
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div>
      <div className={styles.cardsContainer}>
        <Card value="18" title="Families served" color="#006ab3" />
        <Card value="62" title="People served" color="#006ab3" />
        <Card
          value={budget}
          title="Budget"
          color="#006ab3"
          icon="$"
          editable={true}
          onSubmit={handleNewBudgetSubmit}
          onChange={handleBudgetChange}
        />
      </div>
    </div>
  );
};

const Card = props => {
  const [isEditing, setIsEditing] = useState(false);

  const onDoubleClick = () => {
    if (!props.editable) return;

    setIsEditing(true);
  };

  const onSubmit = () => {
    if (props.onSubmit) props.onSubmit();

    setIsEditing(false);
  };
  return (
    <div>
      <div style={{ backgroundColor: props.color }} className={styles.card}>
        {props.editable && (
          <div className={styles.icons}>
            {isEditing ? (
              <>
                <CloseOutlined
                  onClick={() => setIsEditing(false)}
                  className={styles.icon}
                />
                <CheckOutlined onClick={onSubmit} className={styles.icon} />
              </>
            ) : (
              <EditOutlined
                onClick={() => setIsEditing(true)}
                className={styles.icon}
              />
            )}
          </div>
        )}
        {isEditing ? (
          <Form onFinish={onSubmit}>
            <Input
              onChange={props.onChange}
              size="large"
              style={{ width: '50%', fontSize: '2rem' }}
              autoFocus={true}
              value={props.value}
              defaultValue={props.value}
            />
            <Button htmlType="submit" />
          </Form>
        ) : (
          <h3 onDoubleClick={onDoubleClick} className={styles.value}>
            {props.value}
          </h3>
        )}
        <h4 className={styles.title}>{props.title}</h4>
      </div>
    </div>
  );
};

export default Analytics;
