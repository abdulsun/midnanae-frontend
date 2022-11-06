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

function Manageemployee() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "http://localhost:5000/admin/read"
        );
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  const deleteemployee = (id) => {
    axios
      .delete(`http://localhost:5000/admin/delete/${id}`)
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
        <h1>จัดการข้อมูลพนักงาน</h1>
        <br></br>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>เลขที่</TableCell>
                <TableCell align="center">รูปภาพ</TableCell>
                <TableCell align="center">ชื่อ - นามสกุล</TableCell>
                <TableCell align="center">เบอร์โทรศัพท์</TableCell>
                <TableCell align="center">ตำแหน่ง</TableCell>
                <TableCell align="center">อีเมล</TableCell>
                <TableCell align="center">จัดการ</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((row, index) => (
                <TableRow
                  key={row.employee_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">
                    <img src={row.Image_link} width="100px" />
                  </TableCell>
                  <TableCell align="left">
                    {row.name}
                    <label>&nbsp;&nbsp;&nbsp;</label> {row.lastname}
                  </TableCell>
                  <TableCell align="left">{row.tell}</TableCell>
                  <TableCell align="left">{row.position}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="center">
                  <Edit
                    type="button"
                      sx={{ mr: 1, color: "#ffeb3b" }}
                      onClick={() => {
                        window.location.href = "emp/edit/" + row.employee_id;
                      }}
                    />
                    <DeleteIcon
                      type="button"
                      sx={{color: "#d50000" }}
                      onClick={() => {
                        deleteemployee(row.employee_id);
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

export default function Employee() {
  return <Manageemployee />;
}
