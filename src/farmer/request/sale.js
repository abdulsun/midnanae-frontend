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
  const [name, setName] = useState("");
  const [qty, setQty] = useState(0);
  const [unit, setUnit] = useState(0);

  const handleSubmit = () => {
    axios.post("http://localhost:5000/farmer/create-grow", {
      farmer_id: farmer_id,
      name: name,
      qty: qty,
      unit: unit,
    })
    .then((res) => {
      alert("success")
    })
  };

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

  const update = () => {
    axios.put(`http://localhost:5000/farmer/update-grow`, {
        farmer_id: farmer_id,
        name: name,
        qty: qty,
        unit: unit, 
      })
      .then((response) => {       
        setOpenModal(false);
      });
  };

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
    .form-container {
      background-color: #4db6ac;
      color: white;
      margin: 50px 200px;
      padding: 20px 40px;
      border-radius:20px;
      font-size: 20px;
    }
    .mb-3 {
      margin: 20px 10px;
    }
    .table-data table thead{
      background-color: #4db6ac;
      text-align:center;
    }
    .manage{
      text-align:center;
    }
 
    `}
      </style>
      <Box>
        <Container maxWidth="lg" sx={{ ml: 40, mt: 5, mb: 4 }}> 
          <h1>ข้อมูลการปลูกผัก</h1>
          <br />
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

      <Modal show={openModal}>
        <Modal.Header closeButton>
          <Modal.Title>แก้ไขข้อมูลการปลูกผัก</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {edit.map((row, index) => (
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                ชื่อผัก
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  name="name"
                  defaultValue={row.name}
                  onChange={(event) => setName(event.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                จำนวน
              </Form.Label>
              <Col sm="7">
                <Form.Control
                  type="number"
                  name="qty"
                  defaultValue={row.qty}
                  onChange={(event) => setQty(event.target.value)}
                />
              </Col>
              <Col sm="3">
                <Form.Select
                  name="unit"
                  defaultValue={row.unit}
                  onChange={(event) => setUnit(event.target.value)}
                >
                  <option></option>
                  <option>ต้น</option>
                  <option>หลุม</option>
                  <option>ถาด</option>
                  <option>ร่อง</option>
                  <option>แปลง</option>
                  <option>โรงเรือน</option>
                </Form.Select>
              </Col>
            </Form.Group>
          </Form>
      ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" onClick={update}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
