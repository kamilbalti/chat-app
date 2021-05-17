import React from "react";
import "../App.css";
// import firebase from "../firebase";
import { useDispatch, useSelector } from "react-redux";
// import {
//   setInput1,
// } from "../store/action";
import Navbar2 from "./navbar2";
import Result from "./result";
import Button from "./buttons";
import CloseSetting from "./closeSetting";
import { setSendPicture } from "../store/action";
// import Adsense from "./adsense";

const RightPart = () => {
  const dispatch = useDispatch()
  const { focus, downloadingUrl, tempArr2, user } = useSelector((e) => e?.reducer1);

  const send = () => {
    dispatch(setSendPicture(true))
    // dispatch(setDownloadingUrl(""))
  }

  return (
    <div className="mainDiv">
      {/* {user?
      <Adsense /> :
      false} */}
      <span className={(focus ? "rightPart3 " : " ") + " rightPart "}>
        <Navbar2 />
        <span className="paraDiv">
          {

          tempArr2 !== [] && downloadingUrl !== "" ?
          <div className="bgGray">
            <span className="closeSpan">
              <CloseSetting />
            </span>
            <img className="sendingPic pic2" src={downloadingUrl}/>
            <input className="input1 input2" placeholder="About Photo"/>
            <span className="miniImage">
              {
              tempArr2?.map((item, index) => (
                  <img className="pic2 pic3" src={item?.pictureUrl} />
              ))
              }
              <Button />
            </span>
            <span className="button2">
              <button className="buttons button3" onClick={() => send()}>Send</button>
            </span>
          </div>
          :
          <>
          <Result />
          <Button />
          </>
          }
        </span>
      </span>
    </div>
  );
};

export default RightPart;
