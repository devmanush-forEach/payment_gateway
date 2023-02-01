import React from "react";
import "./LeftNav.css";
import { BiRupee } from "react-icons/bi";
import { CgArrowsExchangeAlt } from "react-icons/cg";
import { Link } from "react-router-dom";

const LeftNav = () => {
  return (
    <>
      <section className="left_nav_main">
        <div className="payment_options">
          <ul className="payment_option_list">
            <li>
              <Link to="/payMoney" className="left_link">
                <span className="rupee_icon">
                  <BiRupee />
                </span>
                Pay Money
              </Link>
            </li>
            <li>
              <Link to="/recieveMoney" className="left_link">
                <span className="rupee_icon">
                  <BiRupee />
                </span>
                Recieve Money
              </Link>
            </li>
            <li>
              <Link to="/allTransactions" className="left_link">
                <span className="rupee_icon">
                  <CgArrowsExchangeAlt />
                </span>
                All Transactions
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default LeftNav;
