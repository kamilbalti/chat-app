import React from "react"
import { useSelector, useDispatch } from "react-redux";
import { setCheckSetting, setDownloadingUrl, setEdit, setTempArr2, setTempCheck } from "../store/action";

const CloseSetting = () => {
    const dispatch = useDispatch() 
    const { checkSetting, edit } = useSelector((e) => e?.reducer1);
    const close = () => {
        checkSetting || edit?
        (
        dispatch(setCheckSetting(false)) &&
        dispatch(setEdit(false))
        ):
        dispatch(setDownloadingUrl("")) &&
        dispatch(setTempArr2([])) &&
        dispatch(setTempCheck(false))
      };
    return(
    <span className="closeSpan">
    <button className="closeSetting" onClick={() => close()}>
      X
    </button>
  </span>
)}
export default CloseSetting;