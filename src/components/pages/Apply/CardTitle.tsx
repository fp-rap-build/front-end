import { Progress, Typography } from 'antd';
const { Title } = Typography;

const CardTitle = ({ percentage, title }) => {
  return (
    <>
      <Title level={4}>{title}</Title>
      <Progress
        strokeColor={{
          '0%': '#0063BE',
          '100%': ' #004477',
        }}
        percent={percentage}
        showInfo={false}
        status="active"
      />
    </>
  );
};

export default CardTitle;
