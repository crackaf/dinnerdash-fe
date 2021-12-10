import React from "react";
import { Route, Routes } from "react-router-dom";
import Test from "./components/Test";
import Test0 from "./components/Test0";

const App = () => {
  return (
    <Routes>
      <Route exact path="/test0" element={<Test0 />}></Route>
      <Route exact path="/" element={<Test />}></Route>
    </Routes>
  );
};

export default App;
