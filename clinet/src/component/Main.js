import React from "react";
// import { useNavigate } from "react-router-dom";
import "../css/Main.css";
import Cam from "./Cam";

const Main = () => {
  return (
    <div className="main_total">
      <div className="main_container_1">
        <div className="main_Box_1">
          <Cam />
        </div>
      </div>
      <div className="main_container_2">
        <div className="main_Box_2">
          <Cam />
        </div>
        <div className="main_Box_2">
          <Cam />
        </div>
      </div>
    </div>
  );
};

export default Main;
