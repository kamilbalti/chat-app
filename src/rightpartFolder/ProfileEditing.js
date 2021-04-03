import React, { useEffect, useState } from "react"
import { setCheckSetting, setDetail, setEdit, setFocus, setUser } from "../store/action";
import { useSelector, useDispatch } from "react-redux";

const ProfileEditing = () => {

  const [password2, setPassword2] = useState("");
  const [email2, setEmail2] = useState("");
  const [userName2, setUserName2] = useState("");
  const dispatch = useDispatch()

    const { focus, typingUsers, userArr, user, detail, checkSetting, edit } = useSelector((e) => e?.reducer1);
    const save = () => {
        let detail2 = detail;
        detail2.details.username = userName2;
        dispatch(setDetail(detail2));
        dispatch(setEdit(false));
        dispatch(setCheckSetting(false));
    };

  return(
    <span className="labelPara">
        <span className="changeUserSpan">
          <p className="changeUser">UserName :</p>
          <input className="changeInputUser" placeholder="User Name" value={userName2} 
          onChange={(e) => setUserName2(e.target.value)} />
        </span>
        <input type="file" />
        <button onClick={() => save()} className="button">
          Save
        </button>
      </span>
)};
export default ProfileEditing;