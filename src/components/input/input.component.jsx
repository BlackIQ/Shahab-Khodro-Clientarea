import { TextField } from "@mui/material";

const InputComponent = (props) => {
  return (
    <TextField
      label={props.label}
      placeholder={props.placeholder}
      variant={props.variant}
      onChange={props.onChange}
      disabled={props.disabled}
      sx={props.sx}
      fullWidth={props.fullWidth}
      size={props.size}
      type={props.type}
      margin={props.margin}
    />
  );
};

export default InputComponent;
