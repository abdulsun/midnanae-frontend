import React from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InventoryIcon from '@mui/icons-material/Inventory';
import StoreIcon from '@mui/icons-material/Store';
import SellIcon from '@mui/icons-material/Sell';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import ChatIcon from '@mui/icons-material/Chat';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import {Navigation} from 'react-minimal-side-navigation';

import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';


const NestedList = () => { 
  // const history = useNavigate();
    return ( 
      <>
        <Navigation 
            activeItemId= {window.location.pathname}
            onSelect={({ itemId }) => {
              window.location.href = itemId;
               
            }}
            items={[
              {
                title: 'Dashboard',
                itemId: '/', 
                elemBefore: () => <DashboardIcon /> ,   
              }, 
              {
                title: 'จัดการพนักงาน',
                itemId: '/admin/employee', 
                elemBefore: () => <ManageAccountsIcon />, 
                subNav: [
                  {
                    title: 'เพิ่มข้อมูลพนักงาน',
                    itemId: '/admin/employee/add',
                    
                  },
                  {
                    title: 'ข้อมูลพนักงาน',
                    itemId: '/admin/employee',
                  },
                  {
                    title: 'โปรไฟล์',
                    itemId: '/admin/employee/profile',
                  },
                ],
              },
              {
                title: 'จัดการผู้ใช้ระบบ',
                itemId: '/admin/user/customer',
                elemBefore: () => <AccountCircleIcon />,
                subNav: [
                  {
                    title: 'ข้อมูลลูกค้า',
                    itemId: '/admin/user/customer',
                  },
                  {
                    title: 'ข้อมูลเกษตรกร',
                    itemId: '/admin/user/farmer',
                  },
                ],
              },
              {
                title: 'จัดการสินค้า',
                itemId: '/admin/product/manage',
                elemBefore: () => <InventoryIcon />,
                subNav: [
                  {
                    title: 'จัดการประเภทสินค้า',
                    itemId: '/admin/product/type',
                  }, 
                  {
                    title: 'เพิ่มข้อมูลสินค้า',
                    itemId: '/admin/product/add',
                  },
                  {
                    title: 'จัดการสินค้า',
                    itemId: '/admin/product/manage',
                  },
                  {
                    title: 'จัดการสินค้าเสีย',
                    itemId: '/admin/product/wst',
                  },
                ],
              },
              {
                title: 'จัดการซื้อสินค้า',
                itemId: '/admin/purch',
                elemBefore: () => <StoreIcon />,
                subNav: [
                  {
                    title: 'คำร้องขอขายสินค้า',
                    itemId: '/admin/purch/sell',
                  },
                  {
                    title: 'การเพิ่มรายการซื้อ',
                    itemId: '/admin/purch/add',
                  },
                  {
                    title: 'จัดการข้อมูลการซื้อ',
                    itemId: '/admin/purch',
                  },
                ],
              },
              {
                title: 'จัดการขายสินค้า',
                itemId: '/admin/sell',
                elemBefore: () => <SellIcon />,
                subNav: [
                  {
                    title: 'จัดการข้อมูลการขาย',
                    itemId: '/admin/sell',
                  },
                ],
              },
              {
                title: 'ระบบ POS',
                itemId: '/admin/pos',
                elemBefore: () => <PointOfSaleIcon />, 
              }, 
              {
                title: 'ระบบแชท',
                itemId: '/admin/chat',
                elemBefore: () => <ChatIcon />, 
              }, 
              {
                title: 'จัดการบัญชี',
                itemId: '/admin/account',
                elemBefore: () => <AccountBalanceIcon />,
                subNav: [
                  {
                    title: 'บัญชีรายรับ',
                    itemId: '/admin/account/input',
                  },
                  {
                    title: 'บัญชีรายจ่าย',
                    itemId: '/admin/account/output',
                  },
                ],
              },
            ]}
          />
      </>
    );
}



export default NestedList;
