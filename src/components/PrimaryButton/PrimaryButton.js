import React from "react";
import "./PrimaryButton.scss";

const PrimaryButton = ({
  content,
  onClick,
  href,
  isGreen,
  lessRounded,
  isOrange,
  isWide,
}) => {
  return (
    <button
      onClick={onClick}
      className={`primary-btn ${isGreen && "btn-green"} ${
        isOrange && "btn-orange"
      } ${lessRounded && "btn-lessRounded"} ${isWide && "btn-wide"}`}
    >
      {content && content}
    </button>
  );
};

export default PrimaryButton;
