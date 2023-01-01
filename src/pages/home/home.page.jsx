import {
  Container,
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

import { DesignServices, Message } from "@mui/icons-material";

const HomePage = () => {
  const items = [
    {
      icon: <Message color="success" sx={{ fontSize: 60, mb: 3 }} />,
      text: "تیکت های پاسخ داده شده",
      //   count: tickets.filter((ticket) => ticket.status === "3").length,
      color: "success",
    },
    {
      icon: <Message color="error" sx={{ fontSize: 60, mb: 3 }} />,
      text: "تیکت های پاسخ داده نشده",
      //   count: tickets.filter((ticket) => ticket.status !== "3").length,
      color: "error",
    },
    {
      icon: <DesignServices color="success" sx={{ fontSize: 60, mb: 3 }} />,
      text: "درخواست های پاسخ داده شده",
      //   count: requests.filter((request) => request.status === "3").length,
      color: "success",
    },
    {
      icon: <DesignServices color="error" sx={{ fontSize: 60, mb: 3 }} />,
      text: "درخواست های پاسخ داده نشده",
      //   count: requests.filter((request) => request.status !== "3").length,
      color: "error",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ my: 2 }}>
      <Grid spacing={2} container>
        {items.map((item) => (
          <Grid md={3} sm={6} item>
            <Card
              variant="elevation"
              elevation={0}
              sx={{
                bgcolor: "white",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {item.icon}
                  <Typography variant="body1" gutterBottom>
                    {item.text}
                  </Typography>
                  <Typography variant="h4">{1}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
