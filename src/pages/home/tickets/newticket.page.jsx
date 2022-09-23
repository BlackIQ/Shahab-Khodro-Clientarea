import { useState } from "react";
import { useSelector } from "react-redux";

import {
    Box,
    Container,
    Card,
    CardContent,
    CardHeader,
    TextField,
    Button,
} from "@mui/material";

import Axios from "axios";

const env = process.env;
const baseUrl = env.REACT_APP_BACKEND_URL;

const NewTicket = () => {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");

    const user = useSelector(state => state.user);

    const newTicket = () => {
        const sendData = {
            title,
            message,
            user,
        };

        Axios.post(`${baseUrl}/v1/ticket`, sendData)
            .then((result) => {
                console.log(result.data);
            })
            .catch((error) => {
                console.log(error.response.data);
            })
    }

    return (
        <Box>
            <Container
                maxWidth="md"
                sx={{ my: 2 }}
            >
                <Card
                    variant="elevation"
                    elevation={20}
                >
                    <CardHeader
                        title="ثبت تیکت جدید"
                        sx={{
                            color: "primary.main",
                        }}
                    />
                    <CardContent>
                        <TextField
                            placeholder="موضوع تیکت را وارد کنید"
                            label="موضوع تیکت"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            sx={{
                                mb: 3,
                            }}
                            fullWidth
                        />
                        <TextField
                            placeholder="پیام تیکت را وارد کنید"
                            label="پیام تیکت"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={5}
                            sx={{
                                mb: 3,
                            }}
                            multiline
                            fullWidth
                        />
                        <Button
                            variant="contained"
                            size="large"
                            onClick={newTicket}
                            disableElevation
                            fullWidth
                        >
                            ارسال تیکت
                        </Button>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}

export default NewTicket;