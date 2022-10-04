import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect } from "react";


const HasInsurance = (props) => {
  const { value, onChange, label, state, options, className, InputProps = {}, active = true } = props; 

  useEffect(() => {
    if (!state.hasSupIns) {
      if (state.supplementary_insurance) {
        onChange({}, 'true')
      } else {
        onChange({}, 'false')
      }
    }
  }, [state, state.supplementary_insurance])

  return (
    <FormControl
      // fullWidth
      className={className}
      disabled={!active}
    >
      <InputLabel id="demo-simple-select-label" >{label}</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
        value={value || ''}
        // defaultValue={options[0].id}
      label={label}
        onChange={(e) => {
          onChange(e, e.target.value)
        }}
      {...InputProps}
    >
      {options.map((item)=> <MenuItem value={item.id}>{item.name }</MenuItem>)} 
      
    </Select>
  </FormControl>
  );
};

export default HasInsurance;
