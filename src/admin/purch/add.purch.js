import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import axios from "axios";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import { color } from "@mui/system";
import "./purch.css";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Form from "react-bootstrap/Form";
import { InputRow } from "./inputpurch";

import { AuthContext } from '../../Context/AuthContext'

export default function Addpurch() {
  const authContext = useContext(AuthContext)
  const employee =  authContext.getUserData().employee_id;
  console.log(employee)

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [farmername, setFarmername] = useState("");
  const [address, setAddress] = useState("")
  const [kindOfPay, setKindOfPay] = useState("");
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState("")
  const [push, setPush] = useState({});
  const [inputFields, setInputFields] = useState([
    {
      type: "",
      name: "",
      price: 0,
      qty: 0,
      prqty:0
    },
  ]);

  const [farmer, setFarmer] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "http://localhost:5000/farmer/name"
        );
        setFarmer(response);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
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

  const img = kindOfPay === "จ่ายแบบโอน" ? fileName : "http://localhost:5000/images/product/2992022slip.png"

  const handleSubmit = () => {
    axios.post("http://localhost:5000/purch/create-purch", {
      employee,
      farmername ,
      address,
      productDetial: [...inputFields],
      total_price: total,
      status,
      kindOfPay,
      fileName: img,
    })
    .then((res) => {
      alert(res.data)
      window.location.href = "/admin/purch"
    })
    .catch((err) => {
      console.log(err)
    })
  };

 console.log([...inputFields])
const [price, setPrice] = useState([])

  const handleChange = (event, index) => {
    console.log(inputFields)
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
        prqty:0
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
          <form component="form" noValidate sx={{ mt: 1, pt: 2, pb: 10 }}>
            <Grid container spacing={4} sx={{ mt: 5 }}>
              <Grid item xs={3}>
                <Typography variant="h6" sx={{ mb: 1 }} align="right">
                  ชื่อเกษตรกร
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Select
                  value={farmername}
                  fullWidth
                  name="farmer"
                  size="small"
                  onChange={(event) => {
                    setFarmername(event.target.value);
                  }}
                >
                  {farmer.map((row) => (
                    <MenuItem key={row.farmer_id} value={row.farmer_id}>
                      {row.name}
                    </MenuItem>
                  ))}
                  ;
                </Select>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6" sx={{ mb: 1 }} align="right">
                  สถานที่รับสินค้า
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
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
                <Typography variant="h6" sx={{ mb: 1 }} align="right">
                  รายละเอียดการซื้อสินค้า
                </Typography>
              </Grid>
              <Grid item xs={9} />
              {inputFields.map((row, index) => (
                <div key={index} className="dt-container">
                  <InputRow
                    inputFields={inputFields}
                    index={index}
                    row={`${row}`}
                    handleChange={handleChange}
                    handleRemove={handleRemove}
                    handleAdd={handleAdd}
                    productName={productName}
                    productType={productType}
                  />
                </div>
              ))}

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  onClick={handleAdd}
                  type="button"
                  style={{ background: "#2e7d32" }}
                  sx={{ width: 200, ml: 20 }}
                >
                  เพิ่มสินค้า
                </Button>
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={10}>
                <Divider
                  sx={{ borderBottomWidth: "5px", backgroundColor: "black" }}
                />
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={1} />
              <Grid item xs={2}>
                <Typography variant="h6" sx={{ mb: 1 }} align="left">
                  ราคารวม :
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="h6" sx={{ mb: 1 }} align="left">
                  {total?total:"ข้อมูลไม่ครบ"}
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
                    <img src={file} height="250px" width="auto" />
                  </center>
                </Card>
              </Grid>
              <Grid item xs={1}></Grid>

              <Grid item xs={1}/>
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
                <option></option>
                <option>สำเร็จ</option>
                <option>ยังไม่ได้ชำระ</option>
    
              </Form.Select>
              </Grid>
              <Grid item xs={3}/>
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
        </div>
      </Container>
    </Box>
  );
}
