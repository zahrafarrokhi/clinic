import { TextField } from "@mui/material";
import { useMemo, useState } from "react";

const FormTextField = (props) => {
  const { value, onChange, label, validators, className } = props;
  const [hasChanged, setHasChanged] = useState(false)

  const error = useMemo(() => {
    if (!validators || validators?.length <= 0) return null
    for (let v of validators) {
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
    >
  </TextField>
  );
};

export default FormTextField;
