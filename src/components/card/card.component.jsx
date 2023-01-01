import { Card, CardHeader, CardContent, Typography } from "@mui/material";

const CardComponent = ({ title, children }) => {
  return (
    <Card variant="outlined" sx={{ borderColor: "primary.main" }}>
      {title && (
        <CardHeader
          sx={{
            color: "primary.main",
            borderBottom: "solid",
            borderBottomWidth: "1px",
            borderBottomColor: "primary.main",
          }}
          title={
            <Typography fontFamily="Lalezar" variant="h5">
              {title}
            </Typography>
          }
        />
      )}
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardComponent;
