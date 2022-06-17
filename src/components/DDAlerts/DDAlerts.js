import React from "react";
import { useContext } from "react";
import { AlertContext } from "../../Contexts/AlertContext";
import Alert from "react-bootstrap/Alert";

const DDAlerts = () => {
  const { alerts, setAlerts } = useContext(AlertContext);

  return (
    <div className="d-flex justify-content-center">
      <div className="dd-container dd-alert">
        {/* alerts here */}
        {/* {console.log(alerts)} */}
        {alerts &&
          alerts.length > 0 &&
          alerts.map((item, index) => {
            return (
              <Alert variant={JSON.parse(item).type}>
                {/* {console.log(JSON.parse(item))} */}
                <Alert.Heading>
                  {JSON.parse(item).type === "danger"
                    ? "Oh Snap, Error"
                    : "Success"}
                </Alert.Heading>
                <p>{JSON.parse(item).message}</p>
              </Alert>
            );
          })}
      </div>
    </div>
  );
};

export default DDAlerts;
