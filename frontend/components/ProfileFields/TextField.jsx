import { TextField } from "@mui/material";

const FormTextField = (props) => {
  const { value, onChange, label } = props;
  return (
    <TextField
      className="basis-[30%] flex-grow flex-shrink-0"
      value={value}
      onChange={(e) => onChange(e, e.target.value)}
      label={label}
      InputLabelProps={{ shrink: true }}
    >
    </TextField>
  );
};

export default FormTextField;
