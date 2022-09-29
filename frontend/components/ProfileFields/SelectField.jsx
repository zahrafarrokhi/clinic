import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";


const SelectField = (props) => {
  const { value, onChange, label ,options, className, InputProps={},active=true} = props;
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
      onChange={(e)=>onChange(e,e.target.value)}
      {...InputProps}
    >
      {options.map((item)=> <MenuItem value={item.id}>{item.name }</MenuItem>)} 
      
    </Select>
  </FormControl>
  );
};

export default SelectField;
