import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import { Form, Input, message, Button } from 'antd';

import styles from '../../../../styles/pages/admin.module.css';
import { axiosWithAuth } from '../../../../api/axiosWithAuth';

const Analytics = () => {
  const currentUser = useSelector(state => state.user.currentUser);

  const [budget, setBudget] = useState(currentUser.organization.budget);

  const handleNewBudgetSubmit = async () => {
    let orgId = currentUser.organization.id;

    try {
      await axiosWithAuth().put(`/orgs/${orgId}`, { budget });
    } catch (error) {
      message.error('error setting budget');
    }
  };

  const handleBudgetChange = e => {
    setBudget(e.target.value);
  };

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
    <div style={{ backgroundColor: props.color }} className={styles.card}>
      {isEditing ? (
        <Form onFinish={onSubmit}>
          <Input
            onChange={props.onChange}
            size="large"
            style={{ width: '30%' }}
            autoFocus={true}
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
  );
};

export default Analytics;
