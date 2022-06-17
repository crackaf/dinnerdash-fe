import React from "react";
import Layout from "../../components/Layout/Layout";
import "./ProductDetail.scss";
import foodIMG from "../../assets/images/food.png";
import tickIMG from "../../assets/images/tick.png";
import { TickIcon } from "../../assets/SVG/SVG";
import { QuantityPicker } from "react-qty-picker";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getOffering } from "../../api/Offerings";
import { useState } from "react";
import { createAlert } from "../../helper";
import { AlertContext } from "../../Contexts/AlertContext";
import { useContext } from "react";
import { getCurrentRestaurant } from "../../api/restaurant";

const ProductDetail = () => {
  const { id } = useParams();
  const { restId } = useParams();
  const [offer, setOffer] = useState(null);
  const [rest, setRest] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { alerts, setAlerts } = useContext(AlertContext);

  useEffect(async () => {
    try {
      const response = await getOffering(restId, id);
      setOffer(response.data);
      const response2 = await getCurrentRestaurant(restId);
      setRest(response2.data);
    } catch (error) {
      createAlert(
        {
          type: "danger",
          message: error?.message,
        },
        alerts,
        setAlerts
      );
    }
  }, []);

  const addToCart = () => {
    if (localStorage.getItem("cart")) {
      var cartArr = JSON.parse(localStorage.getItem("cart"));
      console.log("jj", cartArr, id, restId);

      const newarr = cartArr.filter(
        (item) => item.itemId != id || item.restId != restId
      );
      console.log("newArr", newarr);
      newarr.push({
        itemId: id,
        restId: restId,
        quantity: quantity,
      });
      localStorage.setItem("cart", JSON.stringify(newarr));
    } else {
      localStorage.setItem(
        "cart",
        JSON.stringify([
          {
            itemId: id,
            restId: restId,
            quantity: quantity,
          },
        ])
      );
    }
    createAlert(
      {
        type: "success",
        message: `${quantity} ${offer.offeringName}s successfuly added to your cart. Pay on the go ! `,
      },
      alerts,
      setAlerts
    );
  };

  return (
    <Layout>
      <div className="product-detail-wrapper">
        <div className="dd-container">
          <div className="row">
            <div className="col-7">
              <div className="product-detail__image h-100">
                <img src={offer?.offeringPhotoUrl} alt="Food Image" />
              </div>
            </div>
            <div className="col-5">
              <div className="product-detail__detail">
                <div className="product-detail__detail-name">
                  <h3 className="section-heading-2 section-heading-2-black">
                    {offer?.offeringName}
                  </h3>
                  <p className="section-tertiary-info dd-mt-14">
                    By {rest?.restaurantName}
                  </p>
                </div>
                <div className="product-detail__detail-options">
                  {/* <p className="section-tertiary-info dd-mt-8">
                    <span className="dd-mr-8">
                      <TickIcon />
                    </span>
                    05 Total Items
                  </p> */}
                  <p className="section-tertiary-info dd-mt-8">
                    <span className="dd-mr-8">
                      <TickIcon />
                    </span>
                    Salad Complimentary
                  </p>
                  <p className="section-tertiary-info dd-mt-8">
                    <span className="dd-mr-8">
                      <TickIcon />
                    </span>
                    Cold Drinks
                  </p>
                  <p className="section-tertiary-info dd-mt-8">
                    <span className="dd-mr-8">
                      <TickIcon />
                    </span>
                    2 Servings
                  </p>
                </div>
                <div className="product-detail__detail-price ">
                  <div className="row">
                    <div className="product-detail__detail-price-1 col-5">
                      <p className="section-tertiary-info dd-mb-4">Price</p>
                      <h3 className="section-heading-2 section-heading-2-black">
                        PKR {offer?.price}
                      </h3>
                    </div>
                    <div className="product-detail__detail-price-2 col-7">
                      <p className="section-tertiary-info dd-mb-6">
                        {offer?.offeringDescription}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="product-detail__detail-quantity">
                  <div className="product-detail__detail-quantity-status">
                    <p className="section-tertiary-info ">Quantity</p>
                    <p className="section-tertiary-info ">In Stock</p>
                  </div>
                  <QuantityPicker
                    min={0}
                    onChange={(value) => {
                      setQuantity(value);
                    }}
                  />
                </div>
                <div className="product-detail__detail-buy dd-mt-20 d-flex justify-content-center">
                  <PrimaryButton
                    content={"ADD TO CART"}
                    lessRounded
                    isOrange
                    isWide
                    onClick={addToCart}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
