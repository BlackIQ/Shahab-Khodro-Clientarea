import { TableHead } from "@mui/material";

const TableHeadComponent = ({ children }) => {
  return (
    <TableHead sx={{ backgroundColor: "primary.main" }}>{children}</TableHead>
  );
};

export default TableHeadComponent;
