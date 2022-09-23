import {
  createTheme,
  ThemeProvider,
  colors,
  Box,
  Typography,
} from "@mui/material";
import { faIR } from '@mui/material/locale';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import AllTickets from "./pages/home/tickets/alltickets.page";
import AllRequests from "./pages/home/after_sales/allrequests.page";

import NewTicket from "./pages/home/tickets/newticket.page";
import NewRequest from "./pages/home/after_sales/newrequest.page";

import AuthenticationPage from "./pages/authentication/authentication.page";

import HomeLayout from "./pages/layouts/home.layout";

const authRoutes = [
  {
    path: "/auth",
    component: <AuthenticationPage />
  },
];

const homeRoutes = [
  {
    path: "/",
    component: <Typography>خانه</Typography>,
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
    component: <Typography>نمایش یک تیکت</Typography>,
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
    component: <Typography>نمایش یک درخواست</Typography>,
  },
];

function App() {
  const theme = createTheme({
    palette: {
      background: {
        default: colors.blue[50],
      },
      primary: {
        main: colors.blue[900],
      },
    },
    typography: {
      fontFamily: "Vazirmatn, Lalezar",
    },
  }, faIR);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ direction: "rtl" }}>
        <Router>
          <Switch>
            {
              authRoutes.map((route) => (
                <Route path={route.path} exact>{ route.component }</Route>
              ))
            }
            <HomeLayout>
              {
                homeRoutes.map((route) => (
                  <Route path={route.path} exact>{ route.component }</Route>
                ))
              }
            </HomeLayout>
          </Switch>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
