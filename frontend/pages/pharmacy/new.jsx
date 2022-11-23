import { Button, Checkbox, FormControlLabel, Radio, RadioGroup, useRadioGroup } from "@mui/material";
import { styled } from "@mui/system";
import React, { useMemo, useRef, useState } from "react";
import Navigation from "../../components/navigation/Navigation";
import Header from "../../components/pharmacy/Header";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

// import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
// import SquareRoundedIcon from '@mui/icons-material/SquareRounded';

// const CustomRadioButton = (props) => {

//   return <Radio {...props} icon={<CheckBoxOutlineBlankIcon/>} checkedIcon={<SquareRoundedIcon/>}/>
// }

const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
  ({ theme, checked }) => ({
    '.MuiFormControlLabel-label': checked && {
      color: theme.palette.primary.main,
    },
  }),
);

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
//panel

const Panel = (props)=>{
  const {selected, value, children, ...other} = props;
  return (
    <div role="tabpanel" hidden={selected !== value} {...other}>
      {selected === value && children} 
    </div>
  );
}
export default function Pharmacy() {
  const [checked, setChecked] = useState("pres");
  const [attachment,setAttachment]=useState([])
  const ref = useRef()

  return (
    <div className="px-6 py-4 w-full">
      <Header state="send" />

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
          control={<Radio />}
          label="بارگذاری عکس نسخه"
        />
      </RadioGroup>

      <Panel selected={checked} value={"pres"}>Doc</Panel>

      <Panel selected={checked} value={"pic"} className="flex flex-col">

        <div>
          <Button
            className="flex items-center gap-2"
            color="grayBtn"
            onClick={() => ref.current.click()}

          >
            <DriveFolderUploadIcon />
            پیوست
          </Button>
          </div>
      <div className="flex gap-2 overflow-auto w-full">
          <input type="file" hidden ref={ref} multiple onChange={(e)=>setAttachment([...attachment,...e.target.files])}/>
          {attachment.map((item)=>
          <div className="relative  max-w-full md:w-[400px] md:h-[300px] flex justify-center items-center " key={item}>
            <img src={URL.createObjectURL(item)} alt="" className="max-w-[400px] max-h-[400px] rounded-lg"/>
            <Button variant="outlined" onClick={()=>setAttachment(attachment.filter(i=>item !== i))}className="absolute left-1 bottom-1 rounded-full aspect-square p-2 min-w-fit" ><DeleteOutlineIcon className="text-xl "/></Button>

          </div>
          
          )}
        </div>
        
      </Panel>
    </div>
  );
}

Pharmacy.getLayout = (page) => {
  return <Navigation>{page}</Navigation>;
};
