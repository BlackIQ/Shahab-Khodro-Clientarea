import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    Container,
    Box,
    Grid,
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Checkbox,
    FormControlLabel,
    FormControl,
    FormLabel,
} from "@mui/material";

import Axios from "axios";

import { setSession } from "../../redux/session/actions";
import { setToken } from "../../redux/user/actions";

const AuthenticationPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const session = useSelector(state => state.session);
    session && history.push("/");
    
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    const [loading, setLoading] = useState(false);
    const [login, setLogin] = useState(true);

    const env = process.env;
    const baseUrl = env.REACT_APP_BACKEND_URL;

    const authenticate = () => {
        setLoading(true);

        const sendData = {
            phone,
            password,
        };

        Axios.post(`${baseUrl}/v1/authentication/client/login`, sendData)
            .then((result) => {
                const { id } = result.data;

                setLoading(false);

                dispatch(setSession());
                dispatch(setToken(id));
            })
            .catch((error) => {
                setLoading(false)
                
                console.log(error.response.data);
            });
    }

    const createAccount = () => {
        setLoading(true);

        const sendData = {
            phone,
            password,
            email,
            name,
        };

        Axios.post(`${baseUrl}/v1/authentication/client/register`, sendData)
            .then((result) => {
                const { id } = result.data;

                setLoading(false);

                dispatch(setSession());
                dispatch(setToken(id));
            })
            .catch((error) => {
                setLoading(false)
                
                console.log(error.response.data);
            });
    }

    return (
        <Box>
            <Grid
                spacing={2}
                container
            >
                <Grid
                    item
                    md={6}
                >
                    <Box
                        sx={{
                            pt: 15,
                            mb: 10,
                            px: 5,
                        }}
                    >
                        <Typography
                            variant="h2"
                            color="primary"
                            fontFamily="Lalezar"
                            gutterBottom
                        >
                            ورود به پورتال
                        </Typography>
                        <Typography
                            variant="body1"
                            gutterBottom
                        >
                            {
                                login
                                ?
                                "لطفا نام کاربری (ایمیل) و رمز عبور خود را وارد کنید."
                                :
                                "برای ساخت حساب، اطلاعات زیر را تکمیل کنید."
                            }
                        </Typography>
                        <br />
                        <form>
                            {
                                !login
                                &&
                                <Box>
                                    <FormControl
                                        fullWidth
                                        margin="normal"
                                    >
                                        <FormLabel
                                            htmlFor="name"
                                            sx={{
                                                mb: 1,
                                            }}
                                        >
                                            نام خود را وارد کنید
                                        </FormLabel>
                                        <TextField
                                            id="name"
                                            variant="outlined"
                                            label="نام"
                                            placeholder="نام خود را وارد کنید"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            fullWidth
                                            autoComplete="name"
                                        />
                                    </FormControl>
                                    <FormControl
                                        fullWidth
                                        margin="normal"
                                    >
                                        <FormLabel
                                            htmlFor="email"
                                            sx={{
                                                mb: 1,
                                            }}
                                        >
                                            ایمیل
                                        </FormLabel>
                                        <TextField
                                            id="email"
                                            variant="outlined"
                                            label="ایمیل"
                                            placeholder="ایمیل خود را وارد کنید"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            fullWidth
                                            autoComplete="email"
                                        />
                                    </FormControl>
                                </Box>
                            }
                            <FormControl
                                fullWidth
                                margin="normal"
                            >
                                <FormLabel
                                    htmlFor="phone"
                                    sx={{
                                        mb: 1,
                                    }}
                                >
                                    شماره همراه خود را وارد کنید
                                </FormLabel>
                                <TextField
                                    id="phone"
                                    variant="outlined"
                                    label="شماره همراه"
                                    placeholder="شماره همراه خود را وارد کنید. ۹۸۹۱۲xxxxxx"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    fullWidth
                                    autoComplete="username"
                                />
                            </FormControl>
                            <FormControl
                                fullWidth
                                margin="normal"
                            >
                                <FormLabel
                                    htmlFor="password"
                                    sx={{
                                        mb: 1,
                                    }}
                                >
                                    رمز خود را وارد کنید
                                </FormLabel>
                                <TextField
                                    id="password"
                                    variant="outlined"
                                    label="رمز"
                                    placeholder="رمز ورود را وارد کنید"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    fullWidth
                                    autoComplete="password"
                                />
                            </FormControl>
                            <FormControlLabel
                                sx={{
                                    p: 0,
                                    m: 0,
                                }}
                                control={
                                    <Checkbox defaultChecked />
                                }
                                label="برای دفعه بعدی مرا به خاطر بسپار"
                            />
                            <br />
                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => login ? authenticate() : createAccount()}
                                sx={{
                                    mt: 2,
                                    ml: 2,
                                    borderRadius: 5,
                                }}
                                disabled={loading}
                                disableElevation
                            >
                                { loading ? "لطفا صبر کنید" : !login ? "ثبت نام" : "ورود" }
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                onClick={() => setLogin(!login)}
                                sx={{
                                    mt: 2,
                                    borderRadius: 5,
                                }}
                                disabled={loading && true}
                                disableElevation
                            >
                                { login ? "حساب ندارم، ساخت حساب" : "حساب دارم، ورود به حساب" }
                            </Button>
                        </form>
                    </Box>
                </Grid>
                <Grid
                    item
                    md={6}
                />
            </Grid>
        </Box>
    );
}

export default AuthenticationPage;