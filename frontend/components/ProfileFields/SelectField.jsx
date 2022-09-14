import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";


const SelectField = (props) => {
  const { value, onChange, label ,options} = props;
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
        // defaultValue={options[0].id}
      label={label}
      onChange={(e)=>onChange(e,e.target.value)}
    >
      {options.map((item)=> <MenuItem value={item.id}>{item.name }</MenuItem>)} 
      
    </Select>
  </FormControl>
  );
};

export default SelectField;
