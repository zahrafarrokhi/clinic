import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";
import { loadCities } from '../../lib/slices/constant_data';

const CityComponent = (props) => {
  //redux
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.constantDataReducer?.cities);
  
  const getCities = async () => {
    try {
      await dispatch(loadCities()).unwrap();
    } catch (error) {
      
    }
  }
  useEffect(() => {
    getCities()
  }, []);
  
  const { value, onChange, label, state, className } = props;
  return (
    <FormControl
      className={className}
      // fullWidth
    >
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={value}
      label={label}
      onChange={(e)=>onChange(e,e.target.value)}
      >
        {/* handle with redux */}
        {!state.province && <MenuItem disabled value="">استان را انتخاب کنید.</MenuItem>}
        {cities?.filter(c=>c.parent==state.province).map((city) => <MenuItem key={city.id} value={city.id}>{city.fa_name}</MenuItem>)} 
        {/* if Province => map on cities */}
      {/* {cities?.filter(city=>city.parent!==null).map((city)=> <MenuItem value={city.id}>{city.name }</MenuItem>)}  */}
      
    </Select>
  </FormControl>
  );
};

export default CityComponent;
