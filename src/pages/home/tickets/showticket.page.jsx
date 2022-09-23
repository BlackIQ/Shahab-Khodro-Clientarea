import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
    Grid,
    Box,
    Container,
    Card,
    CardHeader,
    CardContent,
    Typography,
} from "@mui/material";

import Axios from "axios";

const env = process.env;
const baseUrl = env.REACT_APP_BACKEND_URL;

const ShowTicket = () => {
    const { id } = useParams();

    const [ticket, setTicket] = useState({});

    useEffect(() => {
        Axios.get(`${baseUrl}/v1/ticket/${id}`)
            .then((result) => {
                setTicket(result.data.ticket);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    }, []);

    return (
        <Box>
            <Container
                maxWidth="md"
                sx={{ my: 2 }}
            >
                <Grid
                    spacing={3}
                    container
                >
                    <Grid
                        md={6}
                        sm={6}
                        xs={10}
                        item
                    >
                        <Card
                            variant="elevation"
                            elevation={5}
                        >
                            <CardHeader
                                title={ticket.title}
                                sx={{
                                    fontWeight: "bold",
                                    borderBottom: "solid",
                                    borderBottomWidth: 1,
                                }}
                            />
                            <CardContent>
                                <Typography
                                    variant="body1"
                                    gutterBottom
                                    sx={{
                                        mb: 5,
                                    }}
                                >
                                    { ticket.message }
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                >
                                    ارسال شده در { new Date(ticket.createdAt).toLocaleString("fa-IR") }
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid md={6} sm={6} xs={2} item />
                    <Grid md={6} sm={6} xs={2} item />
                    <Grid
                        md={6}
                        sm={6}
                        xs={10}
                        item
                    >
                        <Card
                            variant="elevation"
                            elevation={5}
                            sx={{
                                bgcolor: "background.default"
                            }}
                        >
                            <CardContent>
                                {
                                    ticket.answer !== ""
                                    ?
                                    <Box>
                                        <Typography
                                            variant="body1"
                                            gutterBottom
                                            sx={{
                                                mb: 5,
                                            }}
                                        >
                                            { ticket.answer }
                                        </Typography>
                                        <Typography
                                            variant="subtitle2"
                                        >
                                            پاسخ داده شده در { new Date(ticket.updatedAt).toLocaleString("fa-IR") }
                                        </Typography>
                                    </Box>
                                    :
                                    <Typography
                                        variant="body2"
                                        fontStyle="italic"
                                    >
                                        هنوز پاسخی برای این تیکت ثبت نشده است.
                                    </Typography>
                                }
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ShowTicket;