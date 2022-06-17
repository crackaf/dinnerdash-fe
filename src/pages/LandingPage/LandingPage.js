import React from "react";
import Layout from "../../components/Layout/Layout";
import HotelAtNight2 from "../../../src/assets/images/6413870.jpg";
import "./LandingPage.scss";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import ProductCard from "../../components/ProductCard/ProductCard";
import foodIMG from "../../assets/images/food.png";
import foodIMG2 from "../../assets/images/food-2.png";
import foodIMG3 from "../../assets/images/food-3.png";
import foodIMG4 from "../../assets/images/food-4.png";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Burger from "../../assets/images/burger.png";

const LandingPage = () => {
  return (
    <>
      <Layout>
        <div className="landing-page">
          <div className="first-section">
            <div className="dd-container">
              <div className="row">
                <div className="col-6">
                  <h1 className="first-section-heading section-heading">
                    Dinner Dash
                  </h1>
                  <h2 className="section-info dd-mt-20 dd-mb-50">
                    Get the best food at the best available proce from the best
                    available place near you.
                    <span className="text-color-green"> All online!</span>
                  </h2>
                  <PrimaryButton content="EXPLORE MORE" isGreen />
                </div>

                <div className="col-6">
                  <img src={HotelAtNight2} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="restaurant-dishes-tabs dd-my-50">
          <h1 className=" text-center first-section-heading-2 section-heading-2 section-heading-2-black">
            Best Dishes For You
          </h1>
          <div className="dd-container">
            <Tabs defaultActiveKey="continental">
              <Tab eventKey="continental" title="Continental">
                <div className="row row row-grid">
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
                  </div>
                </div>
              </Tab>
              <Tab eventKey="pakistani" title="Pakistani">
                <div className="row row-grid">
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
                  </div>
                </div>
              </Tab>
              <Tab eventKey="steaks" title="Steaks">
                <div className="row row-grid">
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
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default LandingPage;
