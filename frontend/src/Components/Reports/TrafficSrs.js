import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Google", 159, 6.0, 24, 4.0),
  createData("Direct", 237, 9.0, 37, 4.3),
  createData("Twitter", 262, 16.0, 24, 6.0),
  createData("GitHub", 305, 3.7, 67, 4.3),
  createData("DuckDuckGo", 356, 16.0, 49, 3.9),
  createData("Facebook", 356, 16.0, 49, 3.9),
];

export default function TrafficSrs() {
  return (
    <TableContainer component={Paper} sx={{ height: "100%" }}>
      <Typography variant="h6" component="div" sx={{ margin: "20px" }}>
        Traffic source
      </Typography>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Source</TableCell>
            <TableCell>Users</TableCell>
            <TableCell>Sessions</TableCell>
            <TableCell>Bounce Rate</TableCell>
            <TableCell>Session Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.calories}</TableCell>
              <TableCell>{row.fat}</TableCell>
              <TableCell>{row.carbs}</TableCell>
              <TableCell>{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
