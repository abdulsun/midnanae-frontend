import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import axios from "axios";
import "./purch.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import Eye from "@mui/icons-material/RemoveRedEye";

function Manageproduct() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/purch")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  const deleteProduct = (id, index) => {
    axios
      .delete(`http://localhost:5000/purch/delete-purch/${id}/${data[index].pm_id}`)
      .then((res) => {
        alert(res.data.message);
        window.location.reload();
      });
  };

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 15, mb: 4 }}>
        <h1>จัดการข้อมูลการซื้อ</h1>
        <br></br>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>เลขที่</TableCell>
                <TableCell align="center">พนักงาน</TableCell>
                <TableCell align="center">ที่อยู่</TableCell>
                <TableCell align="center">วันที่</TableCell>
                <TableCell align="center">สถานะ</TableCell>
                <TableCell align="center">ราคารวม</TableCell>
                <TableCell align="center">จัดการ</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((row, index) => (
                <TableRow key={row.id} sx={{}}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="left">
                    {row.empname}&nbsp;&nbsp;{row.emplname}{" "}
                  </TableCell>
                  <TableCell align="left">{row.address}</TableCell>
                  <TableCell align="center">{row.date}</TableCell>
                  <TableCell align="center">{row.status}</TableCell>
                  <TableCell align="center">{row.total}</TableCell>
                  <TableCell align="center">
                    <Eye
                      type="button"
                      onClick={() => {
                        window.location.href = "/admin/purch/detail/" + row.id;
                      }}
                    />

                    <Edit
                      type="button"
                      sx={{ mr: 1, color: "#ffeb3b" }}
                      onClick={() => {
                        window.location.href = "purch/edit/" + row.id;
                      }}
                    />
                    <DeleteIcon
                      type="button"
                      sx={{ color: "#d50000" }}
                      onClick={() => {
                        deleteProduct(row.id, index);
                      }}
                    ></DeleteIcon>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}

export default function product() {
  return <Manageproduct />;
}
