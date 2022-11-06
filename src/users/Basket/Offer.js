import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Card from "@mui/material/Card";

export default function Offer() {
  const [offerInput, setOfferInput] = useState("");
  const [clickButton, setClickButton] = useState(false);

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
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


const [customer, setCustomer] = useState(1)
const [address, setAddress] = useState([])
  useEffect(() => {
    axios
      .get(`http://localhost:5000/customer/sell/read-address/${customer}`)
      .then((res) => {
        setAddress(res.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

const [upaddress, setUpaddress] = useState('')
  return (
    <div className="offer_container">
      <h6>ที่อยู่การจัดส่ง</h6>

      <Autocomplete
      sx={{mb:2, mt:2,}}
      freeSolo   
        options={address.map((option) => option.address)}
        onChange={((event) => setUpaddress(event.target.li))}
        renderInput={(params) => 
        <TextField {...params} 
        size="small" 
        onChange={((event) => setUpaddress(event.target.value))}
        />}
        
      />
         <h6>หลักฐานการชำระ</h6>
      <div className="offer_box">
      <Card >
        <input
          value={offerInput}
          onChange={(event) => {
            setFile(URL.createObjectURL(event.target.files[0]));
            uploadImg();
          }}
          type="file"
        />
        <center><img src={file} height="250" /></center>
        
      </Card>
      </div>
    </div>
  );
}
