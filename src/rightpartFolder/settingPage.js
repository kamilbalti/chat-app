import { useSelector, useDispatch } from "react-redux";
import { setCheckSetting, setDetail, setEdit } from "../store/action";

const Setting = () => {

  const dispatch = useDispatch()
  
  const save = () => {
    // let detail2 = detail;
    // detail2.details.username = userName2;
    // detail2.details.password = password2;
    // detail2.details.email = email2;
    // dispatch(setDetail(detail2));
    dispatch(setEdit(false));
    dispatch(setCheckSetting(false));
  };

  const editCheck = () => {
  dispatch(setEdit(true));
  dispatch(setCheckSetting(false));
  };
  return(
    <span className="labelPara">
        <p className="settingOpt" onClick={() => editCheck()}>Edit profile</p>
        <button onClick={() => save()} className="button"> Save </button>
    </span>
)}
export default Setting