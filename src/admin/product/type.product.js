import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import axios from "axios";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextareaAutosize from "@mui/base/TextareaAutosize";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Modal from "react-bootstrap/Modal";

export default function Dashboard() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "http://localhost:5000/product/type"
        );
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [typeList, setTypeList] = useState([]);

  const addtypeproduct = () => {
    axios
      .post("http://localhost:5000/product/create-typeproduct", {
        name: name,
        description: description,
      })
      .then(() => {
        setTypeList([
          ...typeList,
          {
            name: name,
            description: description,
          },
        ]);
        alert("success");
      });
  };
  const [value, setValue] = useState("");

  const editname = data
    .filter((e) => e.type_product_id === value)
    .map((fe) => fe.name);
  const editdes = data
    .filter((e) => e.type_product_id === value)
    .map((fe) => fe.description);

  const updateTypeProduct = () => {
    console.log(name, description);
    axios
      .put(`http://localhost:5000/product/update-typeproduct`, {
        type_product_id: value,
        name: name ? name : editname,
        description: description ? description : editdes,
      })
      .then((response) => {
        alert(response.data.message);
        setOpenModal(false);
        window.location.reload();
      });
  };

  const deleteTypeProduct = (id) => {
    axios
      .delete(`http://localhost:5000/product/delete-typeproduct/${id}`)
      .then((response) => {
        alert(response.data.message);
        window.location.reload();
      });
  };

  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => {
    setOpenModal(false);
  };
  const handleSubmit = () => {
    setOpenModal(false);
  };
  const handleShow = () => setOpenModal(true);

  // console.log(editvalue)

  return (
    <>
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
          <Typography variant="h4">เพิ่มข้อมูลประเภทสินค้า</Typography>
          <Box
            sx={{ p: 2, mb: 5 }}
            style={{
              background: "#FFFFFF",
              border: 50,
            }}
          >
            <form component="form" noValidate sx={{ mt: 1, pt: 2, pb: 2 }}>
              <Grid container spacing={4} sx={{ mt: 5 }}>
                <Grid item xs={3}>
                  <Typography variant="h6" sx={{ mb: 1 }} align="right">
                    ชื่อประเภทสินค้า
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    name="name"
                    size="small"
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={3}>
                  <Typography variant="h6" align="right">
                    รายละเอียด
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextareaAutosize
                    minRows={4}
                    name="description"
                    size="small"
                    style={{ width: "100%" }}
                    onChange={(event) => {
                      setDescription(event.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={12} sm={3}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1, mb: 2 }}
                    style={{ background: "#ffeb3b" }}
                    // onClick={updateTypeProduct}
                  >
                    แก้ไข
                  </Button>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1, mb: 2 }}
                    onClick={addtypeproduct}
                  >
                    ยืนยัน
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>

          <h1>จัดการประเภทสินค้า</h1>
          <br></br>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>เลขที่</TableCell>
                  <TableCell align="center">ชื่อสินค้า</TableCell>
                  <TableCell align="center">รายละเอียด</TableCell>
                  <TableCell align="center">จัดการ</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data.map((row, index) => (
                  <TableRow
                    key={row.type_product_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.description}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        sx={{ mr: 1 }}
                        onClick={() => {
                          handleShow(setValue(row.type_product_id));
                        }}
                      >
                        แก้ไข
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => {
                          deleteTypeProduct(row.type_product_id);
                        }}
                      >
                        ลบ
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>

      <Modal
        show={openModal}
        centered
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title>แก้ไขข้อมูลประเภทสินค้า</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Grid container spacing={4}>
              <Grid item xs={5}>
                <Typography variant="h6" sx={{ mb: 1 }} align="right">
                  ชื่อประเภทสินค้า
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <TextField
                  fullWidth
                  name="name"
                  size="small"
                  defaultValue={editname}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={5}>
                <Typography variant="h6" align="right">
                  รายละเอียด
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <TextareaAutosize
                  minRows={4}
                  defaultValue={editdes}
                  name="description"


                  style={{ width: "100%" }}
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={updateTypeProduct}>
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
