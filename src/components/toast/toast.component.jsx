import { Fragment } from "react";

import { Snackbar, Typography, IconButton } from "@mui/material";

import { Close } from "@mui/icons-material";

const ToastComponent = (props) => {
  const { open, close, message } = props;

  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={close}
      >
        <Close fontSize="small" />
      </IconButton>
    </Fragment>
  );

  const showMessage = (message) => (
    <Typography sx={{ float: "left" }} variant="body1" fontWeight="bold">
      {message}
    </Typography>
  );

  return (
    <Snackbar
      open={open}
      onClose={close}
      action={action}
      autoHideDuration={3000}
      message={showMessage(message)}
    />
  );
};

export default ToastComponent;
