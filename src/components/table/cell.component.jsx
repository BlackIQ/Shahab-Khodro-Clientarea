import { TableCell } from "@mui/material";

const TableCellComponent = ({ children, head, sx, align }) => {
  return (
    <TableCell
      sx={{
        color: head && "white",
        fontFamily: head && "Lalezar",
        fontSize: head && 20,
        textAlign: align ? align : "center",
        ...sx,
      }}
    >
      {children}
    </TableCell>
  );
};

export default TableCellComponent;
