/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { Type } from "../../Utility/actiontype";
import { useContext } from "react";
import Layout from "../../Component/Layout/Layout";
import { DataContext } from "../../Component/DataProvider/DataProvider";
import ProductCard from '../../Component/Product/ProductCard';
import CurrencyFormat from "../../Component/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import classes from './Cart.module.css'
import { IoIosArrowDown ,IoIosArrowUp} from "react-icons/io";
const Cart = () => {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const total=basket.reduce((amount,item)=>{
     return item.price*item.amount+amount
  },0)

  const increment=(item)=>{
    dispatch({
      type:Type.ADD_TO_BASKET,item
    })

  }
  const decrement=(id)=>{
    dispatch({
      type:Type.REMOVE_FROM_BASKET,id
    })

  }
  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.cart__container}>
          <h2>Hello</h2>
          <h3>Your shopping basket</h3>
          <hr />
          {basket?.length === 0 ? (
            <p>Oops! No item in your cart</p>
          ) : (
            basket?.map((item,i) => (
             <section className={classes.cart_product}>
              <ProductCard
                key={i}
                product={item}
                renderDesc={true}
                renderAdd={false}
                flex={true}
             
              />
              <div className={classes.btn_container}>
                <button onClick={()=>increment(item)}><IoIosArrowUp size={"30px"} /></button>
                <span> {item.amount}</span>
                <button className={classes.btn} onClick={()=>decrement(item.id)}><IoIosArrowDown  size={"30px"} /></button>
              </div>
              </section>
            ))
          )}
        </div>
        {basket?.length !=0&&(
               <div className={classes.subtotal}>
       <div>
        <p>Subtotal({basket?.length} items)</p>
        <CurrencyFormat amount={total}/>
       </div>
       <span>
        <input type="checkbox" />
        <small>This order contains a gift</small>
       </span>
       <Link to='/payment'>Contains to checkout</Link>
               </div>  
              )}
     
      </section>
    </Layout>
  );
};

export default Cart;
