import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Container,
} from "@mui/material";

import {
    Logout,
    Login,
} from "@mui/icons-material";

import { unsetSession } from "../redux/session/actions";
import { unsetToken } from "../redux/user/actions";

const Navbar = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const session = useSelector(state => state.session);

    const logout = () => {
        dispatch(unsetSession());
        dispatch(unsetToken());
    }

    return (
        <AppBar
            elevation={0}
            position="fixed"
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1
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
                        پنل کاربر شهاب خودرو
                    </Typography>
                    <IconButton
                        color="inherit"
                        onClick={() => session ? logout() : history.push("/auth")}
                    >
                        { session ? <Logout /> : <Login /> }
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;