import {useState,useEffect} from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import classes from  './products.module.css'
const Product = () => {
  const [product, setProduct] = useState()
  const[isLoading,setIsLoading]=useState(false)
  useEffect(()=>{
 axios.get('https://fakestoreapi.com/products')
 .then((res)=>{
  setProduct(res.data)
   setIsLoading(false)

 })
 .catch((err)=>{
  console.log("Error",err);
  setIsLoading(false)
 })
  },[])

  return (
    <>
   {
    isLoading?(<loader/>):(<section className={classes.products__container}>
      {
   product?.map( (singleProduct)=>{
    return  <ProductCard  renderAdd={true} product ={singleProduct} key={singleProduct.id}/>;
   })
  }
    </section>)
   }
    
    </>
  )
}

export default Product
