import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import axios from "axios";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Typography from "@mui/material/Typography";

function EditCustomer() {
  const [name, setName] = useState("");
  const [lname, setLname] = useState("");
  const [tell, setTell] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  //   const Image_link = "http://localhost:5000/images/product/3192022user.png";

  const { id } = useParams();
  const [employee, setEmployee] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:5000/customer/read/${id}`).then((res) => {
      setEmployee(res.data);
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
console.log(fileName)
  const Editcustomer = () => {
    axios
      .put(`http://localhost:5000/customer/update/${id}`, {
        name: name ? name : employee[0]?.name,
        lastname: lname ? lname : employee[0]?.lastname,
        Image_link: fileName ? fileName : employee[0]?.Image_link,
        tell: tell ? tell : employee[0]?.tell,
        email: email ? email : employee[0]?.email,
        password: pass,
        password_repeat: cpass,
      })
      .then((res) => {
        console.log(res.data);
        alert("แก้ไขข้อมูลลูกค้าสำเร็จ");
        window.location.reload()
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
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          ml: 10,
          mr: 10,
        }}
      >
        <Typography component="h1" variant="h5">
          แก้ไขข้อมูลลูกค้า
        </Typography>
        <br />
        <div
          sx={{ p: 2 }}
          style={{
            background: "#FFFFFF",
            border: 50,
          }}
        >
        {employee.map((emp, index) => 
          <form key={index} component="form" noValidate sx={{ mt: 1, pt: 2, pb: 10 }}>
            <Grid container spacing={4} sx={{ mt: 5 }}>
            <Grid item xs={12}>
                <center>
                <Avatar
                alt="IMAGE PROFILE"
                src={file ? file : employee[0]?.Image_link}
                sx={{ width: 150, height: 150, mb: 3 }}
              />
                </center>

            </Grid>

              <Grid item xs={4}>
                <Typography variant="h6" sx={{ mb: 1 }} align="right">
                  รูปโปรไฟล์
                </Typography>
              </Grid>
              <Grid item xs={6}>
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
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={4}>
                <Typography variant="h6" sx={{ mb: 1 }} align="right">
                  ชื่อ
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                defaultValue={emp.name}
                  fullWidth
                  name="name"
                  size="small"
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={4}>
                <Typography variant="h6" sx={{ mb: 1 }} align="right">
                  นามสกุล
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                defaultValue={emp.lastname}
                  fullWidth
                  name="lastname"
                  size="small"
                  onChange={(event) => {
                    setLname(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={4}>
                <Typography variant="h6" sx={{ mb: 1 }} align="right">
                  เบอร์โทรศัพท์
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                defaultValue={emp.tell}
                  fullWidth
                  name="tell"
                  size="small"
                  onChange={(event) => {
                    setTell(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={4}>
                <Typography variant="h6" sx={{ mb: 1 }} align="right">
                  อีเมล
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                defaultValue={emp.email}
                  fullWidth
                  name="email"
                  size="small"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={2} />
              <Grid item xs={4}>
                <Typography variant="h6" sx={{ mb: 1 }} align="right">
                  password
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="password"
                  size="small"
                  type="password"
                  onChange={(event) => {
                    setPass(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={2} />
              <Grid item xs={4}>
                <Typography variant="h6" sx={{ mb: 1 }} align="right">
                  ยืนยัน password
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="password_repeat"
                  size="small"
                  type="password"
                  onChange={(event) => {
                    setCpass(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={2} />
              <Grid item xs={4} />
              <Grid item xs={3}>
                <Button
                  type="cancel"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{ background: "#ffeb3b" }}
                >
                  ยกเลิก
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  onClick={Editcustomer}
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  ยืนยัน
                </Button>
              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>
          </form>
          )}
        </div>
      </Box>
    </Container>
  </Box>
  );
}

export default EditCustomer;
