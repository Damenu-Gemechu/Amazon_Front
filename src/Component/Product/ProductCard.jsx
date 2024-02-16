/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import classes from './Product.module.css'
import { Rating } from "@mui/material";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import { DataContext } from "../DataProvider/DataProvider";
import {useContext} from 'react'
import { Type } from "../../Utility/actiontype";
const ProductCard = ({ product,flex ,renderDesc,renderAdd}) => {
  const { image, title, id, price, rating ,description} = product;
 const[state,dispatch]=useContext(DataContext)
//  console.log(state)
 const addToCart=()=>{
  dispatch({type:Type.ADD_TO_BASKET,item:{image, title, id, price, rating ,description

  }});
 }
  return (
    <div className={`${classes.card__container} ${flex?classes.product__flexed:''}`}>
      <Link to={`/products/${id}`}>
        <img src={image} alt='' className={classes.img__container}/>
      </Link>
      <div>
        <h3>{title}</h3>
       {renderDesc && <div style={{maxWidth:"750px"}}>{description}</div>}
        <div className={classes.rating}>
          {rating && rating.rate && rating.count && (
            <>
              {/* Rating */}
              <Rating value={rating.rate} precision={0.1} />
              {/* count */}
              <small>{rating.count}</small>
            </>
          )}
        </div>
        <div>
          {/* price */}
          <CurrencyFormat amount={price} />
        </div>
        {renderAdd &&<button className={classes.butto} onClick={addToCart}>add to cart</button>}
        
      </div>
    </div>
  );
}

export default ProductCard;
