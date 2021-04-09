//Components
import BasicInformation from './BasicInformation';
import HouseholdInformation from './HouseholdInformation';
//Utils
import { states } from '../../../../../utils/data/states';
//UI
import { Checkbox, Form, Input, Divider, Select } from 'antd';

const { Option } = Select;

export default function Eligibility({ formValues, setFormValues }) {
  const { role } = formValues;

  const tenantCheckboxIntroMessage =
    'Please place a checkmark next to all of the statements below that are true for you and/or somebody in your household:';

  const landlordCheckboxIntroMessage =
    'Please place a checkmark next to all of the statements below that are true for your tenant:';
  // will be using this soon to mark off a section of the questions
  const tenantInformationIntroMessage =
    'Please answer the following questions about your household';

  const landlordInformationIntroMessage =
    "Please answer the following questions about your tenant's household to the best of your knowledge";
  // end of unused area that I think I will need soon.
  function onChange(value) {
    setFormValues({ ...formValues, state: value });
  }

  const onRoleChange = value => {
    setFormValues({ ...formValues, role: value });
  };

  const handleCheckBoxChange = e => {
    e.stopPropagation();

    const { name, checked } = e.target;

    setFormValues({ ...formValues, [name]: checked });
  };

  //This prop drilling is turning into a pain in the ass
  const props = { formValues, setFormValues, onRoleChange, onChange, role };

  return (
    <div>
      <BasicInformation {...props} />
      <Divider />
      <HouseholdInformation {...props} />

      <h4>
        {role === 'landlord'
          ? landlordCheckboxIntroMessage
          : tenantCheckboxIntroMessage}
      </h4>
      <Divider />
      <Form.Item>
        <Checkbox
          checked={formValues.minorGuest}
          name="minorGuest"
          onChange={handleCheckBoxChange}
        >
          Household has at least one minor (17 or younger) or at least one
          person is pregnant?
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Checkbox
          checked={formValues.unEmp90}
          name="unEmp90"
          onChange={handleCheckBoxChange}
        >
          Been unemployed for 90+ Days?
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Checkbox
          checked={formValues.foodWrkr}
          name="foodWrkr"
          onChange={handleCheckBoxChange}
        >
          At least one person in the household worked in the food service
          industry at any time since January 1, 2020?
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Checkbox
          checked={formValues.covidFH}
          name="covidFH"
          onChange={handleCheckBoxChange}
        >
          Have been impacted by Covid.
        </Checkbox>
      </Form.Item>
      <hr></hr>
    </div>
  );
}
