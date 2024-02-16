import React, { useContext, useState, useEffect } from "react";
import Layout from "../../Component/Layout/Layout";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../Component/DataProvider/DataProvider";
import classes from "./Order.module.css";
import ProductCard from "../../Component/Product/ProductCard";

function Order() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users").doc(user.uid).collection("orders").orderBy("created","desc").onSnapshot((snapshot)=>{
   console.log(snapshot)
  setOrders(
    snapshot.docs.map(doc=>({
     id: doc.id,
     data: doc.data(),
    }))
  )
});
}else{
setOrders([])
}
},[])

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2> Your Order</h2>
          {
            orders?.length==0 && 
             <div style={{padding:"20px"}} >
              No Orders Yet!
              </div>
          }
          {/* order items */}
          <div>
            {
              orders?.map((eachOrder, i)=>{
                return (
                  <div key={i}>
                    <hr/>
                    <P>Order ID: {eachOrder?.id}</P>
                    {
                      eachOrder?.data?.basket?.map(order=>{
                       return <ProductCard 
                        flex={true}
                        product={order}
                        key={order.id}
                        
                        />
                      })
                    }
                  </div>
                )
              })
            }
          </div>
        </div>
      </section>
      </Layout>
  )
}

export default Order