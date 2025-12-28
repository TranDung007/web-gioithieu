import { useContext, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { WrapperContext } from "../../components/Layout";
import "./Payment.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axiosClient from "../../api/axiosClient";

const handleUserDataChange = () => {};
const appleCode = (e) => e.preventDefault();

const OrderList = ({
  cartList,
  editItem,
  deleteItem,
  totalPrice,
  setCartList,
}) => {
  return (
    <div>
      {cartList.map((product) => (
        <div
          className="cart-item d-flex align-items-center"
          key={product.code}
        >
          <div className="cart-item-image">
            <img src={product.image} alt={product.alt} />
          </div>

          <div className="cart-item-info">
            <div className="name">{product.name}</div>
            <div className="size d-flex align-items-center">
              Size {product.size}
              <span>x{product.quantity}</span>
              <div className="edit" onClick={() => editItem(product.code)}>
                <MdModeEdit className="cart-icon-small" />
              </div>
            </div>
            <div className="note">{product.note}</div>
          </div>

          <div className="cart-item-sub-price">
            {(product.quantity * product.price[product.size]).toLocaleString()}đ
          </div>

          <div
            className="delete-product"
            onClick={() => deleteItem(product.code)}
          >
            <RiDeleteBinFill className="cart-icon-small" />
          </div>
        </div>
      ))}
    </div>
  );
};

const Payment = () => {
  const navigate = useNavigate();
  const {
    cartList,
    editItem,
    deleteItem,
    totalPrice,
    setCartList,
    isLoged,
  } = useContext(WrapperContext);

  const saleValue = 0;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ✅ USER LOGGED (SAFE)
  const userLoged = isLoged?.status ? isLoged.user : null;

  const onSubmit = async (data) => {
    try {
      const orderData = {
        name: data.name,
        phone: data.phone,
        address: data.address,
        pay_method: data.payMethod,
        subtotal: totalPrice,
        discount: saleValue,
        total: totalPrice - saleValue,
        items: cartList.map((item) => ({
          product_id: item.id,
          size: item.size,
          quantity: item.quantity,
          price: item.price[item.size],
        })),
      };

      await axiosClient.post("/orders", orderData);

      toast.success("Bạn đã đặt hàng thành công!");
      setCartList([]);
      navigate("/");
    } catch (err) {
      toast.error("Đặt hàng thất bại!");
    }
  };

  if (cartList.length === 0) {
    return (
      <>
        <section className="payment-banner"></section>
        <div className="text-center mt-5 mb-5">
          <h3>Giỏ hàng trống</h3>
          <Link to="/menu" className="btn">
            Tiếp tục mua hàng
          </Link>
        </div>
      </>
    );
  }

  // ⛔ ĐÃ XOÁ HOÀN TOÀN BLOCK if (isLoged) + userList.find

  return (
    <div>
      <section className="payment-banner"></section>

      <div className="main padding-60">
        <h2 className="h2-heading">Thanh toán</h2>

        <div className="container">
          <form
            className="product-box d-flex"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="row">
              <div className="col-md-6">
                <h3 className="text-center">Thông tin khách hàng</h3>

                <div className="profile-item">
                  <label>Họ tên :</label>
                  <input
                    defaultValue={userLoged?.full_name || ""}
                    {...register("name", { required: true })}
                  />
                  {errors.name && <span className="error-mesage">Nhập tên</span>}
                </div>

                <div className="profile-item">
                  <label>Điện thoại :</label>
                  <input
                    defaultValue={userLoged?.phone || ""}
                    {...register("phone", { required: true })}
                  />
                </div>

                <div className="profile-item">
                  <label>Địa chỉ :</label>
                  <input
                    defaultValue={userLoged?.address || ""}
                    {...register("address", { required: true })}
                  />
                </div>

                <div className="profile-item">
                  <label>Phương thức thanh toán :</label>
                  <input
                    type="radio"
                    value="cash"
                    {...register("payMethod", { required: true })}
                  />{" "}
                  Tiền mặt
                  <input
                    type="radio"
                    value="bank"
                    {...register("payMethod", { required: true })}
                  />{" "}
                  Ngân hàng
                </div>
              </div>

              <div className="col-md-6">
                <OrderList
                  cartList={cartList}
                  editItem={editItem}
                  deleteItem={deleteItem}
                  totalPrice={totalPrice}
                  setCartList={setCartList}
                />
              </div>

              <div className="button-group text-center">
                <Link to="/menu" className="btn white">
                  Quay lại
                </Link>
                <button type="submit" className="btn order-btn">
                  Đặt hàng
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
