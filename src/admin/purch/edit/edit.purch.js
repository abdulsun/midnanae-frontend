import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import axios from "axios";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import "./../purch.css";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Form from "react-bootstrap/Form";
import { InputRow } from "./edit.inputpurch";
import { InputTabel } from "./edit.detail";
import Table from "react-bootstrap/Table";
export default function Editpurch() {
  const { id } = useParams();

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [farmername, setFarmername] = useState("");
  const [address, setAddress] = useState("");
  const [kindOfPay, setKindOfPay] = useState("");
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState("");
  const [employee, setEmployee] = useState(1);
  const [payment, setPayment] = useState(0)

  const [inputFields, setInputFields] = useState([]);

  const [farmer, setFarmer] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/farmer/name")
      .then((res) => {
        setFarmer(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [productType, setProductType] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/product/type")
      .then((res) => {
        setProductType(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [productName, setProductName] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/product/all")
      .then((res) => {
        setProductName(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [push, setPush] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/purch/${id}`)
      .then((res) => {
        setPush(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [detailPurch, setDetailPurch] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/purch/dtpurch/${id}`)
      .then((res) => {
        setDetailPurch(res.data);
      })
      .catch((error) => {
        console.log(error);
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
          console.log(res.data);
          setFileName(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleSubmit = () => {
    axios
      .put(`http://localhost:5000/purch/update-purch/${id}`, {
        emp_id:employee ? employee : push[0]?.emp_id,
        farmername:farmername ? farmername : push[0]?.fm_id,
        address:address ? address : push[0]?.address,
        total_price: total ? total : push[0]?.total,
        status:status ? status : push[0]?.status,
        payment_purch_id: push[0]?.pm_id,
        kindOfPay:kindOfPay ? kindOfPay : push[0]?.pmtype,
        fileName:fileName ? fileName : push[0]?.picture,
      })
      .then((res) => {
        alert("แก้ไขข้อมลการสั่งซื้อสำเรจ");
        window.location.reload();
      });
  };

  const [price, setPrice] = useState([]);

  const handleChange = (event, index) => {
    console.log(inputFields);
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);

    let val = 0;
    for (index = 0; index < inputFields.length; index++) {
      setTotal(val + inputFields[index].price * inputFields[index].qty);
      val = inputFields[index].price * inputFields[index].qty;
    }
  };

  useEffect(() => {}, []);

  // adds new input
  const handleAdd = () => {
    setInputFields([
      ...inputFields,
      {
        type: "",
        name: "",
        price: 0,
        qty: 0,
      },
    ]);
  };

  // removes input
  const handleRemove = (index) => {
    if (inputFields.length !== 0) {
      const values = [...inputFields];
      values.splice(index, 1);
      setInputFields(values);
    }
  };

  const handleAddproduct = () => {
    axios.post("http://localhost:5000/purch/create-dtpurch", {
      id:id,
      productDetial: [...inputFields],
    })
    .then((res) => {
      alert(res.data)
      window.location.reload()
    })
    .catch((err) => {
      console.log(err)
    })
  }

  // const showprice = productName
  // .filter((e) => e.product_id === detailPurch.pro_id)
  // .map((row) => row.price_sell);

  // console.log(detailPurch.pro_id)
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
        <Typography variant="h4">การเพิ่มการซื้อสินค้า</Typography>
        <div
          sx={{ p: 2 }}
          style={{
            background: "#FFFFFF",
            border: 50,
          }}
        >
          {push.map((purch, index) => (
            <form
              key={index}
              component="form"
              noValidate
              sx={{ mt: 1, pt: 2, pb: 10 }}
            >
              <Grid container spacing={4} sx={{ mt: 5 }}>
                <Grid item xs={3}>
                  <Typography variant="h6" sx={{ mb: 1 }} align="right">
                    ชื่อเกษตรกร
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Form.Select
                    value={farmername}
                    name="farmer"
                    size="small"
                    onChange={(event) => {
                      setFarmername(event.target.value);
                    }}
                  >
                    <option>{purch.fmname}</option>
                    {farmer.map((row) => (
                      <option key={row.farmer_id} value={row.farmer_id}>
                        {row.name}
                      </option>
                    ))}
                    ;
                  </Form.Select>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="h6" sx={{ mb: 1 }} align="right">
                    สถานที่รับสินค้า
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    defaultValue={purch.address}
                    type="text"
                    name="price"
                    size="small"
                    onChange={(event) => setAddress(event.target.value)}
                  />
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={1} />
                <Grid item xs={10}>
                  <Divider
                    sx={{ borderBottomWidth: "5px", backgroundColor: "black" }}
                  />
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={3}>
                  <Typography variant="h6" sx={{ mb: 1, mt:2 }} align="right">
                    รายละเอียดการซื้อสินค้า
                  </Typography>
                </Grid>
                <Grid item xs={9} />
                <Grid xs={12} sx={{pl:10, pr:5}}>

                  <div  className="dt-container">
                    <Table >
                      <thead>
                        <tr>
                          <th>เลขที่</th>
                          <th>ประเภทสินค้า</th>
                          <th>ชื่อสินค้า</th>
                          <th>ราคาขายต่อหน่วย</th>
                          <th>ราคาซื้อต่อหน่วย</th>
                          <th>จำนวน</th>
                          <th>จัดการ</th>
                        </tr>
                      </thead>
                      <tbody>
                      {detailPurch.map((detail, index) => ( 
                      //  console.log(detail)
                        <InputTabel
                          id={id}
                          detail={detail}
                          index={index}
                          // showprice={showprice}
                          detailPurch={detailPurch}
                          inputFields={inputFields}
                          productName={productName}
                          productType={productType}
                        />
                      ))} 
                      </tbody>
                    </Table>
                  </div>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={10}>
                  <Divider
                    sx={{ borderBottomWidth: "5px", backgroundColor: "black" }}
                  />
                </Grid>
                <Grid item xs={1} />
                {inputFields.map((row, index) => (
                  <div key={index} className="dt-container">
                    <InputRow
                      id={id}
                      inputFields={inputFields}
                      index={index}
                      row={`${row}`}
                      handleChange={handleChange}
                      handleRemove={handleRemove}
                      productName={productName}
                      productType={productType}
                      handleAdd={handleAdd}
                    />
                  </div>
                ))}

                <Grid xs={12} sx={{pt:2,pb:2}}>
                  <Button
                    variant="contained"
                    onClick={handleAdd}
                    type="button"
                    style={{ background: "#2e7d32" }}
                    sx={{ width: 200, ml: 20 }}
                  >
                    เพิ่มสินค้า
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleAddproduct}
                    type="button"
                    style={{ background:"#0091ea" }}
                    sx={{ width: 200, ml: 5 }}
                  >
                    ยืนยันเพิ่ม
                  </Button>
                </Grid>
                <Grid xs={1} sx={{pl:4}} />
                <Grid xs={10} sx={{pl:4}}>
                  <Divider
                    sx={{ borderBottomWidth: "5px", backgroundColor: "black" }}
                  />
                </Grid>
                <Grid xs={1} sx={{pl:4}} />
                <Grid item xs={1} />
                <Grid item xs={2}>
                  <Typography variant="h6" sx={{ mb: 1 }} align="left">
                    ราคารวม :
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="h6" sx={{ mb: 1 }} align="left">
                    {total ? total : "ข้อมูลไม่ครบ"}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="h6" sx={{ mb: 1 }} align="left">
                    บาท
                  </Typography>
                </Grid>
                <Grid item xs={5} />
                <Grid item xs={1} />
                <Grid item xs={2}>
                  <Typography variant="h6" sx={{ mb: 1 }} align="left">
                    รูปแบบการชำระเงิน
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <RadioGroup
                    row
                    name="kindOfPay"
                    defaultValue={purch.fmname}
                    onChange={(event) => {
                      setKindOfPay(event.target.value);
                    }}
                  >
                    <FormControlLabel
                      value="จ่ายแบบโอน"
                      control={<Radio />}
                      label="จ่ายแบบโอน"
                    />
                    <FormControlLabel
                      value="จ่ายเงินสด"
                      control={<Radio />}
                      label="จ่ายเงินสด"
                    />
                  </RadioGroup>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="h6" sx={{ mb: 1 }} align="right">
                    หลักฐานการชำระเงิน
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Card>
                    <TextField
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
                      <img
                        src={file ? file : purch.picture}
                        height="250px"
                        width="auto"
                      />
                    </center>
                  </Card>
                </Grid>
                <Grid item xs={1}></Grid>

                <Grid item xs={1} />
                <Grid item xs={2}>
                  <Typography variant="h6" sx={{ mb: 1 }} align="left">
                    สถานะการซื้อ :
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Form.Select
                    name="status"
                    onChange={(event) => {
                      setStatus(event.target.value);
                    }}
                  >
                    <option>{purch.status}</option>
                    <option>สำเร็จ</option>
                    <option>ยังไม่ได้ชำระ</option>
                  </Form.Select>
                </Grid>
                <Grid item xs={3} />
                <Grid item xs={5}></Grid>
                <Grid item xs={3}>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    style={{ background: "#ff6f00" }}
                  >
                    ยกเลิก
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Button
                    onClick={handleSubmit}
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    ยืนยัน
                  </Button>
                </Grid>
                <Grid item xs={1}></Grid>
              </Grid>
            </form>
          ))}
        </div>
      </Container>
    </Box>
  );
}
