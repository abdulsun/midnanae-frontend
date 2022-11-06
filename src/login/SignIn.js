import { useState, useEffect ,useContext} from 'react';
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
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import axios from "axios";
import { AuthContext } from './../Context/AuthContext'
import Loadingicon from "@mui/material/CircularProgress";


const theme = createTheme();
export default function SignIn() {

  const authContext = useContext(AuthContext)

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [role, setRole] = useState('')
  const [roles, setRoles] = useState([])
  const [submit, setSubmit] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleClose = () => {
    onLogin();
    setOpenModal(false);
  }
  const handleShow = () => setOpenModal(true);

  function onClickLogin() {
    const param = {
      email: email
    }
    axios.get('http://localhost:5000/auth/checkrole', { params: param })
      .then((res) => {
        setRoles(res.data)
        setOpenModal(true)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onLogin(){
    axios.post('http://localhost:5000/auth/login', {
      email : email,
      password : pass,
      role: role
    })
    .then((res) => {
      console.log("token",res)
      const { token , role } = res.data

      authContext.setAuthState({
        token,
        authenticated:true,
        role
      })
      localStorage.setItem("token", token)
      localStorage.setItem("role", role)
    })
    .finally(() => {
      setLoading(true)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    return () => {
      // setLoading(true)
    }
  }, []);

  if(loading === true){
    return <Loadingicon />
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" sx={{ mt: 5 }}>
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
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(event) => {
                  setEmail(event.target.value)
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) => {
                  setPass(event.target.value)
                }}
              />
              {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
              <Button
                type="button"
                fullWidth
                variant="contained"
                onClick={onClickLogin}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/singup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <Modal show={openModal}>
        <Modal.Header closeButton>
            <Modal.Title>Please Select role to your are access</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Select
                  placeholder={"please Select Role"}
                  value={role}
                  fullWidth
                  name="type"
                  size="small"
                  onChange={(event) => {
                    setRole(event.target.value)
                  }}
                >
                  {roles.map((option,index) => (
                    <MenuItem key={index+1} value={option.roleFlage}>{option.roleName}</MenuItem>
                  ))};
                </Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            continue to login
          </Button>
        </Modal.Footer>
      </Modal>
    </>



  );
}
