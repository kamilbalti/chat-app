import React, { useState, useEffect } from "react";
import "./App.css";
// import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import LeftPart from "./leftpartFolder/leftpart";
// import RightPart from "./rightpartFolder/rightPart";
// import StartingPage from './startingPage';
import CombiningPart from "./combiningpart";

const App = () => {
  const [ num, setNum ] = useState(0)

  return (
    <CombiningPart num={num} setNum={setNum}/>
    // <div className="mainDiv">
    //   {
    //   num === 100 ?
    //   <StartingPage num={num} setNum={setNum}/> :
    //   <>
    //     <LeftPart />
    //     <RightPart />
    //   </>
    //   }
    //  </div>
  );
};

export default App;