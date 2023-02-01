import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormInput from "../../components/formInput/FormInput";
import { axiosGet, axiosPost } from "../../helpers/axiosRequests";
import "./PayMoney.css";

const PayMoney = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [reciever, setReciever] = useState(null);
  const [next, setNext] = useState(false);

  const checkReciever = async (number) => {
    const { data } = await axiosGet(`/user/reciever?phone=${number}`);

    if (data?.user) {
      setReciever(data.user);
    } else {
      setReciever(null);
    }
  };

  useEffect(() => {
    if (data?.phone > 9 || reciever) {
      checkReciever(data?.phone);
    }
  }, [data]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "phone" && value.length >= 10) {
      checkReciever(value);
    }
    setData({ ...data, [name]: value });
  };

  const handleContinue = () => {
    if (!reciever) {
      toast.error("Please Enter a valid user's number.");
      return;
    }
    if (data.amount < 0) {
      toast.error("Please Enter the Amount");
      return;
    }
    setNext(!next);
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    const res = await axiosPost("/transaction/pay", { ...data, ...reciever });

    if (res.status === 200) {
      toast(`Payment is Successfull with transaction id ${res.data._id} .`);
      setNext(false);
      setData({});
      navigate("/");
    } else {
      toast.error(res.data.error);
    }
  };
  return (
    <div className="payMoney_main">
      <section className="form_section">
        <h2>Pay To Any User</h2>
        <form action="" className="payment_form" onSubmit={handlePayment}>
          {next ? (
            <>
              <div className="payment_info">
                Pay Rs. {data?.amount} to {reciever?.name}
              </div>
            </>
          ) : (
            <>
              <FormInput
                name="phone"
                onchange={handleChange}
                label="Enter Phone Number"
                inputValue={data.phone}
                errorMessage="Please enter a valid user's phone number"
                pattern="^([+- 0-9]{10,11})"
              />
              {reciever && (
                <div className="to_user_name">
                  {" "}
                  Pay To : <span>{reciever.name}</span>
                </div>
              )}
            </>
          )}

          <div className="amount_section">
            {next ? (
              <>
                <input
                  type="password"
                  name="password"
                  value={data.passwprd}
                  onChange={handleChange}
                  placeholder="Enter Wallet Password"
                  className="passowrd_input"
                  autoComplete="off"
                />
                <input type="submit" value="Pay" className="submit_btn" />
              </>
            ) : (
              <>
                <FormInput
                  name="amount"
                  onchange={handleChange}
                  label="Amount"
                  inputValue={data.amount}
                  errorMessage="Please enter an amount greater than 0."
                  type="number"
                  pattern="^([0-9]{10,11})"
                />
                <button className="submit_btn" onClick={handleContinue}>
                  Continue
                </button>
              </>
            )}
          </div>
        </form>
      </section>
    </div>
  );
};

export default PayMoney;
