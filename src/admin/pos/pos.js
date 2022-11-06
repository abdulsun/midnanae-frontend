import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import axios from "axios";

import Header from "./components/Header";
import Main from "./components/Main";
import Basket from "./components/Basket";
import data from "./data";
import "./components/pos.css";
export default function Pos() {
  const [products, setproducts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/product")
      .then((res) => {
        setproducts(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/customer/read")
      .then((res) => {
        setCustomer(res.data);
        // console.log(res.data)
      })
      .catch((error) => {
        console.error(error.message);
      })
  }, []);

  const [cartItems, setCartItems] = useState([]);

  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    console.log(exist)
    if (exist) {
      setCartItems( 
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

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
      <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
        <div>
          <Header countCartItems={cartItems.length}></Header>
          <div className="contai">
            <Main products={products} onAdd={onAdd}></Main>
            <Basket
              product={products}
              cartItems={cartItems}
              onAdd={onAdd}
              onRemove={onRemove}
              customer={customer}
            ></Basket>
          </div>
        </div>
      </Container>
    </Box>
  );
}
