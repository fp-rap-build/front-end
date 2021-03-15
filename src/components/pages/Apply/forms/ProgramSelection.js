import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { Divider, Typography, Button, Row, Col, Spin } from 'antd';

// urls

import { SNAP, CC } from '../../../../utils/data/urls';

const { Paragraph } = Typography;

const dsBaseUrl = process.env.REACT_APP_DS_API_URI;

const ProgramSelection = ({ formValues }) => {
  let { zipCode, familySize, monthlyIncome, unEmp90, foodWrkr } = formValues;

  const [loadStatus, setLoadStatus] = useState(false);
  const [avilablePrograms, setAvailablePrograms] = useState({});

  const checkPrograms = async () => {
    // convert bools to 0 or 1
    if (unEmp90) {
      unEmp90 = 1;
    }
    if (foodWrkr) {
      foodWrkr = 1;
    } else {
      unEmp90 = 0;
      foodWrkr = 0;
    }

    const queryString = `?zipcode=${zipCode}&family_size=${familySize}&income=${monthlyIncome}&unEmp90=${unEmp90}&foodWrkr=${foodWrkr}`;
    const callURL = dsBaseUrl + queryString;
    setLoadStatus(true);
    console.log(callURL);
    try {
      const res = await axios.post(callURL);

      console.log(res.data);

      let mockResponse = { SNAP: 1, CC: 1, FP: 1 };

      setAvailablePrograms(mockResponse);
    } catch (err) {
      alert('error from DS API');
      console.log(err);
    } finally {
      setLoadStatus(false);
    }
  };

  useEffect(() => {
    checkPrograms();

    // eslint-disable-next-line
  }, []);

  return (
    <Spin spinning={loadStatus} tip="Crunching the numbers...">
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
            disabled={!avilablePrograms.FP}
          >
            {avilablePrograms.FP ? 'Apply Now!' : 'Not Available'}
          </Button>
        </Col>
      </Row>
    </Spin>
  );
};

export default ProgramSelection;
