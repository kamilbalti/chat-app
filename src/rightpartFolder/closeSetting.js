import React from "react"
import { useSelector, useDispatch } from "react-redux";
import { setCheckSetting, setEdit } from "../store/action";

const CloseSetting = () => {
    const dispatch = useDispatch()
    const close = () => {
        dispatch(setCheckSetting(false));
        dispatch(setEdit(false));
      };
    return(
    <span className="closeSpan">
    <button className="closeSetting" onClick={() => close()}>
      X
    </button>
  </span>
)}
export default CloseSetting;