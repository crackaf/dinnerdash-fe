import React from "react";
import YellowStar from "../../assets/images/yellow-star.png";
import "./ProductCard.scss";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ productImg, onClick, id, name, price, restId }) => {
  const navigate = useNavigate();

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${restId}/${id}`)}
    >
      <div className="product-card-wrapper-1 dd-mb-10">
        <div className="product-card-wrapper-2">
          <img src={productImg} alt="Food Image" />
        </div>
      </div>
      <h5 className="product-card-name ">{name && name}</h5>
      <h5 className="product-card-price">Rs {price && price}</h5>
      <div className="d-flexproduct-card-stars">
        <img src={YellowStar} alt="" />
        <img src={YellowStar} alt="" />
        <img src={YellowStar} alt="" />
        <img src={YellowStar} alt="" />
        <img src={YellowStar} alt="" />
      </div>
    </div>
  );
};

export default ProductCard;
