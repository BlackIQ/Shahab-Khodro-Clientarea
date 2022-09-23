import { useHistory } from "react-router-dom";
import { useState } from "react";

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

const DrawerComponent = (props) => {
    const { close } = props;

    const history = useHistory();

    const [ticketsOpen, setTicketsOpen] = useState(false);
    const [afterSalesOpen, setAfterSalesOpen] = useState(false);

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
                <Box>
                    <Typography
                        variant="h6"
                    >
                        نام کاربر
                    </Typography>
                </Box>
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