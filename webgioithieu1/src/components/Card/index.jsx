import "./Card.css";
import { FaShoppingBasket } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { useContext } from "react";
import { WrapperContext } from "../Layout";

const Card = ({ product }) => {
  const { setCurrentBuy } = useContext(WrapperContext);

  const handleClickBuy = () => {
    setCurrentBuy({
      ...product,
      size: "S",
      note: "",
      quantity: 1,
    });
  };

  // ✅ FIX GIÁ – đảm bảo luôn là số
  const priceS =
    typeof product.price === "object"
      ? product.price.S
      : product.price;

  return (
    <div className="card">
      <div className="card-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="card-content">
        <div className="card-content-left d-flex align-items-center justify-content-between">
          <div className="card-like">
            {[...Array(product.star)].map((_, i) => (
              <AiFillStar key={i} />
            ))}
          </div>

          <div className="card-price">
            <span>{Number(priceS).toLocaleString()} đ</span>
          </div>
        </div>

        <div className="card-content-right d-flex align-items-center justify-content-between">
          <h3 className="card-name">{product.name}</h3>

          <div
            className="card-cart d-flex align-items-center justify-content-center"
            onClick={handleClickBuy}
          >
            <FaShoppingBasket />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
