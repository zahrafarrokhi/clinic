
import { FormControlLabel, Radio, RadioGroup, styled, useRadioGroup } from '@mui/material';
import { useState } from 'react';
import Navigation from '../../components/navigation/Navigation';
import Header from '../../components/pharmacy/Header';

// label style
const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
  ({ theme, checked }) => ({
    '.MuiFormControlLabel-label': {
      fontSize: '0.9em',
      ...(checked && {
        color: theme.palette.primary.main,
      })
    },
  }),
);

// label cotrol state with
const CustomFormControlLabel = (props) => {
  const { value, } = props;
  const checked = useRadioGroup();
  return (
    <StyledFormControlLabel
      {...props}
      value={value}
      control={<Radio />}
      checked={checked.value === value}
      // sx={[{
      //   color: checked.value === value ? "primary.main" : undefined,
      // }, props.sx]}

    />
  );
};
export default function New() {
  const [checked, setChecked] = useState("pres");
  return (
    <div className='px-6 py-4'>
      <Header state="send"/>
      <RadioGroup
        className="flex flex-row gap-4 m-6"
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={checked}
        onChange={(e) => setChecked(e.target.value)}
      >
        <CustomFormControlLabel
          value="pres"
          // control={<Radio />}
          label="سفارش با نسخه‌ی پزشک"
          // sx={{
          //   color: checked === "pres" ? "primary.main" : undefined,
          // }}
        />
        <CustomFormControlLabel
          value="pic"
          // control={<Radio />}
          label="بارگذاری عکس نسخه"
        />
      </RadioGroup>

      </div>
      )
}


New.getLayout = (page) => {
  return <Navigation>{page}</Navigation>;
};