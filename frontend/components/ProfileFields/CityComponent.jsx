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

  const { value, onChange, label } = props;
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
        {/* handle with redux */}
        {cities?.map((city) => <MenuItem value={city.id}>{city.fa_name}</MenuItem>)} 
        {/* if Province => map on cities */}
      {/* {cities?.filter(city=>city.parent!==null).map((city)=> <MenuItem value={city.id}>{city.name }</MenuItem>)}  */}
      
    </Select>
  </FormControl>
  );
};

export default CityComponent;