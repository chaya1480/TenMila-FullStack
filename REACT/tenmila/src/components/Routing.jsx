import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import PersonalArea from "./PersonalArea";
import Test from "./Test";
import EndPage from "./EndPage";
import Register from "./Register";
import { Home } from "./Home";


const Routing = () => {
  return (
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/personal-area" element={<PersonalArea />} />
        <Route path="/test" element={<Test />} />
        <Route path="/finish" element={<EndPage />} />
        </Routes>
  );
};

export default Routing;
