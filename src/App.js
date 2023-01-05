import {
  createTheme,
  ThemeProvider,
  colors,
  Box,
  CssBaseline,
} from "@mui/material";
import { faIR } from "@mui/material/locale";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NewTicket from "./pages/home/tickets/newticket.page";
import ShowTicket from "./pages/home/tickets/showticket.page";
import AllTickets from "./pages/home/tickets/alltickets.page";

import NewRequest from "./pages/home/after_sales/newrequest.page";
import ShowRequest from "./pages/home/after_sales/showrequest.page";
import AllRequests from "./pages/home/after_sales/allrequests.page";

import HomePage from "./pages/home/home.page";
import AuthenticationPage from "./pages/authentication/authentication.page";

import HomeLayout from "./pages/layouts/home.layout";

const authRoutes = [
  {
    path: "/auth",
    component: <AuthenticationPage />,
  },
];

const homeRoutes = [
  {
    path: "/",
    component: <HomePage />,
  },
  {
    path: "/tickets",
    component: <AllTickets />,
  },
  {
    path: "/tickets/new",
    component: <NewTicket />,
  },
  {
    path: "/tickets/show/:id",
    component: <ShowTicket />,
  },
  {
    path: "/after_sales",
    component: <AllRequests />,
  },
  {
    path: "/after_sales/new",
    component: <NewRequest />,
  },
  {
    path: "/after_sales/show/:id",
    component: <ShowRequest />,
  },
];

const App = () => {
  const theme = createTheme(
    {
      palette: {
        background: {
          default: "#f5f5f5",
        },
        primary: {
          main: colors.lightBlue[900],
        },
      },
      typography: {
        fontFamily: "Vazirmatn, Lalezar",
      },
    },
    faIR
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ direction: "rtl" }}>
        <Router>
          <Switch>
            {authRoutes.map((route) => (
              <Route path={route.path} exact>
                {route.component}
              </Route>
            ))}
            <HomeLayout>
              {homeRoutes.map((route) => (
                <Route path={route.path} exact>
                  {route.component}
                </Route>
              ))}
            </HomeLayout>
          </Switch>
        </Router>
      </Box>
    </ThemeProvider>
  );
};

export default App;
