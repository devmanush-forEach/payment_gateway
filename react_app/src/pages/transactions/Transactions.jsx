import React, { useEffect, useState } from "react";
import TransactionTile from "../../components/transactionTile/TransactionTile";
import { axiosGet } from "../../helpers/axiosRequests";
import "./Transactions.css";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getList = async () => {
      const res = await axiosGet("/transaction/getList");
      console.log(res);
      if (res.status === 200) {
        setTransactions(res.data);
      }
    };
    getList();
  }, []);

  return (
    <section className="transactions_main_box">
      <div className="transaction_card_tile">
        {transactions?.map((ele) => (
          <>
            <TransactionTile data={ele} />
          </>
        ))}
      </div>
    </section>
  );
};

export default Transactions;
