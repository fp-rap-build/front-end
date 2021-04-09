//Components
import BasicInformation from './BasicInformation';
import HouseholdInformation from './HouseholdInformation';
import AdditonalInformation from './AdditionalInformation';
//UI
import { Divider } from 'antd';
import AdditionalInformation from './AdditionalInformation';

export default function Eligibility({ formValues, setFormValues }) {
  const { role } = formValues;

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
  const props = {
    formValues,
    setFormValues,
    onRoleChange,
    onChange,
    role,
    handleCheckBoxChange,
  };

  return (
    <div>
      <BasicInformation {...props} />
      <Divider />
      <HouseholdInformation {...props} />
      <Divider />
      <AdditionalInformation {...props} />

      <hr></hr>
    </div>
  );
}
