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

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Card from "@mui/material/Card";

export default function Product() {

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [qty, setQty] = useState(0);
  const [price_sell, setPrice_sell] = useState(0);
  const [description, setDescription] = useState("");

  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:5000/product/type`)
    .then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);

  const [productList, setProductList] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/product/${id}`)
    .then((res) => {
      console.log(res.data);
      setProductList(res.data);
    });
  }, []);

  const uploadImg = () => {
    const form = document.querySelector("form");
    console.log(form);
    if (form) {
      const formData = new FormData(form);
      axios
        .post("http://localhost:5000/product/upload-img-product", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setFileName(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const updateProduct = () => {
    axios
      .put(`http://localhost:5000/product/update-product/${id}`, {
        id: id,
        name: name ? name : productList[0]?.name,
        type_product_id: type ? type : productList[0]?.type_id,
        picture: fileName ? fileName : productList[0]?.picture,
        qty: qty ? qty : productList[0]?.qty,
        price_sell: price_sell ? price_sell : productList[0]?.price,
        description: description ? description : productList[0]?.des
      })
      .then((res) => {
        console.log(res.data);
        alert(res.data.message);
        window.location = "/admin/product/manage";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {}, []);

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
        <Typography variant="h4"></Typography>

        <div
          sx={{ p: 2 }}
          style={{
            background: "#FFFFFF",
            border: 50,
          }}
        >
          {productList.map((row, index) => (
            <form
            key={index}
              component="form"
              noValidate
              sx={{ mt: 1, pt: 2, pb: 10 }}
              encType="multipart/form-data"
            >
              <Grid container spacing={4} sx={{ mt: 5 }}>
                <Grid item xs={3}>
                  <Typography variant="h6" sx={{ mb: 1 }} align="right">
                    รูปภาพสินค้า
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Card>
                    <TextField
                      required
                      fullWidth
                      type="file"
                      name="file"
                      size="small"
                      onChange={(event) => {
                        setFile(URL.createObjectURL(event.target.files[0]));
                        uploadImg();
                      }}
                    />
                    <center>
                      <img src={file ? file : productList[0]?.picture } height="250px" width="auto" />
                    </center>
                  </Card>
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={3}>
                  <Typography variant="h6" sx={{ mb: 1 }} align="right">
                    ประเภทสินค้า
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Select
                    value={type}
                    required
                    defaultValue={row.type}
                    fullWidth
                    name="type"
                    size="small"
                    onChange={(event) => {
                      setType(event.target.value);
                    }}
                    autoFocus
                  >
                    {data.map((row, index) => (
                      <MenuItem
                        key={index}
                        value={row.type_product_id}
                      >
                        {row.name}
                      </MenuItem>
                    ))}
                    ;
                  </Select>
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={3}>
                  <Typography variant="h6" sx={{ mb: 1 }} align="right">
                    ชื่อสินค้า
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    defaultValue={row.name}
                    fullWidth
                    name="name"
                    size="small"
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={3}>
                  <Typography variant="h6" sx={{ mb: 1 }} align="right">
                    จำนวน
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    defaultValue={row.qty}
                    type="number"
                    fullWidth
                    name="qty"
                    size="small"
                    onChange={(event) => {
                      setQty(event.target.value);
                    }}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={3}><h5>กิโลกรัม</h5></Grid>
                <Grid item xs={3}>
                  <Typography variant="h6" sx={{ mb: 1 }} align="right">
                    ราคาขาย
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    defaultValue={row.price}
                    type="number"
                    fullWidth
                    name="price_sell"
                    size="small"
                    onChange={(event) => {
                      setPrice_sell(event.target.value);
                    }}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={3}><h5>บาท</h5></Grid>
                <Grid item xs={3}>
                  <Typography variant="h6" sx={{ mb: 1 }} align="right">
                    รายละเอียด
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextareaAutosize
                    required
                    defaultValue={row.des}
                    minRows={4}
                    name="description"
                    size="small"
                    style={{ width: "100%" }}
                    onChange={(event) => {
                      setDescription(event.target.value);
                    }}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={12} sm={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    style={{ background: "#ffeb3b" }}
                    onClick={() => (window.location = "/admin/product/manage")}
                  >
                    ยกเลิก
                  </Button>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={updateProduct}
                  >
                    ยืนยัน
                  </Button>
                </Grid>
              </Grid>
            </form>
          ))}
        </div>
      </Container>
    </Box>
  );
}
