import React, { useContext, useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
/* import { ProductContext, ProductDispath } from "../Context/ContextProvider"; */
import "./Buttons.css";
import axios from "axios";

export default function Buttons(props) {
  const { cart_id, cus_id, id, name, qty } = props;

  const [countItem, setCountItem] = useState(false);
  const [customer, setCustomer] = useState(1);
  const [item, setItem] = useState(0);
  // const cart_id = (cart.filter((e) => e.product_id === product.id).map((cart) => cart.cart_id))
  // let value = (props.filter((e) => e.pro_id === pro_id).map((cart) => Number(cart.qty)))
  let num = Number(item === 0 ? qty : item);
  const fullcart = (num) => {
    axios
      .post("http://localhost:5000/customer/fullcart", {
        cart_id: cart_id ? cart_id : "",
        customer: cus_id,
        product_id: id,
        qty: num,
      })
      .then((res) => {
        console.log(res.data.message);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const remove = (one) => {
    console.log("remove : ", num, "-", one  )
    num = (num - one);
    setItem(num)
    fullcart(num);
    
  };

  const add = (one) => {
    console.log("add : ", num, "+", one )
    num = (num + one);
    
    setItem(num)
    fullcart(num); 
  };

  return (
    <div className="basket_buttons">
      <span onClick={() => remove(1)} className="basket_minus">
        <AiOutlineMinus />
      </span>

      <span className="counter_number">{item === 0 ? qty : item}</span>

      <span onClick={() => add(1)} className="basket_plus">
        <AiOutlinePlus />
      </span>
    </div>
  );
}
