import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { Box } from "@mui/material";

import Navbar from "../../components/navbar.component.";

const HomeLayout = (props) => {
    const { children } = props;
    const history = useHistory();

    const session = useSelector(state => state.session);
    !session && history.push("/auth");

    return (
        <Box>
            <Navbar />
            { children }
        </Box>
    );
}

export default HomeLayout;