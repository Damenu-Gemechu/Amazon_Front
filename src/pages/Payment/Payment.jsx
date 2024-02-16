import React, { useContext, useState} from "react";
import Layout from "../../Component/Layout/Layout"
import classes from  "./Pay.module.css";
import { DataContext } from "../../Component/DataProvider/DataProvider";
import ProductCard from "../../Component/Product/ProductCard"
import {useStripe, useElements,CardElement} from '@stripe/react-stripe-js';
import CurrencyFormat from "../../Component/CurrencyFormat/CurrencyFormat";
import {GridLoader} from'react-spinners'
import { axiosInstance } from "../../Api/axios";
//import { response } from "express";
import {db} from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/actiontype.js";

const Payment = () => {
 
  const [{user,basket},dispatch]=useContext(DataContext);
  //console.log(user)

  const totalItem=basket?.reduce((amount,item)=>{
    return item.amount+amount
  },0);

  const total=basket.reduce((amount,item)=>{
    return item.price*item.amount+amount
 },0)

  const [cardError,setCardError]=useState(null);
  const [processing,setProcessing]=useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate=useNavigate();

  const handleChange=(e)=>{
    // console.log(e)
    e?.error?.message? setCardError(e?.error?.message):setCardError("")
    };
    const handlePayment= async(e)=>{
      e.preventDefault();
      try{
        setProcessing(true);
// 1. backend||function --->contact to the client secret
      const response= await axiosInstance.post( `/payment/create?total=${total * 100}`   
      );
      // console.log(response.data)
      const clientSecret=response.data?.clientSecret;
    console.log(clientSecret)
      //2. client side (react side confirmation)
      const {paymentIntent}=await stripe?.confirmCardPayment(
        clientSecret,
        {
        payment_method:{
          card:elements.getElement(CardElement),
        },
      });
      // console.log(confirmation)
      //3. after the confirmation ---> order firestore database save, clear basket
      await db
      .collection("users")
      .doc(user?.uid)
      .collection("orders")
      .doc(paymentIntent.id)
      .set({
        basket:basket,
        amount:paymentIntent.amount,
        created:paymentIntent.created,
      });
      // empty the basket
      dispatch({type:Type.EMPTY_BASKET});
      setProcessing(false)
      //  navigate("/orders",{state:{msg:"You have placed new order"}})

     } catch(error){
      console.log(error)
      setProcessing(false)
     }

  }
  return (
    <Layout>
      {/* Header */}
      <div className={classes.payment_header}>Checkout ({totalItem}) items</div>
      {/* payment method */}
      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>

          <h3>Delivery Address </h3>
          <div>
          <div>{user?.email} </div>
          <div>123 React lane</div>
          <div>Chigago, IL</div>
          </div>
        </div>
        <hr/>
        {/* product */}
          <div className={classes.flex}>
              <h3>Review items and delivery</h3>
              <div>
                {
                  basket?.map((item,i)=>(
                <ProductCard key={i} product={item} flex={true}/>
                  
                  ))
                }
            </div>
          </div>
        <hr/>
        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment Methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {/* error */}
                {cardError && <small style={{color:"red"}}>{cardError}</small>}
              {/* card */}
              <CardElement onChange={handleChange} />
               {/* price */}
               <div className={classes.payment_price}>
                <div>
                  <span style={{display:"flex",gap:"10px"}}
                  >Total Order | <CurrencyFormat amount={total}/>
                  </span>
                </div>
                <button type="submit">
                  {
                    processing? (
                      <div className={classes.loading}>
                        <GridLoader color="#36d7b7" size={15}/>
                      </div>
                    ):"Pay Now"
                  }
                  </button>
               </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      </Layout>
  )
}

export default Payment;