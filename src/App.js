import React, { useState, useEffect } from "react";
import "./App.css";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import LeftPart from "./leftpartFolder/leftpart";
import RightPart from "./rightpartFolder/rightPart";

const App = () => {

  return (
    <div className="mainDiv">
      <LeftPart />
      <RightPart />
     </div>
  );
};

export default App;