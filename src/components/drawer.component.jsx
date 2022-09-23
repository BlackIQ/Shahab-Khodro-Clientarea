import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux"; 
import { useState, useEffect } from "react";

import {
    Box,
    List,
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
} from "@mui/icons-material";

import Axios from "axios";

const env = process.env;
const baseUrl = env.REACT_APP_BACKEND_URL;

const DrawerComponent = (props) => {
    const { close } = props;

    const history = useHistory();

    const [ticketsOpen, setTicketsOpen] = useState(false);
    const [afterSalesOpen, setAfterSalesOpen] = useState(false);

    const [client, setClient] = useState({});
    const user = useSelector(state => state.user);

    useEffect(() => {
        Axios.get(`${baseUrl}/v1/client/find/${user}`)
            .then((result) => {
                setClient(result.data.user);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    }, []);

    const navigateDrawerItem = (path) => {
        history.push(path);
        close();
    }

    const newItems = [
        {
            type: "single",
            item: {
                text: "خانه",
                icon: <Home />,
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
                    action: () => navigateDrawerItem("/tickets"),
                },
                {
                    text: "تیکت جدید",
                    icon: <InsertComment />,
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
                    action: () => navigateDrawerItem("/after_sales"),
                },
                {
                    text: "درخواست جدید",
                    icon: <Sos />,
                    action: () => navigateDrawerItem("/after_sales/new"),
                },
            ],
        },
    ];

    return (
        <Box
            sx={{
                textAlign: 'center',
            }}
        >
            <Toolbar>
                <Avatar
                    sx={{
                        ml: 2,
                        bgcolor: "primary.main"
                    }}
                >
                    { client.name[0] }
                </Avatar>
                <Typography
                    variant="h6"
                >
                    { client.name }
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                {
                    newItems.map((item, index) => (
                        item.type === "nested"
                        ?
                        <Box key={item.type + index}>
                            <ListItemButton onClick={item.header.action}>
                                <ListItemIcon sx={{ color: "primary.main" }}>
                                    { item.header.icon }
                                </ListItemIcon>
                                <ListItemText
                                    sx={{
                                        textAlign: "right",
                                        color: "primary.main"
                                    }}
                                    primary={item.header.text}
                                />
                                { item.header.open ? <ExpandLess /> : <ExpandMore /> }
                            </ListItemButton>
                            <Collapse in={item.header.open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {
                                        item.items.map((i) => (
                                            <ListItemButton
                                                key={i.text}
                                                onClick={i.action}
                                                sx={{ pr: 4 }}
                                            >
                                                <ListItemIcon sx={{ color: "primary.main" }}>
                                                    { i.icon }
                                                </ListItemIcon>
                                                <ListItemText
                                                    sx={{
                                                        textAlign: "right",
                                                        color: "primary.main"
                                                    }}
                                                    primary={i.text}
                                                />
                                            </ListItemButton>
                                        ))
                                    }
                                </List>
                            </Collapse>
                        </Box>
                        :
                        <ListItemButton
                            onClick={item.item.action}
                        >
                            <ListItemIcon sx={{ color: "primary.main" }}>
                                { item.item.icon }
                            </ListItemIcon>
                            <ListItemText
                                sx={{
                                    textAlign: "right",
                                    color: "primary.main"
                                }}
                                primary={item.item.text}
                            />
                        </ListItemButton>
                    ))
                }
            </List>
        </Box>
    );
}

export default DrawerComponent;