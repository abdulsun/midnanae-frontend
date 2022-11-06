// import  { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import axios from "axios";

import  {useState, useEffect ,useContext} from 'react';
import { createTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Typography from '@mui/material/Typography';

import Imguser from '../../assets/user.png'

import { AuthContext } from '../../Context/AuthContext'

const theme = createTheme();
theme.text = {
  fontSize: '1.2rem',
  width: 150, 
  height: 150, 
  color:"#ffffff" , 
  fontSize: 22 ,
};

function BasicExample() {

  const authContext = useContext(AuthContext)
  const employee =  authContext.getUserData()
  // console.log(employee)

  const [data, setData] = useState([])

  // useEffect(() => {
  //   const fetchData = async () =>{
  //     try {
  //       const {data: response} = await axios.get('http://localhost:5000/user/admin/read/1');
  //       setData(response);
  //     } catch (error) {
  //       console.error(error.message);
  //     }
  //   }
  //   fetchData();
  // }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

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
      {/* {data.map((row, index) => ( */}
        <div >
          <center>
            <Card 
           theme={theme}
            sx={{ p:5 ,maxWidth: 700, backgroundColor: '#26a69a'}} >
              <Avatar 
                alt="IMAGE PROFILE"
                src={employee.Image_link}
                sx={{ width: 150, height: 150, mb: 3 }}/>

              <Box  sx={{ 
                  color:"#ffffff" , 
                  fontSize: 22 }}
              >
                {employee.name} {employee.lastname}
              </Box><br/>
               <Box  variant="text" >
               {employee.positin}
              </Box><br/>
              <Box  variant="text" >
              {employee.tell}
              </Box><br/>
              <Box  variant="text" >
              {employee.email}
              </Box><br/>
              <Box  variant="text" >
              {employee.name}
              </Box><br/>
            </Card>

          </center>
        </div>
                  
      {/* ))} */}
           

    </Container>
    </Box>
  );
}

export default BasicExample;