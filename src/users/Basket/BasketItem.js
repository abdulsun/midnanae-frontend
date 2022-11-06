import Buttons from "../components/Buttons/Buttons";
import { Link } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from "axios";

export default function BasketItem(props) {

  const deleteCart = (id) => {
    axios.delete(`http://localhost:5000/customer/cart/delete/${id}`)
    .then((res) => {
      window.location.reload()
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (

    <div className="basket_item">
      <Link className="basket_link" to={`/detail/${props.id}`}>
        <div className="basket_img">
          <img src={props.picture} alt="basket_item" />
        </div>
        <div className="basket_content">
          <h3 className="basket_title">{props.name}</h3>
          <span>ราคา : {(props.price).toLocaleString()} บาท </span>
        </div>
      </Link>
      <div className="basket_counter">
        <Buttons {...props} />
      </div>
      <div className="basket_counter">
        <span>{(props.price * props.qty).toLocaleString()}</span>
      </div>
      <div className="basket_counter">
        <RiDeleteBinLine 
        type="button"
        className="minus" 
        onClick={() => {
          deleteCart(props.cart_id);
        }}
         />
      </div>
    </div>
  );
}
