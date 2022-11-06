import { useState, useEffect } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { InputRow } from "./inputCare";

export default function Care() {
  const [farmer_id, setFarmer_id] = useState(1);
  const [name, setName] = useState("");
  const [care, setCare] = useState({});
  const [inputFields, setInputFields] = useState([
    {
      way: "",
      tool: "",
      amount: "",
      unit: "",
    },
  ]);

  const [grow, setGrow] = useState([]);
  useEffect(() => {
    const param = {
      farmer_id: farmer_id,
    };
    axios
      .get("http://localhost:5000/farmer/read-grow", { params: param })
      .then((res) => {
        setGrow(res.data);
      });
  }, []);

  const handleSubmit = () => {
    axios
      .post("http://localhost:5000/farmer/create-dtcare", {
        farmer_id: farmer_id,
        name: name,
        care: [...inputFields],
      })
      .then((res) => {
        alert(res.data);
        window.location.reload();
      });
  };

  const handleChange = (event, index) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  // adds new input
  const handleAdd = () => {
    setInputFields([
      ...inputFields,
      {
        way: "",
        tool: "",
        amount: "",
        unit: "",
      },
    ]);
  };

  // removes input
  const handleRemove = (index) => {
    if (inputFields.length !== 1) {
      const values = [...inputFields];
      values.splice(index, 1);
      setInputFields(values);
    }
  };

  return (
    <>
      <style type="text/css">
        {`
    .form-container {
      background-color: #4db6ac;
      color: white;
      width:100%;
      margin: 50px 0px;
      padding: 20px 40px;
      border-radius:20px;
      font-size: 20px;
    }
    .mb-3 {
      margin: 20px 10px;
    }
    table thead{
      background-color: #4db6ac;
      text-align:center;
      font-size:16px;
    }
    .manage{
      text-align:center;
    }
    .center{
      text-align:center;
    }
    .bm{
      margin: 0px 5px;
      padding: 2px 3px;
    }
    `}
      </style>
      <Box>
        <Container maxWidth="lg" sx={{ ml: 40, mt: 5, mb: 4 }}>
          <h1>ข้อมูลการปลูกผัก</h1>
          <div className="form-container">
            <Form>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="3">
                  เลือกผักที่จะดูแล
                </Form.Label>
                <Col sm="9">
                  <Form.Select
                    name="name"
                    onChange={(event) => handleName(event)}
                    value={name}
                  >
                    <option></option>
                    {grow.map((row, index) => (
                      <option value={row.grow_id}>{row.name}</option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Col sm="12">
                  <Table bordered hover>
                    <thead>
                      <tr>
                        <th>เลขที่</th>
                        <th>วิธีการ</th>
                        <th>รายละเอียด</th>
                        <th>ปริมาณ</th>
                        <th>หน่วย</th>
                        <th>เพิ่มวิธีการ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inputFields.map((item, index) => (
                        <tr key={index}>
                          <InputRow
                            inputFields={inputFields}
                            index={index}
                            item={`${item}`}
                            handleChange={handleChange}
                            handleRemove={handleRemove}
                            handleAdd={handleAdd}
                          />
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Form.Group>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <Button type="button" onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </Container>
      </Box>
    </>
  );
}
