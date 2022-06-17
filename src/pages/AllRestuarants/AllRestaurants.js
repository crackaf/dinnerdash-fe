import React from "react";
import Layout from "../../components/Layout/Layout";
import AllRestaurantsIMG from "../../assets/images/allHotels.png";
import "./AllRestaurants.scss";
import Arrow from "../../assets/images/arrow.png";
import YellowStar from "../../assets/images/yellow-star.png";
import MainCard from "../../components/MainCard/MainCard";
import { useEffect } from "react";
import { getAllRestaurants } from "../../api/restaurant";
import { useState } from "react";
import DDPagination from "../../components/DDPagination/DDPagination";
import { useContext } from "react";
import { AlertContext } from "../../Contexts/AlertContext";
import { createAlert } from "../../helper";

const AllRestaurants = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [restaurants, setRestaurants] = useState([]);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const { alerts, setAlerts } = useContext(AlertContext);

  useEffect(async () => {
    try {
      const res = await getAllRestaurants();
      setData(res.data);
    } catch (error) {
      console.log(error.message);
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
    const currentPosts = data?.slice(indexOfFirstRest, indexOfLastRest);
    setRestaurants(currentPosts);
  }, [data]);
  const paginate = (item) => setCurrentPage(item);
  return (
    <Layout>
      <section className="all-restaurants-intro w-100">
        <div className="dd-container">
          <div className="row w-100">
            <div className="col-6 d-flex flex-column justify-content-center align-items-start">
              <div className="d-flex align-items-center">
                <div className="box-1">
                  <h1>Best</h1>
                </div>
                <div className="box-2">
                  <div className="d-flex flex-column">
                    <h3>
                      Food at <br />
                      your doorsteps
                    </h3>
                    <img src={Arrow} alt="Arrow " />
                  </div>
                </div>
              </div>
              <p className="section-info section-info-gray">
                {" "}
                Browse through our amazing list of restaurants and search
                through their offerings
              </p>
              <div className="all-restaurants-stars dd-mt-50">
                <p className="section-secondary-info ">
                  {" "}
                  Upto 5 star restaurants'
                  <br />
                  offerings available
                </p>
                <img src={YellowStar} alt="" />
                <img src={YellowStar} alt="" />
                <img src={YellowStar} alt="" />
                <img src={YellowStar} alt="" />
                <img src={YellowStar} alt="" />
              </div>
            </div>
            <div className="col-6">
              <img src={AllRestaurantsIMG} alt="All restaurants" />
            </div>
          </div>
        </div>
      </section>
      <section className="all-restaurants-list text-center dd-py-40">
        <div className="dd-container">
          <h1 className="section-heading section-heading-black dd-mb-60">
            All Restaurants Available
          </h1>
          <div className="row row-grid">
            {restaurants?.map((rest, index) => {
              return (
                <div className="col-4">
                  <MainCard
                    restId={rest.restaurantId}
                    name={rest.restaurantName}
                    bannerURL={rest.bannerUrl}
                    theme={rest.colorTheme}
                  />
                </div>
              );
            })}
          </div>
          <div className="d-flex justify-content-center dd-my-40">
            <DDPagination
              postsPerPage={postsPerPage}
              totalPosts={data.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AllRestaurants;
