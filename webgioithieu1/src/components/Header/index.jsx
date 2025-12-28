import { Link, NavLink } from "react-router-dom";
import { FaBars, FaShoppingBasket, FaUser } from "react-icons/fa";
import "./Header.css";
import { useContext, useEffect, useState } from "react";
import { WrapperContext } from "../Layout";

const Avatar = () => (
  <FaUser style={{ color: "#fff" }} />
);

const Header = () => {
  const { cartList, setIsShowCart, isLoged } =
    useContext(WrapperContext);

  const totalQuantity = cartList.reduce(
    (acc, cur) => acc + cur.quantity,
    0
  );

  const [isShowSide, setIsShowSide] = useState(false);

  useEffect(() => {
    const headerEle = document.querySelector("header");
    let lastScrollTop = 0;

    const onScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop) {
        headerEle.style.transform = "translateY(-100%)";
      } else {
        headerEle.style.transform = "translateY(0)";
      }
      lastScrollTop = st <= 0 ? 0 : st;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
