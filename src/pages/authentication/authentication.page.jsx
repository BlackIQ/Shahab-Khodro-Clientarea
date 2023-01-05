import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Box, Button, Grid, Typography } from "@mui/material";

import { user as UserAction } from "src/redux/actions";
import { AuthServices } from "src/services";
import { Form } from "src/components";

const AuthenticationPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);

  const token = localStorage.getItem("token");
  token && history.push("/");

  const authenticate = async (data) => {
    setLoading(true);

    try {
      const { token, user } = login
        ? await AuthServices.login(data)
        : await AuthServices.register(data);

      localStorage.setItem("token", token);

      dispatch(UserAction.setUser(user));

      history.push("/");

      console.log(token, user);

      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  };

  return (
    <Box>
      <Grid spacing={2} container>
        <Grid item md={6}>
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
            <Typography variant="body1" gutterBottom>
              {login
                ? "لطفا نام کاربری (ایمیل) و رمز عبور خود را وارد کنید."
                : "برای ساخت حساب، اطلاعات زیر را تکمیل کنید."}
            </Typography>
            <Form
              name={login ? "login" : "register"}
              button={
                loading
                  ? "لطفا صبر کنید"
                  : login
                  ? "ورورد به حساب"
                  : "ساخت حساب کاربری"
              }
              btnStyle={{ fullWidth: true, disabled: loading }}
              callback={authenticate}
            />
            <Button
              variant="outlined"
              size="large"
              sx={{ mt: 2 }}
              onClick={() => setLogin(!login)}
              fullWidth
            >
              {login ? "ساخت حساب" : "ورود به حساب"}
            </Button>
          </Box>
        </Grid>
        <Grid item md={6} />
      </Grid>
    </Box>
  );
};

export default AuthenticationPage;
