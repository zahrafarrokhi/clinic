import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";

import { loadCities } from "../../lib/slices/constant_data";


const ProvinceComponent = (props) => {
   // redux
  const dispatch = useDispatch();
  const provinces = useSelector((state) => state.constantDataReducer?.provinces);
  const cities = useSelector((state) => state.constantDataReducer?.cities);

  
  const { value, onChange, label, className, InputProps = {},state, active=true} = props;


  useEffect(() => {
    if(!value && state.city) {
      const city = cities.filter((item) => item.id === state.city);
      if(city.length > 0) {
        onChange({}, city[0].parent)
      }
    }
  }, [value, state, cities])


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
      // value={value}
      value={value || ''}
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
