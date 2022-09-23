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

const AllRequests = () => {
    const [afterSales, setAfterSales] = useState([]);
    const user = useSelector(state => state.user);

    useEffect(() => {
        Axios.get(`${baseUrl}/v1/after_sale/user/${user}`)
            .then((result) => {
                setAfterSales(result.data.after_sales.reverse());
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
                    afterSales !== []
                    ?
                    <TableContainer
                        variant="elevation"
                        elevation={20}
                        component={Paper}
                    >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">موضوع درخواست</TableCell>
                                    <TableCell align="center">تاریخ ثبت درخواست</TableCell>
                                    <TableCell align="center">وضعیت</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    afterSales.map((request) => (
                                        <TableRow>
                                            <TableCell align="center">{ request.title }</TableCell>
                                            <TableCell align="center">{ new Date(request.createdAt).toLocaleString("fa-IR") }</TableCell>
                                            <TableCell align="center">{ getStatus(request.status) }</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    :
                    <Typography>
                        هیچ درخواستی یافت نشد.
                    </Typography>
                }
            </Container>
        </Box>
    );
}

export default AllRequests;