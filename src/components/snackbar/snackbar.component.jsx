import { Snackbar } from "@mui/material";

const ShowSnackbar = (props) => {
  const { open, close, message } = props;

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={close}
      message={message}
    />
  );
};

export default ShowSnackbar;
