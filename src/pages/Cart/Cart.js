import React from "react";
import Layout from "../../components/Layout/Layout";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import "./Cart.scss";
import foodIMG from "../../assets/images/food.png";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { TickIcon } from "../../assets/SVG/SVG";
import { useState } from "react";
import { getOffering } from "../../api/Offerings";
import { useEffect } from "react";
import { createAlert } from "../../helper";
import { AlertContext } from "../../Contexts/AlertContext";
import { useContext } from "react";
import { getUser, removeMoney } from "../../api/customers";
import { getAllOrdersOfUser, makeOrder } from "../../api/orders";
import { useNavigate } from "react-router";

const Cart = () => {
  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);

  const [userCart, setUserCart] = useState([]);
  const [totalPayable, setTotalPayable] = useState(-1);
  const { alerts, setAlerts } = useContext(AlertContext);
  const [previousOrders, setPreviousOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(async () => {
    if (localStorage.getItem("cart")) {
      const userCartLS = JSON.parse(localStorage.getItem("cart"));
      console.log("user LS", userCartLS);
      userCartLS.forEach(async (element) => {
        try {
          const response = await getOffering(element.restId, element.itemId);
          console.log("resp", response.data);

          const userCartItem = { ...response.data, quantity: element.quantity };
          setData(userCartItem);
        } catch (error) {
          createAlert(
            {
              type: "danger",
              message: error,
            },
            alerts,
            setAlerts
          );
        }
      });
    }
    console.log("here");
    const loggedInUser = await getUser();
    const response2 = await getAllOrdersOfUser(loggedInUser?.data?.customerID);
    setData2(response2.data);
  }, []);
  // useEffect(() => {}, [previousOrders]);

  // useEffect(() => {
  //   let newResp = [];
  //   //  console.log(daat2.data);
  //   data2?.forEach((element) => {
  //     let newitems = [];
  //     element?.items.forEach(async (offering) => {
  //       const responseOff = await getOffering(
  //         element?.order.restaurantId,
  //         offering?.offeringId
  //       );
  //       // console.log(responseOff);
  //       newitems.push({
  //         ...offering,
  //         image: responseOff?.data?.offeringPhotoUrl,
  //       });
  //     });
  //     const newData = {
  //       order: element?.order,
  //       items: newitems,
  //     };
  //     newResp.push(newData);
  //   });
  //   setPreviousOrders(newResp);
  // }, [data2]);

  useEffect(() => {
    if (data) {
      setUserCart([...userCart, data]);
    }
  }, [data]);

  useEffect(() => {
    if (data2) {
      setPreviousOrders(data2);
    }
  }, [data2]);

  useEffect(() => {
    var total = 0;
    userCart.forEach((element) => {
      total = total + element?.quantity * element?.price;
    });
    setTotalPayable(total);
  }, [userCart]);
  console.log("prev data = ", previousOrders);

  const removeOfferingFromCart = (restId, id) => {
    try {
      var cartArr = JSON.parse(localStorage.getItem("cart"));
      const newarr = cartArr.filter(
        (item) => item.itemId != id || item.restId != restId
      );
      localStorage.setItem("cart", JSON.stringify(newarr));
      const newStateArr = userCart.filter(
        (item) => item.offeringId != id || item.restaurantId != restId
      );
      setUserCart(newStateArr);
      createAlert(
        {
          type: "success",
          message: "Item successfuly removed from cart",
        },
        alerts,
        setAlerts
      );
    } catch (error) {
      createAlert(
        {
          type: "danger",
          message: error,
        },
        alerts,
        setAlerts
      );
    }
  };

  // useEffect(() => {}, [previousOrders]);

  const itemsM = previousOrders.map((item, index) => {
    console.log(item);
    // const restId = userCart[0]?.restaurantId;

    return (
      <>
        {item.items.map((offering, index) => {
          // const imageResponse = await getOffering(restId, offering.offeringId);
          // console.log(imageResponse);
          return (
            <>
              {/* <h2>{offering.quantity}</h2> */}
              <div className="cart-payment__order">
                <div className="cart-payment__order-name d-flex align-items-center">
                  <img src={foodIMG} alt="Food Image" className="dd-mr-20" />
                  <div className="d-flex flex-column justify-content-between">
                    <h4 className="section-heading-tertiary section-heading-tertiary-black">
                      Dish ID {offering.offeringId}
                    </h4>
                    <p className="section-tertiary-info dd-mt-14"></p>
                    <p className="section-tertiary-info dd-mt-14">
                      Time : {item.order.orderTime}
                    </p>
                  </div>
                </div>
                <div className="cart-payment__order-details d-flex align-items-center">
                  <h4 className="section-heading-tertiary section-heading-tertiary-black dd-mr-24 mb-0">
                    PKR {offering.price}
                  </h4>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  });

  console.log("uu", itemsM);
  const handleConfirmOrder = async () => {
    if (localStorage.getItem("profile")) {
      const loggedInUser = await getUser();
      if (loggedInUser?.data?.walletAmount >= totalPayable + 25) {
        try {
          await removeMoney(totalPayable + 25);
          const restId = userCart[0]?.restaurantId;
          const offerItems = [];
          userCart?.forEach((item) => {
            var data = {
              offeringId: item?.offeringId,
              quantity: item?.quantity,
              price: item?.price,
            };
            offerItems.push(data);
          });
          const orderData = {
            order: {
              restaurantId: restId,
              paymentMethod: "Wallet",
              orderStatus: "Pending",
            },
            items: offerItems,
          };
          const resp = await makeOrder(orderData);
          // console.log("resppppp", resp);
          localStorage.removeItem("cart");
          createAlert(
            {
              type: "success",
              message:
                "Order successfully dispatched. Thank You for using Dinner Dash",
            },
            alerts,
            setAlerts
          );
          navigate("/restaurants");
        } catch (error) {
          createAlert(
            {
              type: "danger",
              message: error?.data,
            },
            alerts,
            setAlerts
          );
        }
      } else {
        createAlert(
          {
            type: "danger",
            message: `You dont have enouth balance in your account`,
          },
          alerts,
          setAlerts
        );
      }
    } else {
      createAlert(
        {
          type: "danger",
          message: `You need to be logged in before you buy anything. Please Login `,
        },
        alerts,
        setAlerts
      );
    }
  };

  console.log("user cart ", userCart);
  return (
    <Layout>
      <div className="cart-wrapper">
        <div className="dd-container">
          <div className="row">
            <div className="col-8">
              <div className="cart-payment">
                <Tabs
                  defaultActiveKey="items"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  <Tab eventKey="items" title="Items">
                    <h3 className="section-heading-secondary section-heading-2-black">
                      Items Cart
                    </h3>
                    <div className="cart-payment__orders">
                      {data &&
                        userCart?.map((item, index) => {
                          return (
                            <div className="cart-payment__order">
                              <div className="cart-payment__order-name d-flex align-items-center">
                                <img
                                  src={item?.offeringPhotoUrl}
                                  alt="Food Image"
                                  className="dd-mr-20"
                                />
                                <div className="d-flex flex-column justify-content-between">
                                  <h4 className="section-heading-tertiary section-heading-tertiary-black">
                                    {item?.offeringName}
                                  </h4>
                                  <p className="section-tertiary-info dd-mt-14">
                                    Quantity : {item?.quantity}
                                  </p>
                                </div>
                              </div>
                              <div className="cart-payment__order-details d-flex align-items-center">
                                <h4 className="section-heading-tertiary section-heading-tertiary-black dd-mr-24 mb-0">
                                  PKR {item?.price}
                                </h4>
                                <PrimaryButton
                                  content={"Remove"}
                                  isOrange
                                  lessRounded
                                  onClick={() =>
                                    removeOfferingFromCart(
                                      item.restaurantId,
                                      item.offeringId
                                    )
                                  }
                                />
                              </div>
                            </div>
                          );
                        })}
                      {/* 
                      <div className="cart-payment__order">
                        <div className="cart-payment__order-name d-flex align-items-center">
                          <img
                            src={foodIMG}
                            alt="Food Image"
                            className="dd-mr-20"
                          />
                          <div className="d-flex flex-column justify-content-between">
                            <h4 className="section-heading-tertiary section-heading-tertiary-black">
                              Pasta
                            </h4>
                            <p className="section-tertiary-info dd-mt-14">
                              By Restaurant Sea Explorer
                            </p>
                          </div>
                        </div>
                        <div className="cart-payment__order-details d-flex align-items-center">
                          <h4 className="section-heading-tertiary section-heading-tertiary-black dd-mr-24 mb-0">
                            PKR 1500
                          </h4>
                          <PrimaryButton
                            content={"Remove"}
                            isOrange
                            lessRounded
                          />
                        </div>
                      </div> */}
                    </div>
                  </Tab>
                  <Tab eventKey="prev" title="Previous Orders">
                    <h3 className="section-heading-secondary section-heading-2-black">
                      Previous Orders
                    </h3>
                    <div className="cart-payment__orders">
                      {itemsM}
                      {/* <div className="cart-payment__order">
                        <div className="cart-payment__order-name d-flex align-items-center">
                          <img
                            src={foodIMG}
                            alt="Food Image"
                            className="dd-mr-20"
                          />
                          <div className="d-flex flex-column justify-content-between">
                            <h4 className="section-heading-tertiary section-heading-tertiary-black">
                              Pasta
                            </h4>
                            <p className="section-tertiary-info dd-mt-14">
                              By Restaurant Sea Explorer
                            </p>
                            <p className="section-tertiary-info dd-mt-14">
                              Date : 11 May, 2020
                            </p>
                          </div>
                        </div>
                        <div className="cart-payment__order-details d-flex align-items-center">
                          <h4 className="section-heading-tertiary section-heading-tertiary-black dd-mr-24 mb-0">
                            PKR 1500
                          </h4>
                        </div>
                      </div> */}
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>
            <div className="col-4">
              <div className="cart-summary">
                <div className="product-detail__detail">
                  <div className="product-detail__detail-name">
                    <h3 className="section-heading-2 section-heading-2-black">
                      Order Summary
                    </h3>
                    <p className="section-tertiary-info dd-mt-14">
                      All your orders are summarized here
                    </p>
                  </div>
                  <div className="product-detail__detail-options">
                    <div className="d-flex justify-content-between">
                      <p className="section-tertiary-info dd-mt-8">Sub Total</p>
                      <p className="section-tertiary-info dd-mt-8">
                        PKR {totalPayable && totalPayable}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="section-tertiary-info dd-mt-8">GST Taxes</p>
                      <p className="section-tertiary-info dd-mt-8">10%</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="section-tertiary-info dd-mt-8">
                        Processing{" "}
                      </p>
                      <p className="section-tertiary-info dd-mt-8">PKR 25</p>
                    </div>
                  </div>
                  <div className="product-detail__detail-price ">
                    <div className="d-flex justify-content-between">
                      <h3 className="section-heading-tertiary section-heading-tertiary-black">
                        Total
                      </h3>
                      <h3 className="section-heading-tertiary section-heading-tertiary-black">
                        PKR {totalPayable > 0 ? totalPayable + 25 : 0}
                      </h3>
                    </div>
                    <p className="section-tertiary-info dd-mt-8">
                      Note : GST applied are relative to the place where you
                      live and ordered from
                    </p>
                  </div>

                  <div className="product-detail__detail-buy dd-mt-20 d-flex justify-content-center">
                    <PrimaryButton
                      content={"COMFIRM ORDER"}
                      lessRounded
                      isOrange
                      isWide
                      onClick={handleConfirmOrder}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
