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

  const { value, onChange, label, state, className, InputProps = {}, active = true } = props;
  
  useEffect(() => {
    if (state.hasSupIns === 'false') {
      onChange(null, null)
    }
  }, [state.hasSupIns])
  return (
    <FormControl
      // fullWidth
      InputProps={{ ...InputProps}}
      className={className}
      disabled={!active || state.hasSupIns !== 'true'}
    >
      <InputLabel id="demo-simple-select-label" >{label}</InputLabel>
    <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value || ''}
        label={label}
        onChange={(e) => onChange(e, e.target.value)}
        InputProps={{ ...InputProps }}
        
      >
      
        {insurances?.map((ins) => <MenuItem key={ins.id} value={ins.id}>{ins.fa_name}</MenuItem>)} 
      
    </Select>
  </FormControl>
  );
};

export default Insurance;
