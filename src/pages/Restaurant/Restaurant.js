import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import Banner from "../../assets/images/3270.jpg";
import YellowStar from "../../assets/images/yellow-star.png";
import "./Restaurant.scss";
import ProductCard from "../../components/ProductCard/ProductCard";
import foodIMG from "../../assets/images/food.png";
import foodIMG2 from "../../assets/images/food-2.png";
import foodIMG3 from "../../assets/images/food-3.png";
import foodIMG4 from "../../assets/images/food-4.png";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import QuoteIMG from "../../assets/images/quote.png";
import RestaurantOwner from "../../assets/images/restaurant-owner.png";
import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";
import { AlertContext } from "../../Contexts/AlertContext";
import { useContext } from "react";
import { createAlert } from "../../helper";
import { getCurrentRestaurant } from "../../api/restaurant";
import { getAllOfferings } from "../../api/Offerings";
import DDPagination from "../../components/DDPagination/DDPagination";

const Restaurant = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [offeringsData, setOfferingsData] = useState([]);
  const [offerings, setOfferings] = useState([]);

  const { alerts, setAlerts } = useContext(AlertContext);
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [restaurants, setRestaurants] = useState([]);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const paginate = (item) => setCurrentPage(item);

  useEffect(async () => {
    try {
      const restData = await getCurrentRestaurant(id);
      console.log(restData.data);
      setRestaurant(restData.data);
      const offeringData = await getAllOfferings(id);
      setOfferingsData(offeringData.data);
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

  useEffect(() => {
    const indexOfLastRest = currentPage * postsPerPage;
    const indexOfFirstRest = indexOfLastRest - postsPerPage;
    const currentPosts = offeringsData?.slice(
      indexOfFirstRest,
      indexOfLastRest
    );
    setOfferings(currentPosts);
  }, [offeringsData]);
  return (
    <Layout>
      <section className="restaurant-cover">
        <div className="restaurant-cover-banner">
          <img src={restaurant?.bannerUrl} alt="Banner IMG" />
        </div>
        <div className="restaurant-cover-content">
          <div className="dd-container ">
            <h1 className="section-heading section-heading-white">
              {restaurant?.restaurantName}
            </h1>
            <h3 className="section-info section-info-white">
              By Adrian Del Rey
            </h3>
          </div>
        </div>
      </section>
      <section className="restaurant-dishes">
        <div className="dd-container">
          <h4 className="section-info section-info-gray text-center">
            Try Now
          </h4>
          <h1 className="section-heading-2 section-heading-2-black text-center dd-mb-30">
            Everything Scrumptious
          </h1>

          <div className="restaurant-dishes-tabs">
            <div className="row row-grid">
              {offerings?.map((item, index) => {
                return (
                  <div className="col-3">
                    <ProductCard
                      productImg={item.offeringPhotoUrl}
                      id={item.offeringId}
                      name={item.offeringName}
                      price={item.price}
                      restId={id}
                    />
                  </div>
                );
              })}
              {/* <div className="col-3">
                <ProductCard productImg={foodIMG2} />
              </div>
              <div className="col-3">
                <ProductCard productImg={foodIMG3} />
              </div>
              <div className="col-3">
                <ProductCard productImg={foodIMG4} />
              </div>
              <div className="col-3">
                <ProductCard productImg={foodIMG} />
              </div>
              <div className="col-3">
                <ProductCard productImg={foodIMG2} />
              </div>
              <div className="col-3">
                <ProductCard productImg={foodIMG3} />
              </div>
              <div className="col-3">
                <ProductCard productImg={foodIMG4} />
              </div> */}
            </div>
            <div className="d-flex justify-content-center dd-my-40">
              <DDPagination
                postsPerPage={postsPerPage}
                totalPosts={offeringsData.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="restaurant-owner-quote">
        <div className="dd-container">
          <img
            src={QuoteIMG}
            alt="Quote Image"
            className="restaurant-owner-quote__quote"
          />
          <h1 className="section-heading-2 section-heading-2-light section-heading-2-black text-center">
            Food for us comes from our relatives, whether they have wings or
            fins or roots. That is how we consider food. Food has a culture. It
            has a history. It has a story. It has relationships
          </h1>
          <div className="restaurant-owner-quote__owner d-flex align-items-center justify-content-center">
            <img src={RestaurantOwner} alt="" />
            <div className="d-flex dd-ml-22 flex-column">
              <p className="section-secondary-info section-secondary-info-black dd-mb-8">
                Camella Sarrah
              </p>
              <p className="section-secondary-info section-secondary-info-gray dd-mb-2">
                Owner
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Restaurant;
