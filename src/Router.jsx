import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Auth from "./pages/Auth/Auth";
import Orders from "./pages/Orders/Orders";
import Cart from "./pages/Cart/Cart";
import Payment from "./pages/Payment/Payment";
import Results from "./pages/Results/Results";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import ProtectedRoute from "./Component/ProtectedRoute/ProtectedRoute";

const stripePromise = loadStripe(
  'pk_test_51OiudZHOGjxlxxtsISNOv7qxfC4qdCuKseUzw7t5lcUzcMxW89HC9mCsqk6Kmg1CpORltsKPdJi6LFBfYkIZh1KE00wwGvYCmF'
  );

  function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/auth" element={<Auth/>} />
        <Route path="/payment" element={
            <ProtectedRoute
            msg={"You must log in to pay"}
            redirect= {"/payment"}
            >
            <Elements stripe={stripePromise}>
            <Payment />
            </Elements>
            </ProtectedRoute>
          }
        />
        <Route path="/orders" element={
        <ProtectedRoute
        msg={"You must log in to access your Orders"}
        redirect= {"/orders"}
        >
        <Orders/>
        </ProtectedRoute>
        } />
        <Route path="/category/:categoryName" element={<Results/>} />
        <Route path="/products/:productId" element={<ProductDetail/>} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;
