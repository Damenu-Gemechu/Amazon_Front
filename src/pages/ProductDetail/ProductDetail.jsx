import { useParams } from "react-router-dom"
import Layout from "../../Component/Layout/Layout"
import { useEffect, useState } from "react"
import axios from "axios"
import {productURL} from "../../Api/endpoint"
import ProductCard from "../../Component/Product/ProductCard"
// import loader from "../../Component/loader/loader"

const   ProductDetail = () => {
  const{productId}=useParams()
  console.log(productId)
  const[product,setProduct]=useState({})
  const[isLoading,setIsLoading]=useState(false)
  useEffect(()=>{
   axios.get(`${productURL}/products/${productId}`)
.then((res) => {
  setProduct(res.data)
  console.log(res.data);
  setIsLoading(false)
  console.log(res.data)
})
.catch((err)=>{
  console.log("Error:", err);
  setIsLoading(false)
})
 }, [productId])
  return (

    <Layout>
      {
  isLoading ? (
    <loader/>
  ) : (
    <ProductCard product={product}
    flex={true}
    renderDesc={true}
    renderAdd={true}
    />
  )
}
      
    </Layout>
  )
}

export default ProductDetail