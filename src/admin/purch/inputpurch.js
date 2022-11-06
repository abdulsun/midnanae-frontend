import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Form from "react-bootstrap/Form";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

export const InputRow = ({
  index,
  row,
  inputFields,
  handleChange,
  handleRemove,
  handleAdd,
  productName,
  productType,
}) => {
  const showprice = productName
    .filter((e) => e.product_id === Number(inputFields[index].name))
    .map((row) => row.price_sell);

  const prqty = productName
  .filter((e) => e.product_id === Number(inputFields[index].name))
  .map((row) => row.qty);
   inputFields[index].prqty = prqty[0];

  return (
    <>
      <style type="text/css">
        {`
            .form-select{
                display: inline-flex;
                width:300px;
                margin-left:3px;
            }
            .remove-bn{
                margin-left:28px;
            }
        `}
      </style>
      <div className="dt-titel">
        <label> {index + 1}.</label>
        <label className="dt-text">ประเภทสินค้า </label>
        <Form.Select
          className="form-select"
          value={row.type}
          name="type"
          onChange={(event) => {
            handleChange(event, index);
          }}
        >
          <option></option>
          {productType.map((row, index) => (
            <option key={index} value={row.type_product_id}>
              {row.name}
            </option>
          ))}
        </Form.Select>
        <label className="dt-text">ชื่อสินค้า </label>

        <Form.Select
          className="form-select"
          value={row.name}
          name="name"
          onChange={(event) => {
            handleChange(event, index);
          }}
        >
          <option></option>
          {productName
            .filter(
              (e) => e.type_product_id === Number(inputFields[index].type)
            )
            .map((row, index) => (
              <option key={index} value={row.product_id}>
                {row.name}
              </option>
            ))}
        </Form.Select>

        <button onClick={handleRemove} type="button" className="remove-bn">
          <span role="img" aria-label="x emoji">
            ❌
          </span>
        </button>
      </div>
      <div className="dt-titel">
        <label className="dt-text">ราคาขายต่อหน่วย</label>

        <TextField
          type="number"
          name="prqty"
          size="small"
          value={showprice}
          sx={{ width: 100,  mr: 2 }}   
        />
        
        <label className="dt-text">ราคาซื้อต่อหน่วย</label>

        <TextField
          type="number"
          name="price"
          size="small"
          value={row.price} 
          sx={{ width: 150,  mr: 2 }}
          onChange={(event) => handleChange(event, index)}
        />
        <label className="dt-text"> จำนวน</label>

        <TextField
          type="number"
          name="qty"
          size="small"
          value={row.qty}
          sx={{ width: 150, mr: 2 }}
          onChange={(event) => handleChange(event, index)}
        />
        <label className="remove-bn">กิโลกรัม</label>
      </div>
      <center>
        <Divider
          className="dt-line"
          sx={{ borderBottomWidth: "5px", backgroundColor: "black" }}
        />
      </center>
    </>
  );
};
