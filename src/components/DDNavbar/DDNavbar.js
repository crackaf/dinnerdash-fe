import React, { useState, useEffect, useRef } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Burger from "../../assets/images/burger.png";
import { AlertContext } from "../../Contexts/AlertContext";
import { useContext } from "react";
import { createAlert } from "../../helper";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Overlay from "react-bootstrap/Overlay";

import userImg from "../../assets/images/user.png";

import "./DDNavbar.scss";
import { getUser, getUserByID } from "../../api/customers";
import { useNavigate } from "react-router";

const DDNavbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [hasUser, setHasUser] = useState(false);
  const { alerts, setAlerts } = useContext(AlertContext);
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  useEffect(async () => {
    if (localStorage.getItem("profile")) {
      try {
        setHasUser(true);
        const response = await getUser();
        const responseData = await getUserByID(response?.data?.customerID);
        setUser({ ...response.data, ...responseData.data });
      } catch (error) {
        setHasUser(false);
        console.log("from navabr", error);
        createAlert(
          {
            type: "danger",
            message: error?.message,
          },
          alerts,
          setAlerts
        );
      }
    }
  }, []);

  const handleLogout = () => {
    if (localStorage.getItem("profile")) {
      localStorage.removeItem("profile");
      setHasUser(false);
    }
    navigate("/");
  };
  // console.log("user here", user);
  return (
    <div>
      {" "}
      {/* <header className="dd-container-nav"> */}
      <div className="dd-container-nav-wrapper">
        <header className="dd-container-nav">
          <Navbar expand="lg" className="dd-navbar">
            <Navbar.Brand href="/">
              <img src={Burger} alt="Burger" />
              Dinner Dash
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                {!hasUser && (
                  <>
                    <NavDropdown title="Register" id="basic-nav-dropdown">
                      <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                      <NavDropdown.Item href="/signup">
                        Sign Up
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                )}
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/restaurants">Restaurants</Nav.Link>
                <Nav.Link href="/cart">Cart</Nav.Link>
                {/* {user && (
                  <>
                    <Nav.Link href="/restaurant">My Orders</Nav.Link>
                  </>
                )} */}
              </Nav>
            </Navbar.Collapse>
            {hasUser && (
              <>
                <div ref={ref}>
                  <img
                    src={userImg}
                    onClick={handleClick}
                    className="user-img"
                  />

                  <Overlay
                    show={show}
                    target={target}
                    placement="bottom"
                    container={ref}
                    containerPadding={20}
                  >
                    <Popover id="popover-contained" className="dd-popover">
                      <Popover.Header as="h3">{user?.username}</Popover.Header>
                      <Popover.Body>
                        <p>
                          <strong>Email Address</strong> {user?.email} <br />
                        </p>
                        <p>
                          <strong>Phone Number</strong> <br />
                          {user?.phoneNumber}
                        </p>
                        <p>
                          <strong>Wallet Amount</strong> <br />
                          {user?.walletAmount}
                        </p>
                        <hr />
                        <Button variant="dark" onClick={handleLogout}>
                          Logout
                        </Button>
                      </Popover.Body>
                    </Popover>
                  </Overlay>
                </div>
              </>
            )}
          </Navbar>
        </header>{" "}
      </div>
    </div>
  );
};

export default DDNavbar;
