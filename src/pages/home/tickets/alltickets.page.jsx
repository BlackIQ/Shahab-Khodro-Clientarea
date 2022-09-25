import { useHistory } from "react-router-dom";
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
} from "@mui/material";

import Axios from "axios";

const env = process.env;
const baseUrl = env.REACT_APP_BACKEND_URL;

const AllTickets = () => {
    const history = useHistory();

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
            case '1':
                return "به دست پشتیبان رسیده است";
            case '2':
                return "توسط پشتیبان خوانده شد";
            case '3':
                return "به تیکت جواب داده شد";
            default:
                return status;
        }
    }

    return (
        <Box>
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
                            <TableRow
                                sx={{
                                    bgcolor: "primary.main",
                                }}
                            >
                                <TableCell align="center" sx={{ color: "white" }}>موضوع تیکت</TableCell>
                                <TableCell align="center" sx={{ color: "white" }}>تاریخ ثبت تیکت</TableCell>
                                <TableCell align="center" sx={{ color: "white" }}>وضعیت</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                tickets.map((ticket) => (
                                    <TableRow
                                        onClick={() => history.push(`/tickets/show/${ticket._id}`)}
                                        sx={{
                                            cursor: "pointer",
                                            '&:nth-of-type(even)': {
                                                backgroundColor: "background.default",
                                            },
                                        }}
                                    >
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
        </Box>
    );
}

export default AllTickets;