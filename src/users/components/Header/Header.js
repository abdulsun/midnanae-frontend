import React, { useEffect, useRef } from "react";
import { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import "./Header.css";
import { AiOutlineShopping } from "react-icons/ai";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { Link, Navigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Imguser from '../../../assets/user.png';
import logo from '../../../assets/white-logo.png';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box } from "@mui/material";

// import { AuthContext } from '../../../Context/AuthContext'

function Header() {
  const authContext = useContext(AuthContext)

  
  const cus =  authContext.getUserData()

  // console.log(cus[0].name)

  return (
    <header className="header">
      <nav className="nav">
        <div className="firt-left">
          <Link to={"/"} >
            <img src={logo} className="img-logo" />
          </Link>
          <div className="text-s">
            <Link to={"/store"} className="fist-text">
              <label>ร้านค้า</label>
            </Link>
            <Link to={"/order"} className="fist-text">
              <label>การสั่งซื้อ</label>
            </Link>
            <Link to={"/"} className="fist-text">
              <label>การสนทนา</label>
            </Link>
          </div>
        </div>


        <div className="icon_Sopping_box">
          <div className="search_header">{<Navigate to={'/'} /> && <SearchBar />}</div>
         
          
          <Link to={"/profile"} className="shoppe_icon_box">
          <Box sx={{color:"#fff"}} >{cus.name}</Box>
            <img src={Imguser} className="pro_icon" />
          </Link>

          <button>
            <LogoutIcon
              onClick={() => {
                authContext.Logout()
                window.location = "/"
              }}
            />
          </button>

        </div>
      </nav>
    </header>
  );
}

export default Header;
