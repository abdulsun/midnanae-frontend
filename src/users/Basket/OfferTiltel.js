import React from "react";

function OfferTiltel(props) {
  console.log(props)
  return (
    <div>
      <tr>
        <td>{props.name}</td>
        <td>{props.price}</td>
        <td>{props.qty}</td>
        <td>{props.price * props.qty}</td>
      </tr>
    </div>
  );
}

export default OfferTiltel;
