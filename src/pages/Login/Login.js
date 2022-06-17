import React, { useContext } from "react";
import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { AlertContext } from "../../Contexts/AlertContext";
import { createAlert } from "../../helper";
import { signIn } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { alerts, setAlerts } = useContext(AlertContext);
  // const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn(formData);
      createAlert(
        { type: "success", message: `Welcome, ${response.data.username} !` },
        alerts,
        setAlerts
      );
      localStorage.setItem(
        "profile",
        JSON.stringify(response.data.accessToken)
      );
      const userGotten = {
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
        roles: response.data.roles,
        tokenType: "Bearer",
      };
      // setUser(userGotten);
      navigate("/");
    } catch (error) {
      console.log(error);
      createAlert(
        {
          type: "danger",
          message:
            "Invalid Credentials. Please check your username and/or password",
        },
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
                  Login
                </h3>
                <form onSubmit={handleSubmit}>
                  <div class="form-outline mb-4">
                    <input
                      type="text"
                      id="form1Example13"
                      name="username"
                      class="form-control form-control-lg"
                      onChange={handleChange}
                    />
                    <label class="form-label" for="form1Example13">
                      Username
                    </label>
                  </div>

                  <div class="form-outline mb-4">
                    <input
                      type="password"
                      id="form1Example23"
                      class="form-control form-control-lg"
                      name="password"
                      onChange={handleChange}
                    />
                    <label class="form-label" for="form1Example23">
                      Password
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
                    Sign in
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

export default Login;
