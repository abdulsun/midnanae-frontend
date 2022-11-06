import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import axios from "axios";
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Typography from '@mui/material/Typography';

function Addfarmer() {
      
  const [name, setName] = useState("");
  const [lname, setLname] = useState("");
  const [tell, setTell] = useState("");
  const [email, setEmail] = useState("");
  const Image_link ="http://localhost:5000/images/product/3192022user.png"
  const pass = "012012"
  const cpass = "012012"

  const Addfarmer = () => {   
    axios.post("http://localhost:5000/farmer/signup", {
      name: name,
      lastname: lname,
      Image_link:Image_link,
      tell: tell,
      email: email,
      password: pass,
      password_repeat: cpass,
    })
    .then((res) => {
      console.log(res.data)
      alert("เพิ่มข้อมูลเกษตรกรสำเร็จ")
      window.location.href = "/admin/user/farmer"
    })
  };
  useEffect(()=>{

  },[]);

  return (
    <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >

    <Container maxWidth="lg" sx={{ mt: 15, mb: 4}}>
    <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            ml: 10,
            mr:10
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width:70, height:70 }}>
            <PersonAddAlt1Icon />
          </Avatar>
          <Typography component="h1" variant="h5">
            เพิ่มข้อมูลเกษตร
          </Typography>
          <br />
        <div
          sx={{ p: 2 }}
          style={{
            background: '#FFFFFF',
            border: 50
          }}>
          <form component="form"
            noValidate 
            sx={{ mt: 1, pt: 2, pb: 10 }}
          >
            <Grid container spacing={4} sx={{ mt: 5, }}>
            <Grid item xs={4}>
              <Typography variant="h6" sx={{ mb: 1,}} align="right">
                 ชื่อ
              </Typography>
              </Grid>
              <Grid item xs={6}>
              <TextField
                  fullWidth
                  name="name"
                  size="small"
                  onChange={(event) => {
                    setName(event.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={4}>
                <Typography variant="h6" sx={{ mb: 1, }} align="right">
                  นามสกุล
                </Typography>
              </Grid>
              <Grid item xs={6}>
              <TextField
                  fullWidth
                  name="lastname"
                  size="small"
                  onChange={(event) => {
                    setLname(event.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={4}>
              <Typography variant="h6" sx={{ mb: 1, }} align="right">
              เบอร์โทรศัพท์
              </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="tell"
                  size="small"
                  onChange={(event) => {
                    setTell(event.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={4}>
                <Typography variant="h6" sx={{ mb: 1, }} align="right">
                  อีเมล
                </Typography>
              </Grid>
              <Grid item xs={6}>
              <TextField
                  fullWidth
                  name="email"
                  size="small"
                  onChange={(event) => {
                    setEmail(event.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={2}/>
              <Grid item xs={4}/>
              <Grid item xs={3}>
                <Button
                  type="cancel"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{ background: '#ffeb3b', }}
                >
                  ยกเลิก
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  onClick={Addfarmer}
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
          </form >
        </div>
      </Box>
    </Container>
    </Box>
  )
}

export default Addfarmer