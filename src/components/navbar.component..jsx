import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Container,
    Box,
    Drawer,
} from "@mui/material";

import {
    Logout,
    Menu,
} from "@mui/icons-material";

import { unsetSession } from "../redux/session/actions";
import { unsetToken } from "../redux/user/actions";

import DrawerComponent from "./drawer.component";
const drawerWith = 300;

const Navbar = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const handleDrawer = () => setDrawerOpen(!drawerOpen);

    const logout = () => {
        dispatch(unsetSession());
        dispatch(unsetToken());
    }

    return (
        <Box>
            <AppBar elevation={0}>
                <Container maxWidth="xl">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            onClick={handleDrawer}
                        >
                            <Menu />
                        </IconButton>
                        <Typography
                            variant="h5"
                            onClick={() => history.push("/")}
                            sx={{
                                flexGrow: 1,
                                pr: 5,
                                cursor: "pointer",
                            }}
                        >
                            پنل کاربر شهاب خودرو
                        </Typography>
                        <IconButton
                            color="inherit"
                            onClick={logout}
                        >
                            <Logout />
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>
            <Toolbar />

            <Box
                component="nav"
            >
                <Drawer
                    variant="temporary"
                    anchor="right"
                    open={drawerOpen}
                    onClose={handleDrawer}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWith,
                            bgcolor: "background.default",
                            direction: "rtl"
                        },
                    }}
                >
                    <Box>
                        <DrawerComponent close={handleDrawer} />
                    </Box>
                </Drawer>
            </Box>

        </Box>
    );
}

export default Navbar;