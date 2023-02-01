import React, { useState } from "react";
import "./AddMoneyBox.css";
import { RxCross2 } from "react-icons/rx";
import FormInput from "../formInput/FormInput";
import { axiosPost } from "../../helpers/axiosRequests";
import { useSelector } from "react-redux";

const AddMoneyBox = ({ onHide }) => {
  const [amount, setAmount] = useState(null);

  const { user } = useSelector((state) => state.user);

  const verifyPayment = async (ids) => {
    // demo data for verification

    const reqData = {
      ids: {
        razorpay_order_id: ids.razorpay_order_id,
        razorpay_payment_id: ids.razorpay_payment_id,
        razorpay_signature: ids.razorpay_signature,
      },
      amount: amount,
    };

    const res = await axiosPost("/payment/paymentVerification", reqData);
    console.log(res);

    // if (res.error) {
    //   dispatch(
    //     show_Notification({
    //       message: "Payment is unsuccessfull!!",
    //       isError: true,
    //     })
    //   );
    // }
    // if (res.data) {
    //   dispatch(
    //     show_Notification({
    //       message: `Congrats, ${plan?.title} is successfully subscribed !`,
    //     })
    //   );
    //   navigate("/");
    // }
  };

  const handleAddMoney = async (e) => {
    e.preventDefault();
    const {
      data: { key },
    } = await axiosPost("/payment/getkey", {});

    const res = await axiosPost("/payment/setOrder", {
      amount: amount * 100,
    });

    const {
      data: { order },
    } = res;

    const options = {
      key: key,
      amount: amount,
      currency: "INR",
      name: "Payment App",
      description: `Addimg amount of Rs ${amount}`,
      image: "",
      order_id: order.id,
      handler: function (response) {
        verifyPayment({
          ids: response,
          amount: amount,
        });
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.phone,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#E5E5E5",
      },
    };

    const razorPay = new window.Razorpay(options);
    razorPay.open();
  };

  return (
    <div className="absolute00">
      <div className="add_money_form_box">
        <span className="cross_icon">
          <RxCross2 onClick={onHide} />
        </span>

        <h2 className="add_money_title">Add Money to your wallet</h2>
        <form action="" className="add_money_form" onSubmit={handleAddMoney}>
          <FormInput
            name="amount"
            onchange={(e) => {
              setAmount(e.target.value);
            }}
            label="Enter Amount"
            inputValue={amount}
            errorMessage="Please enter the amount."
            type="number"
          />
          <input className="submit_btn" type="submit" value="Add Money" />
        </form>
      </div>
    </div>
  );
};

export default AddMoneyBox;
