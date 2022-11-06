import { useState, useEffect, useContext } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";


import axios from 'axios';

const theme = createTheme();

export default function SignUp() {

  const [name, setName] = useState('')
  const [lastname, setLastname,] = useState('')
  const [tell, setTell] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password_repeat, setPassword_repeat] = useState('')
  const [role, setRole] = useState('')
  const Image_link ="http://localhost:5000/images/product/3192022user.png"

  const handleSubmit = () => {
    axios.post(`http://localhost:5000/auth/signup/all`,{
      name : name, 
      lastname : lastname, 
      Image_link : Image_link, 
      tell : tell, 
      email : email, 
      password :password,
      password_repeat : password_repeat,
      role : role,
    })
    .then((res) => {
      alert(res.data.msg);
      window.location.href = "/"
    })
  };



  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(event) => setName(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(event) => setLastname(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Tell Number"
                  name="tell"
                  autoComplete="tell"
                  onChange={(event) => setTell(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="repassword"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password_repeat"
                  label="password repeat"
                  type="password"
                  autoComplete="new-password"
                  onChange={(event) => setPassword_repeat(event.target.value)}
                />
              </Grid>
            </Grid>
            <Grid>
                <RadioGroup
                  row
                  name="role"
                  onChange={(event) => {
                    setRole(event.target.value);
                  }}
                >
                  <Grid item xs={6}>
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="ผู้ใช้ทั่วไป"
                  />
                  </Grid>
                  <Grid item xs={6}>
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="เกษตรกร"
                  />
                  </Grid>
                </RadioGroup>
              </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit} 
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}