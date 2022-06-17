import React from "react";
import Burger from "../../assets/images/burger.png";

import "./Footer.scss";

const Footer = () => {
  return (
    <div>
      <footer class="footer">
        <div className="dd-container">
          <div class="footer__logo-box d-flex align-items-center justify-content-center">
            <h1 className=" text-center first-section-heading-2 section-heading-2 section-heading-2-white">
              Dinner Dash
            </h1>
            <img src={Burger} alt="Burger" className="dd-ml-20" />
          </div>
          <div class="row">
            <div class="col-6">
              <div class="footer__navigation">
                <ul class="footer__list">
                  <li class="footer__item">
                    <a href="#" class="footer__link">
                      Company
                    </a>
                  </li>
                  <li class="footer__item">
                    <a href="#" class="footer__link">
                      Contact us
                    </a>
                  </li>
                  <li class="footer__item">
                    <a href="#" class="footer__link">
                      Carrers
                    </a>
                  </li>
                  <li class="footer__item">
                    <a href="#" class="footer__link">
                      Privacy policy
                    </a>
                  </li>
                  <li class="footer__item">
                    <a href="#" class="footer__link">
                      Terms
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-6">
              <p class="footer__copyright">
                Built by{" "}
                <a href="#" class="footer__link">
                  Faiq Rauf
                </a>{" "}
                Adanced Programming course{" "}
                <a href="#" class="footer__link">
                  Advanced CSS and Sass
                </a>
                . Copyright &copy; by Faiq. You are 100% allowed to use this
                webpage for both personal and commercial use, but NOT to claim
                it as your own design. Built with lots of love
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
