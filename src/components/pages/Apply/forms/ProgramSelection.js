import React, { useState, useEffect } from 'react';

import axios from 'axios';

import CardTitle from '../CardTitle';

import { Divider, Typography, Button, Row, Col, Spin, Card } from 'antd';

// urls

import { SNAP_ERA, SNAP_ERAP, CC } from '../../../../utils/data/urls';

const { Paragraph, Title } = Typography;

const dsBaseUrl = process.env.REACT_APP_DS_API_URI;

const ProgramSelection = ({ formValues }) => {
  let {
    zipCode,
    cityName,
    familySize,
    children,
    monthlyIncome,
    unEmp90,
    foodWrkr,
    minorGuest,
    rent,
    owed,
    requested,
    covidFH,
  } = formValues;

  console.log(formValues);

  const [loadStatus, setLoadStatus] = useState(false);
  const [availablePrograms, setAvailablePrograms] = useState({});

  // Only eligible for family promise if no other options are available

  const checkPrograms = async () => {
    // convert bools to '0' or '1'
    if (unEmp90) {
      unEmp90 = 1;
    } else {
      unEmp90 = 0;
    }

    if (covidFH) {
      covidFH = 1;
    } else {
      covidFH = 0;
    }

    if (minorGuest) {
      minorGuest = 1;
    } else {
      minorGuest = 0;
    }

    if (foodWrkr) {
      foodWrkr = 1;
    } else {
      foodWrkr = 0;
    }

    const queryString = `?zipcode=${zipCode}&cityName=${cityName}&family_size=${familySize}&children=${children}&income=${monthlyIncome}&rent=${rent}&owed=${owed}&requested=${requested}&unEmp90=${unEmp90}&foodWrkr=${foodWrkr}&minorGuest=${minorGuest}&covidFH=${covidFH}`;
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
      <Card
        title={
          <CardTitle percentage={100} title="Programs You May Qualify For:" />
        }
      >
        <Row align="middle">
          <Col span={15}>
            <Paragraph strong={availablePrograms.SNAP_ERA}>
              {' '}
              Spokane Neighborhood Action Partners (SNAP) ERA Program{' '}
            </Paragraph>
          </Col>
          <Col span={1} />
          <Col span={8}>
            <Button
              href={SNAP_ERA}
              target="_blank"
              type="primary"
              size="medium"
              disabled={!availablePrograms.SNAP_ERA}
            >
              {availablePrograms.SNAP_ERA ? 'Apply Now!' : 'Not Available'}
            </Button>
          </Col>
        </Row>
        <Divider />

        <Row>
          <Col span={15}>
            <Paragraph strong={availablePrograms.SNAP_ERAP}>
              {' '}
              Spokane Neighborhood Action Partners (SNAP) ERAP Program{' '}
            </Paragraph>
          </Col>
          <Col span={1} />
          <Col span={8}>
            <Button
              href={SNAP_ERAP}
              target="_blank"
              type="primary"
              size="medium"
              disabled={!availablePrograms.SNAP_ERAP}
            >
              {availablePrograms.SNAP_ERAP ? 'Apply Now!' : 'Not Available'}
            </Button>
          </Col>
        </Row>
        <Divider />

        <Row>
          <Col span={15}>
            <Paragraph strong={availablePrograms.CC}>
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
              disabled={!availablePrograms.CC}
            >
              {availablePrograms.CC ? 'Apply Now!' : 'Not Available'}
            </Button>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={15}>
            <Paragraph strong={availablePrograms.FP}>
              {' '}
              Family Promise of Spokane Rental Assistance{' '}
            </Paragraph>
          </Col>
          <Col span={1} />
          <Col span={8}>
            <Button
              type="primary"
              size="medium"
              htmlType="submit"
              disabled={!availablePrograms.FP}
            >
              {availablePrograms.FP ? 'Apply Now!' : 'Not Available'}
            </Button>
          </Col>
        </Row>
      </Card>
    </Spin>
  );
};

export default ProgramSelection;
