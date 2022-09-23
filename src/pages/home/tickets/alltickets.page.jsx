import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
    Box,
    Typography,
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    Paper,
    Container,
} from "@mui/material";

import Axios from "axios";

const env = process.env;
const baseUrl = env.REACT_APP_BACKEND_URL;

const AllTickets = () => {
    const [tickets, setTickets] = useState([]);
    const user = useSelector(state => state.user);

    useEffect(() => {
        Axios.get(`${baseUrl}/v1/ticket/user/${user}`)
            .then((result) => {
                setTickets(result.data.tickets.reverse());
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    }, []);

    const getStatus = (status) => {
        switch (status) {
            case 1:
                return "خوانده نشده";
            case 2:
                return "خوانده شده";
            case 3:
                return "پاسخ داده شد";
            default:
                return status;
        }
    }

    return (
        <Box>
            <Container
                maxWidth="md"
                sx={{ my: 2 }}
            >
                {
                    tickets !== []
                    ?
                    <TableContainer
                        variant="elevation"
                        elevation={20}
                        component={Paper}
                    >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">موضوع تیکت</TableCell>
                                    <TableCell align="center">تاریخ ثبت تیکت</TableCell>
                                    <TableCell align="center">وضعیت</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    tickets.map((ticket) => (
                                        <TableRow>
                                            <TableCell align="center">{ ticket.title }</TableCell>
                                            <TableCell align="center">{ new Date(ticket.createdAt).toLocaleString("fa-IR") }</TableCell>
                                            <TableCell align="center">{ getStatus(ticket.status) }</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    :
                    <Typography>
                        هیچ تیکتی یافت نشد.
                    </Typography>
                }
            </Container>
        </Box>
    );
}

export default AllTickets;