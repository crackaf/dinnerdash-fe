import { v4 as uuid } from "uuid";

export const createAlert = (alert, alerts, setAlerts) => {
  const id = uuid();
  const newAlert = { ...alert, id: id };
  setAlerts([...alerts, JSON.stringify(newAlert)]);
  //   console.log("in now", alerts);
  setTimeout(() => {
    const newAllerts = alerts.filter((a) => a.id != id);
    setAlerts(newAllerts);
    // console.log("out now", alerts);
  }, 5000);
};
