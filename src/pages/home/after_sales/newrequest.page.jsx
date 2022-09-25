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

const NewRequest = () => {
    const [title, setTitle] = useState("");
    const [request, setRequest] = useState("");
    const [machine, setMachine] = useState("");

    const user = useSelector(state => state.user);

    const newEvent = () => {
        const sendData = {
            title,
            request,
            user,
            machine,
        };

        Axios.post(`${baseUrl}/v1/after_sale`, sendData)
            .then((result) => {
                console.log(result.data);
            })
            .catch((error) => {
                console.log(error.response.data);
            })
    }

    return (
        <Box>
            <Card
                variant="elevation"
                elevation={20}
            >
                <CardHeader
                    title="افزودن درخواست جدید"
                    sx={{
                        color: "primary.main",
                    }}
                />
                <CardContent>
                    <TextField
                        placeholder="موضوع درخواست را وارد کنید"
                        label="موضوع درخواست"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        sx={{
                            mb: 3,
                        }}
                        fullWidth
                    />
                    <TextField
                        placeholder="دستگاه خود وارد کنید"
                        label="دستگاه"
                        value={machine}
                        onChange={(e) => setMachine(e.target.value)}
                        sx={{
                            mb: 3,
                        }}
                        fullWidth
                    />
                    <TextField
                        placeholder="توضیحات درخواست را وارد کنید"
                        label="توضیحات درخواست"
                        value={request}
                        onChange={(e) => setRequest(e.target.value)}
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
                        onClick={newEvent}
                        disableElevation
                        fullWidth
                    >
                        افزودن درخواست
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
}

export default NewRequest;