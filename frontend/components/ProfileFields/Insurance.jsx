import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";
import { loadSupplementaryInsurance } from '../../lib/slices/constant_data';

const Insurance = (props) => {
  //redux
  const dispatch = useDispatch();
  const insurances = useSelector((state) => state.constantDataReducer?.supplementaryInsuranceList);
  
  const getInsurance = async () => {
    try {
      await dispatch(loadSupplementaryInsurance()).unwrap();
    } catch (error) {
      
    }
  }
  useEffect(() => {
    getInsurance()
  }, []);

  const { value, onChange, label, state, className } = props;
  return (
    <FormControl
      // fullWidth
      disabled={state.hasSupIns !== true}
      className={className}
    >
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={value}
      label={label}
      onChange={(e)=>onChange(e,e.target.value)}
      >
      
        {insurances?.map((ins) => <MenuItem value={ins.id}>{ins.fa_name}</MenuItem>)} 
      
    </Select>
  </FormControl>
  );
};

export default Insurance;
