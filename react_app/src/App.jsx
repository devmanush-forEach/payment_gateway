import { Route, Routes } from "react-router";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Profile from "./pages/profile/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LeftNav from "./components/leftNav/LeftNav";
import PayMoney from "./pages/payMoney/PayMoney";
import Transactions from "./pages/transactions/Transactions";
import RecieveMoney from "./pages/recieveMoney/RecieveMoney";

function App() {
  return (
    <div className="App">
      <Navbar />
      <LeftNav />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Profile />} path="/profile" />
        <Route element={<PayMoney />} path="/payMoney" />
        <Route element={<RecieveMoney />} path="/recieveMoney" />
        <Route element={<Transactions />} path="/allTransactions" />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
