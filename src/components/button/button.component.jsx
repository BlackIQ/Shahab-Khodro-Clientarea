import { Button } from "@mui/material";

const ButtonComponent = (props) => {
  return (
    <Button
      variant={props.variant}
      onClick={props.onClick}
      disabled={props.disabled}
      sx={{ mt: 1, ...props.sx }}
      fullWidth={props.fullWidth}
      size={props.size}
      type={props.type}
      disableElevation
    >
      {props.text}
    </Button>
  );
};

export default ButtonComponent;
