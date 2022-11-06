import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { useEffect, useContext, useState, useCallback } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Nav from "./admin/components/navbar";
import { AuthContext } from "./Context/AuthContext";

import Login from "./login/SignIn";
import Signup from "./login/register";
import Dashbord from "./admin/Dashboard";
//import routers employee
import Employee from "./admin/employee/employee";
import Addemployee from "./admin/employee/add.employee";
import Editemployee from "./admin/employee/edit.employee";
import Proadmin from "./admin/employee/profile.admin";

//impor routers product
import Editproduct from "./admin/product/edit.product";
import Addproduct from "./admin/product/add.product";
import Manageproduct from "./admin/product/manage.product";
import Typeproduct from "./admin/product/type.product";
import Wstproduct from "./admin/product/wst.product";

//import router purch
import Purch from "./admin/purch/dt-purch";
import Addpurch from "./admin/purch/add.purch";
import Editpurch from "./admin/purch/edit/edit.purch";
import Managepurch from "./admin/purch/manage.purch";
import Requestpurch from "./admin/purch/request";

//import router sell
import Sell from "./admin/sell//detail.sell";
import Managesell from "./admin/sell/manage.sell";
import Historysell from "./admin/sell/history.sell";
import Editsell from "./admin/sell/edit/edit.sell";


//import router user
import Usercustomer from "./admin/user/customer.admin";
import Userfarmer from "./admin/user/farmer.admin";
import Addcustomer from "./admin/user/add.customer";
import Addfarmer from "./admin/user/add.farmer";
import Editcustomer from "./admin/user/edit.customer";
import Editfarmer from "./admin/user/edit.farmer";


import Pos from "./admin/pos/pos";
import Chat from "./admin/chat.admin";

//user
import Product from "./users/stores/Products";
import Header from "./users/components/Header/Header";
import Home from "./users/home";
import Oders from "./users/order/order";
import OdersDetail from "./users/order/detailOder";
import Details from "./users/stores/Details/Details";
import Basket from "./users/Basket/Basket";

//farmer
import Sidebarmenu from "./farmer/components/SideMenu";
import Fdashbord from "./farmer/dasbord/dashbord";
import Fplantmanage from "./farmer/support/plant.manage";
import Fplant from "./farmer/support/plant";
import Fcare from "./farmer/support/care";
import Frequest from "./farmer/request/reqest"
import Fsale from "./farmer/request/sale"

const mdTheme = createTheme();
function Navigations() {
  const authContext = useContext(AuthContext);
  const [status, setStatus] = useState("loading");
  const loadJWT = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      authContext.setAuthState({
        accessToken: token || null,
        authenticated: token !== null,
        role: role || null,
      });

      setStatus("success");
    } catch (error) {
      authContext.setAuthState({
        accessToken: null,
        authenticated: false,
        role: null,
      });
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    loadJWT();
  }, [loadJWT]);

  if (status == "loading") {
    return <CircularProgress />;
  }

  if (
    authContext.AuthState.authenticated === true &&
    authContext.AuthState.role == "0" && 
    authContext.AuthState.accessToken !== null
  ) {
    return (
      <Router>
        <ThemeProvider theme={mdTheme}>
          <Box sx={{ display: "flex" }}>
            <Nav />
            <Routes>
              <Route path="/" element={<Dashbord />} />

              <Route path="/admin/employee" element={<Employee />} />
              <Route path="/admin/employee/add" element={<Addemployee />} />
              <Route path="/admin/emp/edit/:id" element={<Editemployee />} />
              <Route path="/admin/employee/profile" element={<Proadmin />} />

              <Route path="/admin/product/Edit/:id" element={<Editproduct />} />
              <Route path="/admin/product/add" element={<Addproduct />} />
              <Route path="/admin/product/manage" element={<Manageproduct />} />
              <Route path="/admin/product/type" element={<Typeproduct />} />
              <Route path="/admin/product/wst" element={<Wstproduct />} />

              <Route path="/admin/purch/detail/:id" element={<Purch />} />
              <Route path="/admin/purch/add" element={<Addpurch />} />
              <Route path="/admin/purch/edit/:id" element={<Editpurch />} />
              <Route path="/admin/purch" element={<Managepurch />} />
              <Route path="/admin/purch/sell" element={<Requestpurch />} />

              <Route path="/admin/sell/detail/:id" element={<Sell />} />
              <Route path="/admin/sell" element={<Managesell />} />
              <Route path="/admin/sell/history" element={<Historysell />} />
              <Route path="/admin/sell/edit/:id" element={<Editsell />} />

              <Route path="/admin/user/customer" element={<Usercustomer />} />
              <Route path="/admin/user/farmer" element={<Userfarmer />} />
              <Route path="/admin/user/cus/add" element={<Addcustomer />} />
              <Route path="/admin/user/farmer/add" element={<Addfarmer />} />
              <Route path="/admin/user/cus/edit/:id" element={<Editcustomer />} />
              <Route path="/admin/user/farmer/edit/:id" element={<Editfarmer />} />

              <Route path="/admin/pos" element={<Pos />} />
              <Route path="/admin/chat" element={<Chat />} />
            </Routes>
          </Box>
        </ThemeProvider>
      </Router>
    );
  } else if (
    authContext.AuthState.authenticated === true &&
    authContext.AuthState.role == "1"
  ) {
    return (
      <Router>
        <Header />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/store" element={<Product />} />
          <Route path="/order" element={<Oders />} />
          <Route path="/order/:id" element={<OdersDetail/>} />
          <Route path="/detail/:id" element={<Details />} />
          <Route path="/basket" element={<Basket/>} />
        </Routes>
      </Router>
    );
  } else if (
    authContext.AuthState.authenticated === true &&
    authContext.AuthState.role == "2"
  ) {
    return (
      <Router>
          <Box sx={{ }}>
            <Sidebarmenu />
            <Routes>
              <Route path="/" element={<Fdashbord />} />
              <Route path="/farmer/plant/manage" element={<Fplantmanage />} />
              <Route path="/farmer/plant" element={<Fplant />} />
              <Route path="/farmer/care" element={<Fcare />} />
              <Route path="/farmer/request" element={<Frequest />} />
              <Route path="/farmer/sale" element={<Fsale />} />
            </Routes>
          </Box>
      </Router>
    );
  } else if (authContext.AuthState.authenticated === false) {
    return (
      <Router>
        <Routes>
          <Route path="/"  exact element={<Login />} />
          <Route path="/singup"  exact element={<Signup />} />
        </Routes>
      </Router>
    );
  }
}

export default Navigations;
