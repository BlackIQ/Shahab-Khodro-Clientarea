import {
  Table,
  TableContainer,
  Paper,
  Pagination,
  Box,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";

import { TableChart, Add } from "@mui/icons-material";

import { TableCell, TableRow, TableHead, TableBody } from "src/components";

import * as XLSX from "xlsx";

import { tables } from "src/config/tables";

import { useEffect, useState } from "react";

import { formatDistanceToNow } from "date-fns-jalali";

const TableComponent = ({ table, data, onClick, download, addButton }) => {
  const tbl = tables[table];

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowPerPage] = useState(10);

  const [renderRows, setRenderRows] = useState([]);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    data.map((d, index) => (d["row"] = index + 1));

    setRenderRows(data.slice((page - 1) * rowsPerPage, page * rowsPerPage));
  }, [data, page, rowsPerPage]);

  const renderSwitch = (d, i) => {
    switch (table) {
      case "access":
        switch (i) {
          case "row":
            return `ردیف شماره ${d[i]}`;
          default:
            return d[i];
        }
      case "subpiece":
        switch (i) {
          case "pname":
            return d.parent.name;
          default:
            return d[i];
        }
      case "project":
        switch (i) {
          case "budget":
            return d[i].general.all;
          default:
            return d[i];
        }
      case "logs":
        switch (i) {
          case "priority":
            return d.plate.priority;
          case "plt":
            return `${d.plate.n3} ${d.plate.alpha} ${d.plate.n2}`;
          // return <Plate plate={d.plate} />;
          case "project":
            return d.project.name;
          case "status":
            return d.status.label;
          default:
            return d[i];
        }
      default:
        switch (i) {
          case "updatedAt":
            return `${formatDistanceToNow(new Date(d[i]))} پیش`;
          case "createdAt":
            return `${formatDistanceToNow(new Date(d[i]))} پیش`;
          default:
            return d[i];
        }
    }
  };

  const onclickSwitch = (data) => {
    switch (table) {
      case "piece":
        onClick(data._id);
        break;
      case "subpiece":
        onClick(data._id);
        break;
      case "status":
        onClick(data._id);
        break;
      case "project":
        onClick(data._id);
        break;
      case "access":
        onClick(data._id);
        break;
      default:
        return null;
    }
  };

  const exportExcel = () => {
    const data_to_excel = [];

    const head = {};
    Object.entries(tbl.fields).map(([k, v]) => (head[k] = v));
    data_to_excel.push(head);

    data.map((d) => {
      const row = {};

      Object.entries(tbl.fields).map(([k, v]) => (row[k] = renderSwitch(d, k)));

      data_to_excel.push(row);
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data_to_excel);

    XLSX.utils.book_append_sheet(wb, ws, tbl.title);
    XLSX.writeFile(wb, `${tbl.title}.xlsx`);
  };

  return (
    <Box>
      <Box>
        <Box
          sx={{
            w: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Typography color="primary" fontFamily="Lalezar" variant="h4">
            {tbl.title}
          </Typography>
          <Box>
            {download && (
              <IconButton
                sx={{
                  mr: 1,
                  borderRadius: 1,
                  border: "solid",
                  borderColor: "primary.main",
                  borderWidth: 1,
                }}
                onClick={exportExcel}
              >
                <TableChart color="primary" />
              </IconButton>
            )}
            {addButton && (
              <IconButton
                sx={{
                  mr: 1,
                  borderRadius: 1,
                  border: "solid",
                  borderColor: "primary.main",
                  borderWidth: 1,
                }}
                onClick={addButton}
              >
                <Add color="primary" />
              </IconButton>
            )}
          </Box>
        </Box>
        <TableContainer
          sx={{ borderColor: "primary.main", w: "100%", borderRadius: 2 }}
          variant="elevation"
          elevation={20}
          component={Paper}
        >
          <Table id={table}>
            <TableHead>
              <TableRow sx={{ background: "primary.main" }}>
                {Object.values(tbl.fields).map((item) => (
                  <TableCell key={item} head>
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {renderRows.map((d) => (
                <TableRow
                  sx={
                    onClick && {
                      "&:hover": { cursor: "pointer", background: "#fafafa" },
                    }
                  }
                  onClick={() => onClick && onclickSwitch(d)}
                >
                  {Object.keys(tbl.fields).map((item) => (
                    <TableCell>{renderSwitch(d, item)}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 3,
              px: 3,
            }}
          >
            <TextField
              variant="outlined"
              placeholder="تعداد ردیف ها"
              label="تعداد ردیف ها"
              value={String(rowsPerPage)}
              onChange={(e) => setRowPerPage(Number(e.target.value))}
            />
            <Pagination
              sx={{ direction: "ltr" }}
              count={Math.ceil(data.length / rowsPerPage)}
              size="large"
              color="primary"
              page={page}
              onChange={handleChangePage}
            />
          </Box>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default TableComponent;
