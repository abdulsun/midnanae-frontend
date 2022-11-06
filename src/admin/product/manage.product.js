import  { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import axios from "axios";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/DriveFileRenameOutlineOutlined';



function Manageproduct() {

  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () =>{
      try {
        const {data: response} = await axios.get('http://localhost:5000/product');
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
  }, [])

  const deleteProduct = (id) => {
    axios.delete(`http://localhost:5000/product/delete-product/${id}`)
    .then((response) => {
      setData(
        data.filter((row) => {
          return row.id !== id;
        })
      );
      alert("Delete Seccess");
    });
  };



  return (
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >

          <Container maxWidth="lg" sx={{ mt: 15, mb: 4 }}>
            
          <h1>จัดการสินค้า</h1>
          <br></br>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>เลขที่</TableCell>
                  <TableCell align="center">รูปภาพ</TableCell>
                  <TableCell align="center">ชื่อสินค้า</TableCell>
                  <TableCell align="center">ประเภท</TableCell>
                  <TableCell align="center">จำนวน</TableCell>
                  <TableCell align="center">ราคาขาย</TableCell>
                  <TableCell align="center">รายละเอียด</TableCell>
                  <TableCell align="center">จัดการ</TableCell>
                </TableRow>
              </TableHead>
              
              <TableBody>
              
                {data.map((row, index) => (
                  
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center">{index+1}</TableCell>
                    <TableCell component="th" scope="row">
                    <img src={row.picture}  width="100px" height="auto"/>
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.type}</TableCell>
                    <TableCell align="left">{row.qty}</TableCell>
                    <TableCell align="left">
                    {row.price}
                    </TableCell>
                    <TableCell align="left">{row.des}</TableCell>
                    <TableCell align="left">
                      <Edit
                      sx={{ mr: 1, color: "#ffeb3b"  }}
                      onClick={() => {
                        window.location = "edit/" + row.id
                      }}
                      />
                    <DeleteIcon 
                      sx={{ color: "#d50000" }}
                      onClick={() => {
                      deleteProduct(row.id)
                      window.location.reload();
                    } }></DeleteIcon>
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

