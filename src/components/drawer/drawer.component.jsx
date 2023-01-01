import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  Divider,
  Toolbar,
  Avatar,
} from "@mui/material";

import {
  ExpandMore,
  ExpandLess,
  Home,
  CollectionsBookmark,
  Handyman,
  Forum,
  DesignServices,
  Sos,
  InsertComment,
  Logout,
} from "@mui/icons-material";

import { user as UserActions } from "src/redux/actions";

const DrawerComponent = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const path = location.pathname;

  const [ticketsOpen, setTicketsOpen] = useState(false);
  const [afterSalesOpen, setAfterSalesOpen] = useState(false);

  const user = useSelector((state) => state.user);

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(UserActions.unsertUser());

    history.push("/");
  };

  const navigateDrawerItem = (path) => {
    history.push(path);
  };

  const newItems = [
    {
      type: "single",
      item: {
        text: "خانه",
        icon: <Home />,
        path: "/",
        action: () => navigateDrawerItem("/"),
      },
    },
    {
      type: "nested",
      header: {
        text: "تیکت",
        icon: <Forum />,
        action: () => setTicketsOpen(!ticketsOpen),
        open: ticketsOpen,
      },
      items: [
        {
          text: "تیکت های من",
          icon: <CollectionsBookmark />,
          path: "/tickets",
          action: () => navigateDrawerItem("/tickets"),
        },
        {
          text: "تیکت جدید",
          icon: <InsertComment />,
          path: "/tickets/new",
          action: () => navigateDrawerItem("/tickets/new"),
        },
      ],
    },
    {
      type: "nested",
      header: {
        text: "خدمات پس از فروش",
        icon: <Handyman />,
        action: () => setAfterSalesOpen(!afterSalesOpen),
        open: afterSalesOpen,
      },
      items: [
        {
          text: "درخواست های من",
          icon: <DesignServices />,
          path: "/after_sales",
          action: () => navigateDrawerItem("/after_sales"),
        },
        {
          text: "درخواست جدید",
          icon: <Sos />,
          path: "/after_sales/new",
          action: () => navigateDrawerItem("/after_sales/new"),
        },
      ],
    },
  ];

  return (
    <Box
      sx={{
        textAlign: "center",
        pt: 5,
      }}
    >
      <Toolbar />
      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          mb: 3,
        }}
      >
        <Avatar
          sx={{
            height: 100,
            width: 100,
            bgcolor: "primary.main",
          }}
        />
      </Box>
      <Typography variant="h4" fontFamily="Lalezar" color="primary">
        {user.name}
      </Typography>
      <Box
        sx={{
          px: 2,
          pt: 3,
        }}
      >
        <Divider
          sx={{
            borderColor: "primary.main",
          }}
        />
      </Box>
      <List>
        {newItems.map((item, index) =>
          item.type === "nested" ? (
            <Box key={item.type + index}>
              <ListItem>
                <ListItemButton onClick={item.header.action}>
                  <ListItemIcon sx={{ color: "primary.main" }}>
                    {item.header.icon}
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      textAlign: "right",
                      color: "primary.main",
                    }}
                    primary={item.header.text}
                  />
                  {item.header.open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse in={item.header.open} timeout="auto" unmountOnExit>
                <List component="div">
                  {item.items.map((i) => (
                    <ListItem key={i.text}>
                      <ListItemButton
                        selected={path === i.path}
                        onClick={i.action}
                        sx={{
                          pr: 4,
                          borderRight: "solid",
                          borderRightWidth: 0.5,
                          borderRightColor: "primary.main",
                        }}
                      >
                        <ListItemIcon sx={{ color: "primary.main" }}>
                          {i.icon}
                        </ListItemIcon>
                        <ListItemText
                          sx={{
                            textAlign: "right",
                            color: "primary.main",
                          }}
                          primary={i.text}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </Box>
          ) : (
            <ListItem>
              <ListItemButton
                selected={path === item.item.path}
                onClick={item.item.action}
              >
                <ListItemIcon sx={{ color: "primary.main" }}>
                  {item.item.icon}
                </ListItemIcon>
                <ListItemText
                  sx={{
                    textAlign: "right",
                    color: "primary.main",
                  }}
                  primary={item.item.text}
                />
              </ListItemButton>
            </ListItem>
          )
        )}

        <Box
          sx={{
            my: 1,
            px: 2,
          }}
        >
          <Divider
            sx={{
              borderColor: "error.main",
            }}
          />
        </Box>

        <ListItem>
          <ListItemButton onClick={logout}>
            <ListItemIcon sx={{ color: "error.main" }}>
              <Logout />
            </ListItemIcon>
            <ListItemText
              sx={{
                textAlign: "right",
                color: "error.main",
              }}
              primary="خروج از حساب"
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default DrawerComponent;
