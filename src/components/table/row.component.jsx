import { TableRow } from "@mui/material";

const TableRowComponent = ({ children, sx, onClick }) => {
  return (
    <TableRow sx={sx} onClick={onClick && onClick}>
      {children}
    </TableRow>
  );
};

export default TableRowComponent;
