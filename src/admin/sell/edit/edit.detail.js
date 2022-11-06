import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { IconButton, Stack, TextField } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Form from "react-bootstrap/Form";
import DeleteIcon from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/DriveFileRenameOutlineOutlined";

export const InputTabel = (props) => {
  const {
    id,
    index,
    detail,
    inputFields,
    productName,
    productType,
    detailPurch,
    showprice,
  } = props;

  const [product_id, setProduct_id] = useState(0)
  const [type, setType] = useState("")
  const [qty, setQty] = useState(0)
  const [price, setPrice] = useState(0)
  
  const handleSubmit = (dt_id) => {
    console.log(dt_id)
    axios
      .put(`http://localhost:5000/sell/update-dtsell/${dt_id}`, {
        product_id : product_id ? product_id : detail.pro_id,
        qty : qty ? qty : detail.qty,
        price : price ? price : detail.price,
      })
      .then((res) => {
        alert(res.data.message);
        window.location.reload();
      });
  };

  const handleRemove = (dt_id) => {
    axios
      .delete(`http://localhost:5000/sell/delete-dtsell/${dt_id}`)
      .then((res) => {
        alert(res.data.message);
        window.location.reload();
      });
  };


  const price_sell = productName
    .filter((e) => Number(e.product_id) === Number(product_id))
   .map((row) => row.price_sell);

  return (
    <>
     {/* {detailPurch.map((detail, index) => ( */}
      
      <tr key={index} >
        <td className="center"> {index + 1} </td>
        <td>
         <Form.Select
            name="type"
            onChange={(event) => setType(event.target.value)}
          >
            <option>{detail.type}</option>
            {productType.map((row, index) => (
              <option key={index} value={row.type_product_id}>
                {row.name}
              </option>
            ))}
          </Form.Select>
        </td>
        <td>
        <Form.Select
            name="name"
            onChange={(event) => setProduct_id(event.target.value)}
          >
            <option>{detail.name}</option>
            {productName
              .filter(
                (e) => e.type_product_id === Number(type)
              )
              .map((row, index) => (
                <option key={index} value={row.product_id}>
                  {row.name}
                </option>
              ))}
          </Form.Select>
        </td>
        <td>
        <TextField
            type="number"
            size="small"
            value={price_sell}
            sx={{ width: 80}}
            onChange={(event) => setPrice(event.target.value)}
          />
        </td>
        <td>
        <TextField
            type="number"
            name="qty"
            size="small"
            defaultValue={detail.qty}
            sx={{ width: 80 }}
            onChange={(event) => setQty(event.target.value)}
          />
        </td>
        <td className="center">
            <Edit onClick={() => {
              handleSubmit(detail.dt_id)
            }} 
            stype="button" sx={{ width: 30, mr: 0.5, ml: 0.5 }} />
            <DeleteIcon  
            type="button"
            onClick={() => {
              handleRemove (detail.dt_id)
            }} 
            sx={{ width: 30, mr: 0.5, ml: 0.5 }} 
            />
        </td>
      </tr>
    {/* ))} */}
    </>
  );
};
