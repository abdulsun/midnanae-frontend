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
import Eye from "@mui/icons-material/RemoveRedEye";

function Manageproduct() {

  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/sell")
    .then((res) => {
      setData(res.data);
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }, []);

  const deleteProduct = (id) => {
    axios
      .delete(`http://localhost:5000/sell/delete-sell/${id}`)
      .then((response) => {
        setData(
          data.filter((row) => {
            return row.id !== id;
          })
        );
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
        <h1>จัดการข้อมูลการขาย</h1>
        <br></br>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>เลขที่</TableCell>
                <TableCell align="center">ชื่อ - นามสกุล (ลูกค้า)</TableCell>
                <TableCell align="center">วันที่</TableCell>
                <TableCell align="center">ประเภท</TableCell>
                <TableCell align="center">ราคารวม</TableCell>
                <TableCell align="center">สถานะ</TableCell>
                <TableCell align="center">จัดการ</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="left">{row.cusname}&nbsp;&nbsp;{row.cuslname}</TableCell>
                  <TableCell align="center">{row.date}</TableCell>
                  <TableCell align="center">{row.type}</TableCell>
                  <TableCell align="center">{row.total}</TableCell>
                  <TableCell align="center">{row.status}</TableCell>
                  <TableCell align="center">
                    <Eye
                      onClick={() => {
                        window.location.href = "sell/detail/" + row.id;
                      }}
                    />

                    <Edit
                      sx={{ mr: 1, color: "#ffeb3b" }}
                      onClick={() => {
                        window.location.href = "sell/edit/" + row.id;
                      }}
                    />
                    <DeleteIcon
                      sx={{ color: "#d50000" }}
                      onClick={() => {
                        deleteProduct(row.id);
                        alert("Delete Seccess");
                        window.location.reload();
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
