import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navbar1 from "../leftpartFolder/navbar1";
import Input from "../leftpartFolder/input";
import SpinnerFunction from "./Spinner";
import Detail from "../leftpartFolder/Detail";

const LeftPart = () => {
  const { focus } = useSelector((e) => e?.reducer1);
  const [temp, setTemp] = useState(true);
    
  setTimeout(() => setTemp(false), 1000);

  return (
      <span className={(focus ? "leftPart3 " : " ") + ` leftPart`}>
        {!temp ? (
          <>
            <Navbar1 />
            <Input />
            <Detail />
          </>
        ) : (
          <SpinnerFunction />
          )}
      </span>
    )}

export default LeftPart;