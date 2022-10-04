import { TextField } from "@mui/material";
import { useMemo, useState } from "react";

const FormTextField = (props) => {
  const { value, onChange, label, validators, className, InputProps={}, active=true, multiline} = props;
  // because of at fisrt page is loading you have error message but you don't wan't to show the error until user has updated the field
  const [hasChanged, setHasChanged] = useState(false) 

  const error = useMemo(() => {
    if (!validators || validators?.length <= 0) return null
    //validators => validators.js is func
    for (let v of validators) {
      // v(value)func  beacuse of validators.js is func
      const ret = v(value)
      if (ret)
        return ret
    }
    return null
  }, [value, validators]);

  return (
    <TextField
    className={className}
    value={value}
      onChange={(e) => onChange(e, e.target.value) || setHasChanged(true)}
      label={label}
      InputLabelProps={{ shrink: true }}
      error={hasChanged && error}
      helperText={hasChanged && error}
      {...InputProps}
      disabled={!active}
      rows={5}
      multiline={multiline}
    >
  </TextField>
  );
};

export default FormTextField;
