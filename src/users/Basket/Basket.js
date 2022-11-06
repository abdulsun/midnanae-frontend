import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Basket.css";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import BasketItem from "./BasketItem";
import Offer from "./Offer";
import OfferBadge from "./OfferBadge";
import SendProducts from "./SendProducts";
import OfferTiltel from "./OfferTiltel";
import Table from "react-bootstrap/Table";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import Card from "@mui/material/Card";

export default function Basket() {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");
  const [cusName, setCusName] = useState(1);
  const [upaddress, setUpaddress] = useState("");

  const sell_type = "online";
  const employee = "2";
  const pmtype = "จ่ายด้วยการโอน";

  const [basket, setBasket] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/customer/cart/dt-read/${cusName}`)
      .then((res) => {
        setBasket(res.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  let total = 0;
  const num = (sum) => {
    total = total + sum;
  };

  let status = fileName === "" ? "ยังไม่ได้ชำระ" : "รอการตรวจสอบ";

  console.log(status);
  const [file, setFile] = useState("");

  const uploadImg = () => {
    const form = document.querySelector("form");
    if (form) {
      const formData = new FormData(form);
      axios
        .post("http://localhost:5000/product/upload-img-product", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setFileName(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const [address, setAddress] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/customer/sell/read-address/${cusName}`)
      .then((res) => {
        setAddress(res.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  const handleSubmit = () => {
    axios
      .post("http://localhost:5000/sell/create-sell", {
        employee,
        cusName,
        address: upaddress,
        pmtype,
        sell_type,
        status,
        payment: fileName,
        totalPrice: total,
        cartItems: [...basket],
      })
      .then((res) => {
        axios
          .delete(`http://localhost:5000/customer/cart/cus/delete/${cusName}`)
          .then((res) => {
            alert("เพิ่มข้อมลการขายสำเร็จ");
            window.location.reload();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="details_container">
        <div className="details_linkBar">
          <Link onClick={() => navigate(-1)}>
            <HiArrowRight />
            back
          </Link>
        </div>
      </div>
      {basket.length > 0 ? (
        <div className="basket_container">
          <div className="basket_itemBox">
            <h2>ตะกร้าสินค้า</h2>
            {basket.map((product) => (
              <BasketItem key={product.cart_id} {...product} />
            ))}
          </div>
          <div className="basket_priceBox">
            <OfferBadge />
            <div className="basket_price">
              <span>ทำการสั่งซื้อ</span>
            </div>
            <div className="basket_send">
              <h6>ยอดสั่งซื้อ</h6>
              <Table>
                <tr>
                  <th>สินค้า</th>
                  <th>ราคา</th>
                  <th>จำนวน</th>
                  <th>ราคารวม</th>
                </tr>
                {basket.map((product) => (
                  <tr key={product.cart_id}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.qty}</td>
                    <td>{product.price * product.qty}</td>
                    {num(product.price * product.qty)}
                  </tr>
                  // {/* <OfferTiltel key={product.id} {...product} /> */}
                ))}
              </Table>
              <span>ราคารวมสะสม : {total} บาท</span>
            </div>
            <div className="basket_send">
              <h6>การชำระเงิน</h6>
              <span>
                ธนาคาร: ธนาคารไทยพาณิชย์บัญชี: 
              </span>
              <span> เลขที่บัญชี: 704-287-0000 </span>
              <span> บริษัท มิตรนาแน </span>
            </div>

            <div className="offer_container">
            <h6>หลักฐานการชำระ</h6>
            <form
                component="form"
                sx={{ mt: 1, pt: 2, pb: 10 }}
                encType="multipart/form-data"
              >
                <div className="offer_box">
                  <Card>
                    <TextField
                      fullWidth
                      size="small"
                      name="file"
                      type="file"
                      onChange={(event) => {
                        setFile(URL.createObjectURL(event.target.files[0]));
                        uploadImg();
                      }}
                    />
                    <center>
                      <img src={file} height="250" />
                    </center>
                  </Card>
                </div>

              <h6>ที่อยู่การจัดส่ง</h6>
                <Autocomplete
                  sx={{ mb: 2, mt: 2 }}
                  freeSolo
                  options={address.map((option) => option.address)}
                  onChange={(event) => setUpaddress(event.target.li)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      onChange={(event) => setUpaddress(event.target.value)}
                    />
                  )}
                />

              </form>
            </div>
            <button
              type="button"
              className="basket_button_buy"
              onClick={handleSubmit}
            >
              ยืนยันการซื้อ
            </button>
          </div>
        </div>
      ) : (
        <div className="favorite_empty">
          <img
            className="favorite_empty_img"
            src="images/empty-cart.png"
            alt="ไม่มีสินค้าในตะกร้าของคุณ"
          />
          <h4>ไม่มีสินค้าในตะกร้าของคุณ</h4>
        </div>
      )}
    </>
  );
}
