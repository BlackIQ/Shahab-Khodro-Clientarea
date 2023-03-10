import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"; 
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
    const history = useHistory();

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
                afterSales !== []
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
                                <TableCell align="center" sx={{ color: "white" }}>موضوع درخواست</TableCell>
                                <TableCell align="center" sx={{ color: "white" }}>تاریخ ثبت درخواست</TableCell>
                                <TableCell align="center" sx={{ color: "white" }}>وضعیت</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                afterSales.map((request) => (
                                    <TableRow
                                        onClick={() => history.push(`/after_sales/show/${request._id}`)}
                                        sx={{
                                            cursor: "pointer",
                                            '&:nth-of-type(even)': {
                                                backgroundColor: "background.default",
                                            },
                                        }}
                                    >
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
        </Box>
    );
}

export default AllRequests;