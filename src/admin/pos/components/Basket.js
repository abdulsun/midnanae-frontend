import { useState } from "react";
import axios from "axios";

export default function Basket(props) {
  const { product, cartItems, onAdd, onRemove, customer } = props;
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  const totalPrice = itemsPrice;

  // const [withdraw, setWithdraw] = useState(0)
  const [monny, setMonny] = useState(0);
  const withdraw = monny - totalPrice;
  const [cusName, setCusName] = useState(1)
  const [employee, setemployee] = useState(1)
  const address = "pos shop"
  const pmtype = "จ่ายด้วยเงินสด"
  const sell_type = "pos"
  const status = "สำเร็จ"
  const payment = "http://localhost:5000/images/product/2992022slip.png"

  const handleSubmit = () => {
    axios.post("http://localhost:5000/sell/create-sell", {
      employee,
      cusName ,
      address,
      pmtype,
      sell_type,
      status,
      payment,
      totalPrice,
      cartItems,
    }).then((res) => {
      alert("เพิ่มข้อมลการขายสำเรจ");
      window.location.reload();
    })
    .catch((err) => {
      console.log(err)
    })
  };


  return (
    <aside className="contai-2">
      <h2>ตะกร้าสินค้า</h2>

      <div>
        {cartItems.length === 0 && <div>โปรดเลือกสินค้า</div>}
        {cartItems.map((item) => (
          <div key={item.id} className="text">
            <div className="text-1">{item.name}</div>
            <div className="text-2">
              {item.qty} x ฿{item.price.toFixed(2)}
            </div>

            <div className="text-3">
              <button onClick={() => onRemove(item)} className="remove">
                -
              </button>{" "}
              <button onClick={() => onAdd(item)} className="add">
                +
              </button>
            </div>
          </div>
        ))}

        {cartItems.length !== 0 && (
          <>
            <hr></hr>
            <div className="text">
              <div className="textx-1">ราคาสินค้ารวม</div>
              <div className="textx-3">฿{itemsPrice.toFixed(2)}</div>
            </div>

            <div className="text">
              <div className="textx-1">
                <strong>Total Price</strong>
              </div>
              <div className="textx-3">
                <strong>฿{totalPrice.toFixed(2)}</strong>
              </div>
            </div>
            <hr />
            <form>
              <div className="text">
                <label className="textx-1">ชื่อลูกค้า</label>
                <div className="textx-3">
                  <select
                  name="customer"
                  onChange={((event) => {
                    setCusName(event.target.value)
                  })}
                  >
                    <option></option>
                    {customer.map((row, index) => 
                      <option
                      key={index}
                      value={row.customer_id}
                      >
                        {row.name + " " + row.lastname}
                      </option>
                    )}
                  </select>
                </div>
              </div>
              <div className="text">
                <label className="textx-1">รับเงิน</label>
                <div className="textx-3">
                  <input
                    type="number"
                    name="monny"
                    onChange={(event) => {
                      setMonny(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="text">
                <label className="textx-1">ถอนเงิน</label>
                <div className="textx-3">
                  <input value={withdraw} type="number" />
                </div>
              </div>
            </form>
            <div className="text">
              <button
                onClick={handleSubmit}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
