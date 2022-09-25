import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
    Grid,
    Box,
    colors,
    Card,
    CardHeader,
    CardContent,
    Typography,
} from "@mui/material";

import Axios from "axios";

const env = process.env;
const baseUrl = env.REACT_APP_BACKEND_URL;

const ShowRequest = () => {
    const { id } = useParams();

    const [request, setRequest] = useState({});

    useEffect(() => {
        Axios.get(`${baseUrl}/v1/after_sale/${id}`)
            .then((result) => {
                setRequest(result.data.after_sale);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    }, []);

    return (
        <Box>
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
                        variant="outlined"
                        sx={{
                            bgcolor: colors.deepPurple[500],
                            color: "white",
                        }}
                    >
                        <CardHeader
                            title={request.title}
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
                            >
                                { request.request }
                            </Typography>
                            <Typography
                                variant="body2"
                                gutterBottom
                                sx={{
                                    mb: 5,
                                }}
                            >
                                ماشین: { request.machine }
                            </Typography>
                            <Typography
                                variant="subtitle2"
                            >
                                ارسال شده در { new Date(request.createdAt).toLocaleString("fa-IR") }
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
                        variant="outlined"
                        sx={{
                            borderColor: "primary.main",
                            bgcolor: request.answer !== "" ? colors.deepPurple[500] : "white",
                            color: request.answer !== "" ? "white" : "primary.main",
                        }}
                    >
                        <CardContent>
                            {
                                request.answer !== ""
                                ?
                                <Box>
                                    <Typography
                                        variant="body1"
                                        gutterBottom
                                        sx={{
                                            mb: 5,
                                        }}
                                    >
                                        { request.answer }
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
                                    >
                                        پاسخ داده شده در { new Date(request.updatedAt).toLocaleString("fa-IR") }
                                    </Typography>
                                </Box>
                                :
                                <Typography
                                    variant="body2"
                                    fontStyle="italic"
                                >
                                    هنوز پاسخی برای این درخواست ثبت نشده است.
                                </Typography>
                            }
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ShowRequest;