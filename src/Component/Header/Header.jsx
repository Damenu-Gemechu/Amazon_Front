/* eslint-disable no-unused-vars */
import classes from "./Header.module.css";
import { FaSearch} from "react-icons/fa";
import { TfiShoppingCart } from "react-icons/tfi";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../DataProvider/DataProvider";
import amazonLogo from '../../assets/images/img1.png'
import { MdLocationOn } from "react-icons/md";
import {auth} from '../../Utility/firebase'

const Header = () => {

  const [{user,basket}, dispatch] = useContext(DataContext)

  const totalItem=basket?.reduce((amount,item)=>{
    return item.amount+amount
  },0);

  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header__container}>
          {/* {logo} */}
          <div className={classes.log__container}>
            <Link to="/">
              {" "}
              <img
                src={amazonLogo}
                alt="amazonLogo"
              />
            </Link>
          </div>
          {/* {delivery} */}
          <span><MdLocationOn/></span>
          <div className={classes.delivery}>
            <p>Delivered to</p>
            <span>Ethiopia</span>
          </div>
          <div className={classes.search}>
            {/* {Search} */}
            <select name="" id="">
              <option value="">All</option>
              <option value="">Electronics</option>
              <option value="">Men's Clothes</option>
              <option value="">Women's Clothes</option>
              <option value="">jewlery</option>
            </select>
            <input type="text" name="" id="" placeholder="search product" />
            <FaSearch />
          </div>
          {/* {right side links} */}
          <div className={classes.order__container}>
            <div className={classes.language}>
              <img
                src="https://freesvg.org/img/united-states-daniel-mcr-01.png"
                alt=""
              />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </div>
            {/* {three components} */}
            <Link to={!user && "/auth"}>
              <div>
                {
                  user ?(
                    <>
                  <p>Hello {user?.email?.split("@")[0]}</p>
                  <span onClick={()=>auth.signOut()}>
                    Sign Out</span>
                  </>
                  ):(
                    <>
                    <p>Hello, Sign In</p>
                    <span>Account & Lists</span>
                    </>
                  )
                }
              </div>
            </Link>
            {/* {order} */}
            <Link to="/orders">
              <p>Returns</p>
              <span>& Orders</span>
            </Link>
            {/* {cart} */}
            <Link to="/cart" className={classes.cart}>
              <TfiShoppingCart size={25} />
              <span>{totalItem} </span>
              Cart
            </Link>
            
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
};

export default Header;
