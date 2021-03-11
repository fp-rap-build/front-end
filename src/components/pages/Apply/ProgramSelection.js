import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { Divider, Typography, Button, Row, Col } from 'antd';

const { Title, Paragraph } = Typography;

const dsBaseUrl = process.env.REACT_APP_DS_API_URI;

const ProgramSelection = ({ formValues }) => {
  const { zipCode, familySize, monthlyIncome } = formValues;

  const [avilablePrograms, setAvailablePrograms] = useState({});

  const checkPrograms = async () => {
    const queryString = `?zipcode=${zipCode}&family_size=${familySize}&income=${monthlyIncome}`;
    const callURL = dsBaseUrl + queryString;

    try {
      const res = await axios.post(callURL);
      setAvailablePrograms(res.data);
    } catch (err) {
      alert('error from DS API');
      console.log(err);
    }
  };

  useEffect(() => {
    checkPrograms();
  });

  return (
    <div>
      <Title level={2}>Programs You May Qualify For:</Title>
      <div style={{ height: '1rem' }}></div>
      <Row align="middle">
        <Col span={15}>
          <Paragraph strong>
            {' '}
            Spokane Neighborhood Action Partners (SNAP){' '}
          </Paragraph>
        </Col>
        <Col span={1} />
        <Col span={8}>
          <Button
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
          <Paragraph strong> Catholic Charites Rental Assistance </Paragraph>
        </Col>
        <Col span={1} />
        <Col span={8}>
          <Button type="primary" size="medium" disabled={!avilablePrograms.CC}>
            {avilablePrograms.CC ? 'Apply Now!' : 'Not Available'}
          </Button>
        </Col>
      </Row>
      <Divider dashed />
      <Row>
        <Col span={15}>
          <Paragraph strong> Family Promise of Spokane </Paragraph>
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
    </div>
  );
};

export default ProgramSelection;
