import React from "react";
import { useSelector } from "react-redux";
import { BiRupee } from "react-icons/bi";
import "./TransactionTile.css";

const TransactionTile = ({ data }) => {
  const { user } = useSelector((state) => state.user);
  const recieved = data.from.phone !== user?.phone;

  const tnd = data.createdAt.split("T");
  const date = tnd[0];
  const time = tnd[1].split(".")[0];

  return (
    <div
      className="transaction_tile"
      style={{ color: recieved ? "green" : "red" }}
    >
      <div className="sender_info">
        <p className="info_title">{recieved ? "From" : "To"}</p>
        <h2>{recieved ? data?.from?.name : data?.to?.name}</h2>
      </div>
      <div className="dnt">
        <span>{date}</span>
        <span>{time}</span>
      </div>

      <div className="transaction_amount">
        <span
          className="rupee_icon"
          style={{ color: recieved ? "green" : "red" }}
        >
          <BiRupee />
        </span>
        {data?.amount}
      </div>
    </div>
  );
};

export default TransactionTile;
