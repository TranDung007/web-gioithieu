import { Link, NavLink } from "react-router-dom";
import { FaBars, FaShoppingBasket, FaUser } from "react-icons/fa";
import "./Header.css";
import { useContext, useEffect, useState } from "react";
import { WrapperContext } from "../Layout";

const Avatar = ({ avartar }) => {
  return (
    <div className="avatar">
      <img
        src={avartar}
        alt="avatar"
        style={{
          width: "25px",
          height: "25px",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
    </div>
  );
};

const Header = () => {
  const { cartList, setIsShowCart, isLoged, userList } =
    useContext(WrapperContext);
  const totalQuantity = cartList.reduce((acc, cur) => {
    return acc + cur.quantity;
  }, 0);

 useEffect(() => {
     const headerEle = document.querySelector("header");
 
     var lastScrollTop = 0;
 
     window.addEventListener(
       "scroll",
       function () {
         var st = window.pageYOffset || document.documentElement.scrollTop;
         if (st > lastScrollTop) {
           headerEle.style.transform = "translateY(-100%)";
         } else {
           headerEle.style.transform = "translateY(0)";
           headerEle.classList.add("scroll-top");
         }
         lastScrollTop = st > 0 ? st : 0;
 
         if (st == 0) {
           headerEle.classList.add("bg-transparent");
           headerEle.classList.remove("scroll-top");
         } else {
           headerEle.classList.remove("bg-transparent");
         }
       },
       false
     );
   }, []);
 
   const [isShowSide, setIsShowSide] = useState(false);
 
   const showCartList = () => {
     setIsShowCart(true);
   };
 
   const headerClick = (e) => {
     const clickItem = e.target.closest(".nav-item");
 
     document.querySelector(".nav-item.active")?.classList.remove("active");
     clickItem.classList.add("active");
     setIsShowSide(false);
   };
 
   const userLoged = userList.find(
     (user) => user.signupEmail == isLoged.user.signupEmail
   );
 
   console.log(userList);
 
  return (
    <header>
      <div className="container">
        <div className="header-inner d-flex align-items-center">
          <FaBars
            className="bars"
            onClick={() => setIsShowSide(!isShowSide)}
          />

          <Link to="/" className="logo">
            <img src="/images/logo-2.png" alt="logo" />
          </Link>

          <ul className={`nav-list ${isShowSide ? "show" : ""}`}>
            {[
              { to: "/", label: "Trang chủ" },
              { to: "/menu", label: "Menu" },
              { to: "/news", label: "Tin tức" },
              { to: "/contact", label: "Liên hệ" },
              { to: "/about", label: "Chúng tôi" },
            ].map((item) => (
              <li key={item.to} className="nav-item">
                <NavLink to={item.to}>{item.label}</NavLink>
              </li>
            ))}
          </ul>

          <div className="login d-flex">
            <div className="cart" onClick={() => setIsShowCart(true)}>
              <FaShoppingBasket />
              {totalQuantity > 0 && (
                <div className="cart-quantity">{totalQuantity}</div>
              )}
            </div>

            <NavLink to="/login" className="user-icon">
              {isLoged.status ? <Avatar /> : <FaUser />}
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
