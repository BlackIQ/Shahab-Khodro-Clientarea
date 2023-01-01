import { useHistory } from "react-router-dom";

import { Box, Drawer, Container, Toolbar } from "@mui/material";

import { Navbar, Drawer as DrawerComponent } from "src/components";

const HomeLayout = (props) => {
  const { children } = props;
  const history = useHistory();

  const token = localStorage.getItem("token");
  !token && history.push("/auth");

  return (
    <Box>
      <Navbar />
      <Drawer
        variant="permanent"
        anchor="right"
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 300,
            flexShrink: 0,
            borderColor: "primary.main",
            bgcolor: "background.default",
            borderTopLeftRadius: 30,
            borderBottomLeftRadius: 30,
            direction: "rtl",
          },
        }}
      >
        <DrawerComponent />
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pr: 38,
        }}
      >
        <Toolbar />
        <Container
          maxWidth="xl"
          sx={{
            my: 3,
          }}
        >
          {children}
        </Container>
      </Box>
      ) : ( children )
    </Box>
  );
};

export default HomeLayout;
