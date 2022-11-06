import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import DeleteIcon from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import Eye from "@mui/icons-material/RemoveRedEye";

export default function Plant() {
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => {
    setOpenModal(false);
  };

  const handleShow = () => setOpenModal(true);

  const [grow, setGrow] = useState([])
  const [farmer_id, setfarmer_id] = useState(1);


  useEffect(() => {
    const param = {
      farmer_id: farmer_id,
    }
    axios.get("http://localhost:5000/farmer/read-grow",{ params: param })
    .then((res) => {
      setGrow(res.data)
      console.log(grow)
    })
  }, []);

  const [value, setValue] = useState([])
  const edit = grow.filter(e => e.grow_id === value )


  const deleteGrow = (id) => {
    axios.delete(`http://localhost:5000/farmer/delete-grow/${id}`)
      .then((response) => {
        console.log(response)
        alert("Delete Seccess");
        window.location.reload();
      });
  };

  return (
    <>
      <style type="text/css">
        {`
    .table-data table thead{
      width:100%;
      background-color: #4db6ac;
      text-align:center;
      margin: 50px 200px;
      padding: 20px 40px;
      border-radius:20px;
    }
    .manage{
      text-align:center;
    }
 
    `}
      </style>
      <Box>
        <Container maxWidth="lg" sx={{ ml: 40, mt: 5, mb: 4 }}>
          <h1>ข้อมูลการปลูกผัก</h1>
          <div className="table-data">
            <Table bordered hover>
              <thead>
                <tr>
                  <th>เลขที่</th>
                  <th>วันที่</th>
                  <th>รายการปลูก</th>
                  <th>จำนวน</th>
                  <th>หน่วย</th>
                  <th>จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {grow.map((row, index) => (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{row.date}</td>
                  <td>{row.name}</td>
                  <td>{row.qty}</td>
                  <td>{row.unit}</td>
                  <td className="manage">
                    <Eye 
                    type="button"
                    sx={{ mr: 2, color: "#42a5f5" }} 
                    />

                    <Edit
                    type="button"
                      sx={{ mr: 2, color: "#ffeb3b" }}
                      onClick={() => {
                        handleShow(setValue(row.grow_id))
                      }}
                    />
                    <DeleteIcon
                    type="button"
                      sx={{ color: "#d50000" }}
                      onClick={() => {
                        deleteGrow(row.grow_id);
                      }}
                    ></DeleteIcon>
                  </td>
                </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </Container>
      </Box>
    </>
  );
}
