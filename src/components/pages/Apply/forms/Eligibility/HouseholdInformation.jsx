//UI
import { Card, Typography, Form, Input } from 'antd';
const { Title, Text } = Typography;

export default function HouseHoldInformation({
  formValues,
  onRoleChange,
  onChange,
  role,
}) {
  const introMessage = {
    tenant:
      'Please place a checkmark next to all of the statements below that are true for you and/or somebody in your household:',
    landlord:
      'Please place a checkmark next to all of the statements below that are true for your tenant:',
  };

  const setIntroMessage = role => {
    if (role === 'landlord') {
      return introMessage.landlord;
    } else {
      return introMessage.tenant;
    }
  };

  return (
    <div>
      <Card title={<Title level={4}>Household Information</Title>}>
        <Text type="secondary">{setIntroMessage(role)}</Text>
        <Form.Item
          name="familySize"
          initialValue={formValues.familySize}
          label=" Residents"
          required
          hasFeedback
          rules={[
            {
              required: true,
              pattern: RegExp(/^([1-9][0-9]?)\s*$/),
              message: 'Invalid number of residents',
            },
          ]}
        >
          <Input
            style={{ width: '100%' }}
            name="familySize"
            value={formValues.familySize}
          />
        </Form.Item>

        <Form.Item
          name="children"
          initialValue={formValues.totalChildren}
          label="Children in Household"
          required
          hasFeedback
          rules={[
            {
              required: true,
              pattern: RegExp(/^([1-9][0-9]?)\s*$/),
              message: 'Invalid number of children',
            },
          ]}
        >
          <Input
            style={{ width: '100%' }}
            name="totalChildren"
            value={formValues.totalChildren}
          />
        </Form.Item>

        <Form.Item
          hasFeedback
          name="monthlyIncome"
          initialValue={formValues.monthlyIncome}
          label={
            formValues.role === 'landlord'
              ? 'Tenants Monthly Income'
              : 'Monthly Income'
          }
          rules={[
            {
              required: true,
              pattern: RegExp(
                // forgive me
                /^(\b([0-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9][0-9])\b)\s*?$/
              ),
              message: 'Invalid income',
            },
          ]}
        >
          <Input name="monthlyIncome" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          hasFeedback
          name="rent"
          initialValue={formValues.rent}
          label={
            formValues.role === 'landlord'
              ? 'Tenants Monthly Rent Amount'
              : 'Monthly Rent'
          }
          rules={[
            {
              required: true,
              pattern: RegExp(
                // forgive me
                /^(\b([0-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9][0-9])\b)\s*?$/
              ),
              message: 'Invalid rent',
            },
          ]}
        >
          <Input name="rent" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          hasFeedback
          name="owed"
          initialValue={formValues.owed}
          label={
            formValues.role === 'landlord'
              ? 'Tenants Total Amount Owed'
              : 'Total owed'
          }
          rules={[
            {
              required: true,
              pattern: RegExp(
                // forgive me
                /^(\b([0-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9][0-9])\b)\s*?$/
              ),
              message: 'Invalid total',
            },
          ]}
        >
          <Input name="owed" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          hasFeedback
          name="amountRequested"
          initialValue={formValues.amountRequested}
          label={
            formValues.role === 'landlord'
              ? 'Tenants Total Amount Requested'
              : 'Total requested'
          }
          rules={[
            {
              required: true,
              pattern: RegExp(
                // forgive me
                /^(\b([0-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9][0-9])\b)\s*?$/
              ),
              message: 'Invalid total',
            },
          ]}
        >
          <Input name="amountRequested" style={{ width: '100%' }} />
        </Form.Item>
      </Card>
    </div>
  );
}
