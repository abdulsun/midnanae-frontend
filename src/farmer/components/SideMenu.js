import React, { useEffect, useState } from "react";
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import './sidbar.css'
import logo from "../../assets/blue-logo.png";
import LogoutIcon from '@mui/icons-material/Logout';

import MenuItem from "./MenuItem";

export const menuItems = [    
  {
    name: "Dashboard",
    exact: true,
    to: "/",
  },
  {
    name: "ข้อมูลการขาย",
    exact: true,
    to: `/farmer/sale`,
    subMenus: [
      { name: "การขาย", to: "/farmer/sale" },
      { name: "ส่งคำร้องขาย", to: "/farmer/request" },
    ],
  },
  {
    name: "ข้อมูลการเกษตร",
    exact: true,
    to: `/farmer/plant`,
    subMenus: [
      { name: "ข้อมูลการเกษตร", to: "/farmer/plant/manage" },
      { name: "ข้อมูลการปลูก", to: "/farmer/plant" },
      { name: "ข้อมูลการดูแล", to: "/farmer/care" },
    ],
  },
  // { name: "Design 2", to: `/design-2`, iconClassName: "bi bi-vector-pen" },
  // { name: "Design 3", to: `/design-3`, iconClassName: "bi bi-vector-pen" },
  // { name: "Design 4", to: `/design-4`, iconClassName: "bi bi-vector-pen" },
];

const SideMenu = (props) => {
  const authContext = useContext(AuthContext);

  const [inactive, setInactive] = useState(false);

  useEffect(() => {
    if (inactive) {
      removeActiveClassFromSubMenu();
    }

    //props.onCollapse(inactive);
  }, [inactive]);


  const removeActiveClassFromSubMenu = () => {
    document.querySelectorAll(".sub-menu").forEach((el) => {
      el.classList.remove("active");
    });
  };


  useEffect(() => {
    let menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach((el) => {
      el.addEventListener("click", (e) => {
        const next = el.nextElementSibling;
        removeActiveClassFromSubMenu();
        menuItems.forEach((el) => el.classList.remove("active"));
        el.classList.toggle("active");
        if (next !== null) {
          next.classList.toggle("active");
        }
      });
    });
  }, []);

  return (
    <div className={`side-menu ${inactive ? "inactive" : ""}`}>
      <div className="top-section">
        <div className="logo">
          <img src={logo} alt="webscript" width="200px"/>
        </div>
      </div>

      <div className="main-menu">
        <ul>
          {menuItems.map((menuItem, index) => (
            <MenuItem
              key={index}
              name={menuItem.name}
              exact={menuItem.exact}
              to={menuItem.to}
              subMenus={menuItem.subMenus || []}
              onClick={(e) => {
                if (inactive) {
                  setInactive(false);
                }
              }}
            />
          ))}
        </ul>
      </div>
      <div>
      <button>
            <LogoutIcon
              onClick={() => {
                authContext.Logout()
                window.location = "/"
              }}
            />
      </button>
      </div>
    </div>
  );
};

export default SideMenu;
