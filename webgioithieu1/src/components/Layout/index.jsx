import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router";
import Cart from "../Cart";
import Footer from "../Footer";
import Header from "../Header";
import Overlay from "../Overlay";
import Popup from "../Popup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackToTop from "../BackToTop";
import axiosClient from "../../api/axiosClient";

export const WrapperContext = createContext();

const Layout = () => {
  const [currentBuy, setCurrentBuy] = useState(null);

  // ✅ CART
  const [cartList, setCartList] = useState(() => {
    const cart = localStorage.getItem("cartList");
    return cart ? JSON.parse(cart) : [];
  });

  const [data, setData] = useState([]);
  const [isShowCart, setIsShowCart] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // ✅ USER LIST (nếu m còn dùng)
  const [userList, setUserList] = useState(
    JSON.parse(localStorage.getItem("userList")) || []
  );

  // ✅ LOGIN STATE — LOAD TỪ LOCALSTORAGE
  const [isLoged, setIsLoged] = useState(() => {
    const savedUser = localStorage.getItem("loggedUser");
    return savedUser
      ? { status: true, user: JSON.parse(savedUser) }
      : { status: false, user: null };
  });

  useEffect(() => {
    document.title = "Coffee Cup";
  }, []);

  // ✅ FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosClient.get("/products");
        setData(res.data);
      } catch (error) {
        console.error("Lỗi lấy sản phẩm:", error);
      }
    };
    fetchProducts();
  }, []);

  // ✅ SAVE CART
  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartList));
  }, [cartList]);

  // ✅ SAVE LOGIN USER
  useEffect(() => {
    if (isLoged.status && isLoged.user) {
      localStorage.setItem("loggedUser", JSON.stringify(isLoged.user));
    } else {
      localStorage.removeItem("loggedUser");
    }
  }, [isLoged]);

  const closePopup = () => setCurrentBuy(null);
  const closeCartSide = () => setIsShowCart(false);

  const editItem = (code) => {
    const item = cartList.find((prod) => prod.code === code);
    setCurrentBuy(item);
    setIsEdit(true);
  };

  const deleteItem = (code) => {
    if (window.confirm("Bạn có muốn xóa sản phẩm?")) {
      const newList = cartList.filter((item) => item.code !== code);
      setCartList(newList);
    }
  };




  const totalPrice = cartList.reduce(
    (acc, cur) => acc + cur.quantity * cur.price[cur.size],
    0
  );
    const logout = () => {
    setIsLoged({ status: false, user: null });
    localStorage.removeItem("loggedUser");
  };


  return (
    <WrapperContext.Provider
      value={{
        currentBuy,
        setCurrentBuy,
        closePopup,
        cartList,
        setCartList,
        data,
        totalPrice,
        isShowCart,
        setIsShowCart,
        closeCartSide,
        editItem,
        deleteItem,
        isEdit,
        setIsEdit,
        userList,
        setUserList,
        isLoged,
        setIsLoged,
        logout,
      }}
    >
      <Header />
      <Popup />
      <Cart />
      <ToastContainer autoClose={1000} position="bottom-right" />
      <BackToTop />
      <Overlay />
      <Outlet />
      <Footer />
    </WrapperContext.Provider>
  );
};

export default Layout;
