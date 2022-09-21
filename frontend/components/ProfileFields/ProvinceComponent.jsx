import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
//redux
import { useDispatch, useSelector } from "react-redux";

import { loadCities } from "../../lib/slices/constant_data";


const ProvinceComponent = (props) => {
   // redux
  const dispatch = useDispatch();
  const provinces = useSelector((state) => state.constantDataReducer?.provinces);

  
  const { value, onChange, label, className, InputProps = {},active=true} = props;
  return (
    <FormControl
      // fullWidth
      {...InputProps}
      className={className}
      disabled={!active}
    >
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={value || null}
      label={label}
      onChange={(e)=>onChange(e,e.target.value)}
      {...InputProps}
    >
      {provinces.map((item)=> <MenuItem key={item.id} value={item.id}>{item.fa_name }</MenuItem>)} 
      
    </Select>
  </FormControl>
  );
};

export default ProvinceComponent;
