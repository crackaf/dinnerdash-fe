import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { signUp } from "../../api/auth";
import Layout from "../../components/Layout/Layout";
import { AlertContext } from "../../Contexts/AlertContext";
import { createAlert } from "../../helper";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    walletAmount: 0,
    phoneNumber: "",
  });
  const { alerts, setAlerts } = useContext(AlertContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password === formData.password2) {
        const response = await signUp(formData);
        createAlert(
          { type: "success", message: response.data.message },
          alerts,
          setAlerts
        );
        navigate("/login");
      } else {
        createAlert(
          { type: "danger", message: "Please enter correct passwords" },
          alerts,
          setAlerts
        );
      }
    } catch (error) {
      console.log(error.response.data.message);
      createAlert(
        { type: "danger", message: error.response.data.message },
        alerts,
        setAlerts
      );
    }
  };

  return (
    <div>
      <Layout>
        <section class="register-wrapper">
          <div class="container py-5 h-100">
            <div class="row d-flex align-items-center justify-content-center h-100">
              <div class="col-md-8 col-lg-7 col-xl-6">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                  class="img-fluid"
                  alt="Phone image"
                />
              </div>
              <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                <h3 className="section-heading section-heading-black dd-mb-40">
                  Sign Up
                </h3>
                <form onSubmit={handleSubmit}>
                  <div class="form-outline mb-4">
                    <input
                      type="email"
                      // id="form1Example13"
                      name="email"
                      class="form-control form-control-lg"
                      onChange={handleChange}
                      required
                    />
                    <label class="form-label" for="form1Example13">
                      Email address
                    </label>
                  </div>
                  <div class="form-outline mb-4">
                    <input
                      type="text"
                      // id="form1Example13"
                      class="form-control form-control-lg"
                      name="username"
                      onChange={handleChange}
                      required
                    />
                    <label class="form-label" for="form1Example13">
                      Username
                    </label>
                  </div>
                  <div class="form-outline mb-4">
                    <input
                      type="password"
                      // id="form1Example23"
                      class="form-control form-control-lg"
                      name="password"
                      onChange={handleChange}
                      required
                    />
                    <label class="form-label" for="form1Example23">
                      Password
                    </label>
                  </div>
                  <div class="form-outline mb-4">
                    <input
                      type="password"
                      // id="form1Example23"
                      class="form-control form-control-lg"
                      name="password2"
                      onChange={handleChange}
                      required
                    />
                    <label class="form-label" for="form1Example23">
                      Confirm Password
                    </label>
                  </div>
                  <div class="form-outline mb-4">
                    <input
                      type="number"
                      // id="form1Example23"
                      class="form-control form-control-lg"
                      name="walletAmount"
                      onChange={handleChange}
                      required
                    />
                    <label class="form-label" for="form1Example23">
                      Wallet Amount
                    </label>
                  </div>
                  <div class="form-outline mb-4">
                    <input
                      type="number"
                      // id="form1Example23"
                      class="form-control form-control-lg"
                      name="phoneNumber"
                      onChange={handleChange}
                      required
                    />
                    <label class="form-label" for="form1Example23">
                      Phone Number
                    </label>
                  </div>

                  <div class="d-flex justify-content-around align-items-center mb-4">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="form1Example3"
                        checked
                      />
                      <label class="form-check-label" for="form1Example3">
                        {" "}
                        Remember me{" "}
                      </label>
                    </div>
                    {/* <a href="#!">Forgot password?</a> */}
                  </div>

                  <button
                    type="submit"
                    class="btn btn-primary btn-lg d-flex justify-content-center"
                  >
                    Sign Up
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default SignUp;
