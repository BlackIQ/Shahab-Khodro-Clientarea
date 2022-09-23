import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
    Container,
    Grid,
    Box,
    Typography,
    Card,
    CardContent,
} from "@mui/material";

import {
    DesignServices,
    Message,
} from "@mui/icons-material";

import Axios from "axios";

const env = process.env;
const baseUrl = env.REACT_APP_BACKEND_URL;

const HomePage = () => {
    const [tickets, setTickets] = useState([]);
    const [requests, setRequests] = useState([]);

    const user = useSelector(state => state.user);

    useEffect(() => {
        Axios.get(`${baseUrl}/v1/ticket/user/${user}`)
            .then((result) => {
                setTickets(result.data.tickets.reverse());
            })
            .catch((error) => {
                console.log(error.response.data);
            });

        Axios.get(`${baseUrl}/v1/after_sale/user/${user}`)
            .then((result) => {
                setRequests(result.data.after_sales.reverse());
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    }, []);

    const items = [
        {
            icon: <Message color="success" sx={{ fontSize: 60, mb: 3 }}/>,
            text: "تیکت های پاسخ داده شده",
            count: tickets.filter(ticket => ticket.status === 3).length,
            color: "success",
        },
        {
            icon: <Message color="error" sx={{ fontSize: 60, mb: 3 }}/>,
            text: "تیکت های پاسخ داده نشده",
            count: tickets.filter(ticket => ticket.status !== 3).length,
            color: "error",
        },
        {
            icon: <DesignServices color="success" sx={{ fontSize: 60, mb: 3 }}/>,
            text: "درخواست های پاسخ داده شده",
            count: requests.filter(request => request.status === 3).length,
            color: "success",
        },
        {
            icon: <DesignServices color="error" sx={{ fontSize: 60, mb: 3 }}/>,
            text: "تیکت های پاسخ داده نشده",
            count: requests.filter(request => request.status !== 3).length,
            color: "error",
        },
    ];

    return (
        <Container
            maxWidth="md"
            sx={{ my: 2 }}
        >
            <Card
                variant="outlined"
            >
                <CardContent>
                    <Grid
                        spacing={2}
                        container
                        sx={{
                            p: 0,
                            m: 0,
                        }}
                    >
                        {
                            items.map((item) => (
                                <Grid
                                    md={3}
                                    sm={6}
                                    xs={12}
                                    item
                                >
                                    <Box
                                        sx={{
                                            textAlign: "center",
                                        }}
                                    >
                                        { item.icon }
                                        <Typography
                                            variant="body1"
                                            gutterBottom
                                        >
                                            { item.text }
                                        </Typography>
                                        <Typography
                                            variant="h4"
                                        >
                                            { item.count }
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))
                        }
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
}

export default HomePage;