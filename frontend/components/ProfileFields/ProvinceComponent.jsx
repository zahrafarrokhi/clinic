import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
//redux
import { useDispatch, useSelector } from "react-redux";

import { loadCities } from "../../lib/slices/constant_data";


const ProvinceComponent = (props) => {
   // redux
  const dispatch = useDispatch();
  const provinces = useSelector((state) => state.constantDataReducer?.provinces);

  
  const { value, onChange, label} = props;
  return (
    <FormControl
      // fullWidth
      className="basis-[30%] flex-grow flex-shrink-0"
    >
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={value}
      label={label}
      onChange={(e)=>onChange(e,e.target.value)}
    >
      {provinces.map((item)=> <MenuItem value={item.id}>{item.fa_name }</MenuItem>)} 
      
    </Select>
  </FormControl>
  );
};

export default ProvinceComponent;
