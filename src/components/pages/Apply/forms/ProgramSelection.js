import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { Divider, Typography, Button, Row, Col, Spin } from 'antd';

// urls

import { SNAP, CC } from '../../../../utils/data/urls';

const { Paragraph } = Typography;

const dsBaseUrl = process.env.REACT_APP_DS_API_URI;

const ProgramSelection = ({ formValues }) => {
  let {
    zipCode,
    familySize,
    monthlyIncome,
    unEmp90,
    foodWrkr,
    minorGuest,
  } = formValues;

  const [loadStatus, setLoadStatus] = useState(false);
  const [avilablePrograms, setAvailablePrograms] = useState({});

  // Only eligible for family promise if no other options are available
  const eligibleForFP =
    !avilablePrograms.SNAP && !avilablePrograms.CC && avilablePrograms.FP;

  const checkPrograms = async () => {
    // convert bools to '0' or '1'
    if (unEmp90) {
      unEmp90 = '1';
    }

    if (minorGuest) {
      minorGuest = '1';
    }

    if (foodWrkr) {
      foodWrkr = '1';
    } else {
      unEmp90 = '0';
      foodWrkr = '0';
      minorGuest = '0';
    }

    const queryString = `?zipcode=${zipCode}&family_size=${familySize}&income=${monthlyIncome}&unEmp90=${unEmp90}&foodWrkr=${foodWrkr}&minorGuest=${minorGuest}`;
    const callURL = dsBaseUrl + queryString;
    setLoadStatus(true);
    try {
      const res = await axios.post(callURL);

      setAvailablePrograms(res.data);
    } catch (err) {
      alert('error from DS API');
      console.error(err);
    } finally {
      setLoadStatus(false);
    }
  };

  useEffect(() => {
    checkPrograms();
    // eslint-disable-next-line
  }, []);

  return (
    <Spin spinning={loadStatus} tip="Checking your eligibility...">
      <h2>Programs You May Qualify For:</h2>
      <div style={{ height: '1rem' }}></div>
      <Row align="middle">
        <Col span={15}>
          <Paragraph strong={avilablePrograms.SNAP}>
            {' '}
            Spokane Neighborhood Action Partners (SNAP){' '}
          </Paragraph>
        </Col>
        <Col span={1} />
        <Col span={8}>
          <Button
            href={SNAP}
            target="_blank"
            type="primary"
            size="medium"
            disabled={!avilablePrograms.SNAP}
          >
            {avilablePrograms.SNAP ? 'Apply Now!' : 'Not Available'}
          </Button>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={15}>
          <Paragraph strong={avilablePrograms.CC}>
            {' '}
            Catholic Charites Rental Assistance{' '}
          </Paragraph>
        </Col>
        <Col span={1} />
        <Col span={8}>
          <Button
            href={CC}
            target="_blank"
            type="primary"
            size="medium"
            disabled={!avilablePrograms.CC}
          >
            {avilablePrograms.CC ? 'Apply Now!' : 'Not Available'}
          </Button>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={15}>
          <Paragraph strong={avilablePrograms.FP}>
            {' '}
            Family Promise of Spokane{' '}
          </Paragraph>
        </Col>
        <Col span={1} />
        <Col span={8}>
          <Button
            type="primary"
            size="medium"
            htmlType="submit"
            disabled={!eligibleForFP}
          >
            {eligibleForFP ? 'Apply Now!' : 'Not Available'}
          </Button>
        </Col>
      </Row>
    </Spin>
  );
};

export default ProgramSelection;
