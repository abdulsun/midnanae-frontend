import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import {useEffect}  from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Nav from './components/navbar';
import Dashbord from './Dashboard';


//import routers employee
import Employee from './employee/employee';
import Addemployee from './employee/add.employee';
import Proadmin from './employee/profile.admin';

//impor routers product
import Editproduct from './product/edit.product';
import Addproduct from './product/add.product';
import Manageproduct from './product/manage.product';
import Typeproduct from './product/type.product';
import Wstproduct from './product/wst.product';

//import router purch
import Purch from './purch/purch';
import Addpurch from './purch/add.purch';
import Managepurch from './purch/manage.purch';
import Requestpurch from './purch/request';

//import router sell
import Sell from './sell/sell';
import Managesell from './sell/manage.sell';
import Historysell from './sell/history.sell';

//import router sell
import Usercustomer from './user/customer.admin';
import Userfarmer from './user/farmer.admin';

import Pos from './pos/pos';

import Chat from './chat.admin'
import axios from 'axios';

const mdTheme = createTheme();
function Admin() {


    // useEffect(() => {
    //     const token = localStorage.getItem('token')
    //     axios.post('http://localhost:5000/user/admin/auth', {
    //         headers:{
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer' + token
    //         }
    //     })
    //     .then((response) => response.json())
    //     .then((data) => {
    //         if(data.status === 200){  
    //            // alert('authen success')
    //            console.log(data.status)
    //         }else{
    //            //alert(data.status)
    //            localStorage.removeItem('token');
    //            window.location = '/login';
    //            console.log(data.status)
    //         }
    //     })
    //     .catch((error) => {
    //         console.error('Error:', error);
    //     });
    //   }, []);

  return (

    <Router>

      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
          <Nav />

          <Routes>
            <Route path="/admin" element={<Dashbord />} />

            <Route path="/admin/employee" element={<Employee />} />
            <Route path="/admin/employee/add" element={<Addemployee />} />
            <Route path="/admin/employee/profile" element={<Proadmin />} />

            <Route path="/admin/product/Edit/:id" element={<Editproduct />} />
            <Route path="/admin/product/add" element={<Addproduct />} />
            <Route path="/admin/product/manage" element={<Manageproduct />} />
            <Route path="/admin/product/type" element={<Typeproduct />} />
            <Route path="/admin/product/wst" element={<Wstproduct />} />

            <Route path="/admin/purch/show" element={<Purch />} />
            <Route path="/admin/purch/add" element={<Addpurch />} />
            <Route path="/admin/purch" element={<Managepurch />} />
            <Route path="/admin/purch/sell" element={<Requestpurch />} />

            <Route path="/admin/sell/show" element={<Sell />} />
            <Route path="/admin/sell" element={<Managesell />} />
            <Route path="/admin/sell/history" element={<Historysell />} />

            <Route path="/admin/user/customer" element={<Usercustomer />} />
            <Route path="/admin/user/farmer" element={<Userfarmer />} />

            <Route path="/admin/pos" element={<Pos />} />
            <Route path="/admin/chat" element={<Chat />} />
          </Routes>
        </Box>
      </ThemeProvider>

    </Router>




  );
}

export default Admin;

