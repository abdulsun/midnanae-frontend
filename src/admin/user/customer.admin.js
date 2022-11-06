import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import axios from "axios";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import { Button } from "@mui/material";

function User() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "http://localhost:5000/customer/read"
        );
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  const deleteuser = (id) => {
    axios
      .delete(`http://localhost:5000/customer/delete/${id}`)
      .then((response) => {
        setData(
          data.filter((row) => {
            return row.id !== id;
          })
        );
        alert("Delete Seccess");
        window.location.reload();
      })
      .catch((err) => {
        alert(err);
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
        <h1>ข้อมูลลูกค้า</h1>
        <Button
          type="button"
          onClick={() => {
            window.location.href = "cus/add";
          }}
          sx={{ mb: 2, color: "#fff", backgroundColor: "#43a047" }}
        >
          เพิ่มข้อมูลลูกค้า
        </Button>
        <br />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">เลขที่</TableCell>
                <TableCell align="center">รูปภาพ</TableCell>
                <TableCell align="center">ชื่อ - นาสกุล</TableCell>
                <TableCell align="center">เบอร์โทร</TableCell>
                <TableCell align="center">อีเมล</TableCell>
                <TableCell align="center">จัดการ</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((row, index) => (
                <TableRow
                  key={row.customer_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell component="th" scope="row">
                    <img src={row.Image_link} width="100px" />
                  </TableCell>
                  <TableCell align="left">
                    {row.name}
                    <label>&nbsp;&nbsp;&nbsp;</label>
                    {row.lastname}
                  </TableCell>
                  <TableCell align="left">{row.tell}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="center">
                    <Edit
                      type="button"
                      sx={{ mr: 1, color: "#ffeb3b" }}
                      onClick={() => {
                        window.location.href = "cus/edit/" + row.customer_id;
                      }}
                    />
                    <DeleteIcon
                      sx={{ color: "#d50000" }}
                      onClick={() => {
                        deleteuser(row.customer_id);
                      }}
                    />
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

export default function Readuser() {
  return <User />;
}
