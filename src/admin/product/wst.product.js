import { useState, useEffect } from "react";

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

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function Dashboard() {
  const [product, setproduct] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/product").then((response) => {
      setproduct(response.data);
    })
    .catch((err) => {
      console.log(err)
    })
  }, []);

  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/product/wst/read").then((response) => {
      setData(response.data);
    })
    .catch((err) => {
      console.log(err)
    })
  }, []);


  const [name, setName] = useState("");
  const [qty, setQty] = useState(0);
  const [details, setDetails] = useState("");

  const addwstproduct = () => {
    const proqty = value - qty;
    axios.post("http://localhost:5000/product/create-wstproduct", {
      product_id: name,
      qty: qty,
      details: details,
    });
    axios
      .put("http://localhost:5000/product/update-product-qty", {
        product_id: name,
        qty: proqty,
      })
      .then((res) => {
        alert(res.data.message);
      });
  };

  const deleteWstProduct = (id) => {
    axios
      .delete(`http://localhost:5000/product/delete-wstproduct/${id}`)
      .then((response) => {
        alert(response.data.message);
        window.location.reload();
      });
  };

  const value = product.filter((e) => e.id === name).map((fe) => fe.qty);

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
        <Typography variant="h4">การเพิ่มสินค้าเสีย</Typography>
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
                  ชื่อสินค้า
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Select
                  value={name}
                  fullWidth
                  name="product_id"
                  size="small"
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                >
                  {product.map((row, index) => {
                    return (
                      <MenuItem key={index} value={row.id}>
                        {row.name}
                      </MenuItem>
                    );
                  })}
                  ;
                </Select>
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={3}>
                <Typography variant="h6" sx={{ mb: 1 }} align="right">
                  จำนวนสินค้าในสต็อก
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField value={value} fullWidth size="small" />
              </Grid>
              <Grid item xs={3}></Grid>
              <Grid item xs={3}>
                <Typography variant="h6" sx={{ mb: 1 }} align="right">
                  จำนวนสินค้าเสีย
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="number"
                  fullWidth
                  name="qty"
                  size="small"
                  onChange={(event) => {
                    setQty(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={3}></Grid>
              <Grid item xs={3}>
                <Typography variant="h6" align="right">
                  สาเหตุ
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextareaAutosize
                  minRows={4}
                  name="details"
                  size="small"
                  style={{ width: "100%" }}
                  onChange={(event) => {
                    setDetails(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={3}></Grid>
              <Grid item xs={3}></Grid>
              <Grid item xs={12} sm={3}>
                <Button
                  type="cancel"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1, mb: 2 }}
                  style={{ background: "#ffeb3b" }}
                >
                  ยกเลิก
                </Button>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button
                  type="submit"
                  onClick={addwstproduct}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1, mb: 2 }}
                >
                  ยืนยัน
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>

        <h1>จัดการสินค้าเสีย</h1>
        <br></br>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">เลขที่</TableCell>
                <TableCell align="center">วันที่</TableCell>
                <TableCell align="center">ชื่อสินค้า</TableCell>
                <TableCell align="center">จำนวน</TableCell>
                <TableCell align="center">รายละเอียด</TableCell>
                <TableCell align="center">จำนวนเหลือ</TableCell>
                <TableCell align="center">จัดการ</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="left">{row.date}</TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.qty}</TableCell>
                  <TableCell align="left">{row.details}</TableCell>
                  <TableCell align="left">{row.proqty}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      onClick={() => {
                        deleteWstProduct(row.id);
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
  );
}
