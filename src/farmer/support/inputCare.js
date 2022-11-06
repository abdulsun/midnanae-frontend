import { IconButton, Stack, TextField } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Form from "react-bootstrap/Form";

export const InputRow = ({
  index,
  item,
  handleChange,
  handleRemove,
  handleAdd
}) => {
  return (
    <>
        <td className="center"> {index+1} </td>
        <td>
          <Form.Select
          name="way"
          value={item.way}
          onChange={(event) => handleChange(event, index)}
          > 
            <option></option>
            <option value="1" >การให้น้ำ</option>
            <option value="2" >การใส่ปุ๋ย</option>
            <option value="3" >กำจัดศัตรูพืช</option>
            <option value="4" >กำจัดวัชพืช</option>
            <option value="5" >การพรวนดิน</option>
            <option value="6" >การเก็บเกี่ยว</option>
          </Form.Select>
        </td>
        <td>
          <Form.Control 
          name="tool"
          type="text"
          value={item.tool}
          onChange={(event) => handleChange(event, index)} 
          />
        </td>
        <td>
          <Form.Control 
          name="amount"
          type="number" 
          value={item.amount}
          onChange={(event) => handleChange(event, index)}
          />
        </td>
        <td>
          <Form.Control 
          name="unit" 
          type="text" 
          value={item.unit}
          onChange={(event) => handleChange(event, index)}
          />
        </td>
        <td className="center">
          <button onClick={handleAdd} className="bm" type="button">
            <AddIcon sx={{ width: 15, mr: 0.5, ml: 0.5 }} />
          </button>
          <button onClick={handleRemove} className="bm" type="button">
            <RemoveIcon sx={{ width: 15, mr: 0.5, ml: 0.5 }} />
          </button>
        </td>
    </>
  );
};
