import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import axios from 'axios';

import "./purch.css";

import Table from "react-bootstrap/Table";

export default function Detailpush() {

  const { id } = useParams();
  const [detailpursh, setDetailpursh] = useState([])
  useEffect(() => {
    console.log(id)
    axios.get(`http://localhost:5000/purch/dtpurch/${id}`)
    .then((res ) => {
     setDetailpursh(res.data) 
    })
   }, [id])

   const [purch, setPurch] = useState([])
   useEffect(() => {
    console.log(id)
    axios.get(`http://localhost:5000/purch/${id}`)
    .then((res ) => {
     setPurch(res.data) 
    })
   }, [id])

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
        <h2>รายละเอียดการสั่งซ์้อสินค้า</h2>
        {purch.map((row, index) => 
        <div key={index} className="maiin-comtainer">
          <div className="heard-main">
            <h4>เลขที่การขาย : {row.id}</h4>
            <label>วันที่ขาย : {row.date}</label>
          </div>
          <div>
          <tr>
              <th>สถานะการขาย</th>
              <td> : {row.status}</td>
          </tr>
          </div>
          <hr />
          <div className="table-dt">
            <tr>
              <th>ชื่อพนักงาน</th>
              <td> : {row.empname} &nbsp;&nbsp; {row.emplname}</td>
            </tr>
            <tr>
              <th>ชื่อ- นามสกุล</th>
              <td> : {row.fmname} &nbsp;&nbsp; {row.fmlname}</td>
            </tr>
            <tr>
              <th>ที่อยู่การรับสินค้า </th>
              <td> : {row.address}</td>
            </tr>
          </div>
          <hr />
          <div className="table-dt">
            <h4>รายละเอียดการสั่งซื้อ :</h4>
           
            <Table>
            <thead className="center">
              <tr>
                <th>ชื่อสินค้า</th>
                <th>จำนวน</th>
                <th>ราคาต่อหน่วย/ก.ก</th>
                <th>ราคารวม</th>
              </tr>
            </thead>
            <tbody>
            {detailpursh.map((sale, index) => 
            <tr key={index}>
              <td>{sale.name}</td>
              <td className="center">{sale.qty} </td>
              <td className="center">{sale.price}</td>
              <td className="center">{sale.qty*sale.price}</td>
            </tr>
            )}
            <tr>
              <th colSpan={3}>ราคารวม</th>
              <th className="center">{row.total}</th>
            </tr>
            </tbody>
            </Table>
          </div>
          <hr/>
          <div>
          <tr>
              <th>ประเภทการชำระเงิน </th>
              <td> : {row.pmtype}</td>
          </tr>
            <h4>หลักฐานการชำระเงิน</h4>
            <center><img src={row.picture} width="200px"/></center>
          </div>
        </div>
        )}
      </Container>
    </Box>
  );
}
