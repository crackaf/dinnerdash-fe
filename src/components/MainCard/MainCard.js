import React from "react";
import "./MainCard.scss";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import Nat1 from "../../assets/images/nat-1.jpg";
import { useNavigate } from "react-router-dom";

const themeHash = {
  blue: "card__side--back-3",
  green: "card__side--back-2",
  red: "card__side--back-2",
};

const MainCard = ({ name, bannerURL, theme, restId }) => {
  const navigate = useNavigate();
  return (
    <div>
      {" "}
      <div class="card">
        <div class="card__side card__side--front">
          <div class="card__picture card__picture--1">
            <img src={bannerURL} alt="hotelImage" />
          </div>
          <h4 class="card__heading">
            <span class="card__heading-span card__heading-span--1">
              {name && name}
            </span>
          </h4>
          <div class="card__details">
            <ul>
              <li>Burgers</li>
              <li>Steaks</li>
              <li>Loaded Fries</li>
              <li>Continental</li>
              <li>Perfect Ambience</li>
            </ul>
          </div>
        </div>
        <div class={`card__side card__side--back ${themeHash[theme]}`}>
          <div class="card__cta">
            <div class="card__price-box">
              <p class="card__price-value">Check Me Out </p>
              <p class="card__price-value dd-mt-60"> 😋 </p>
            </div>
            <PrimaryButton
              content="VISIT NOW"
              onClick={() => navigate(`/restaurant/${restId}`)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCard;
