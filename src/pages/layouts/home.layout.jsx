import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { Box, Drawer, Container, Toolbar } from "@mui/material";

import Navbar from "../../components/navbar.component.";
import DrawerComponent from "../../components/drawer.component";

const HomeLayout = (props) => {
    const { children } = props;
    const history = useHistory();

    const session = useSelector(state => state.session);
    !session && history.push("/auth");

    return (
        <Box sx={{ display: 'flex' }}>
            <Navbar />
            {
                session
                &&
                <Drawer
                    variant="permanent"
                    anchor="right"
                    sx={{
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: 300,
                            flexShrink: 0,
                            borderColor: "primary.main",
                            bgcolor: "background.default",
                            borderTopLeftRadius: 30,
                            borderBottomLeftRadius: 30,
                            direction: "rtl"
                        },
                    }}
                >
                    <DrawerComponent />
                </Drawer>
            }
            {
                session
                ?
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
                        { children }
                    </Container>
                </Box>
                :
                children
            }
        </Box>
    );
}

export default HomeLayout;