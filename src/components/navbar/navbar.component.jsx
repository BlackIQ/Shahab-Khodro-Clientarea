import { useHistory } from "react-router-dom";

import { AppBar, Toolbar, Typography, Container } from "@mui/material";

const Navbar = () => {
  const history = useHistory();

  return (
    <AppBar
      elevation={0}
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar>
          <Typography
            variant="h5"
            onClick={() => history.push("/")}
            sx={{
              flexGrow: 1,
              pr: 5,
              cursor: "pointer",
            }}
          >
            پنل کلاینت شهاب خودرو
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
