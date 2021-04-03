import settingPic from "../setting.jpg"
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { setCheckSetting, setDetail, setEdit, setFocus, setUser } from "../store/action";
import firebase from "../firebase";
import CloseSetting from "./closeSetting";
import Setting from "./settingPage";
import ProfileEditing from "./ProfileEditing";

const Navbar2 = () => {
    const [userName2, setUserName2] = useState("");
    // const [edit, setEdit] = useState(false);
    // const [checkSetting, setCheckSetting] = useState(false);
    const { focus, typingUsers, userArr, user, detail, checkSetting, edit } = useSelector((e) => e?.reducer1);
    const focusedUser = userArr?.find((item3) => item3?.details?.uid === focus);
    const uid = user?.uid;
    const dispatch = useDispatch()    
    const back = () => {
        dispatch(setFocus(false));
    };
    const logOut = () => {
        let tempUid = uid;
        firebase
          .auth()
          .signOut()
          .then(() => {
            firebase
              .database()
              .ref("Users/" + tempUid)
              .update({
                onlineStatus: Date.now()-16000,
              });
            dispatch(setUser(false));
          });
      }; 
      
      // const editCheck = () => {
      //   dispatch(setEdit(true));
      //   dispatch(setCheckSetting(false));
      // };
    
      // const save = () => {
      //   let detail2 = detail;
      //   detail2.details.username = userName2;
      //   detail2.details.password = password2;
      //   detail2.details.email = email2;
      //   dispatch(setDetail(detail2));
      //   dispatch(setEdit(false));
      //   dispatch(setCheckSetting(false));
      // };

      
      // const close = () => {
      //   setCheckSetting(false);
      //   setEdit(false);
      // };

      const setting = () => {
        dispatch(setCheckSetting(true));
        setUserName2(detail?.details?.username);
      };

    return(
        <>
    <span className="buttonSpan">
      <button onClick={() => back()} className="back">
          Back
      </button>
    {focus && focus !== "loading" ? (
        <img className="profilePic" src={focusedUser?.details?.profilePhoto} width="55px" height="55px" alt={"profile-pic"} />
        ) : (
            false
  )}
  <span className={ Array.isArray(typingUsers) && typingUsers?.indexOf( [focusedUser?.details?.uid, uid].sort().join(""))
  !== -1 && typingUsers? "userPara3" : "userPara userPara2"}>
    <p className="profileName">{focusedUser?.details?.username}</p>
    {Array.isArray(typingUsers) && typingUsers?.indexOf( [focusedUser?.details?.uid, uid].sort().join("")) !== -1 && 
    <p className="typingPara ">Typing...</p>}
    <p className="typingPara"> {Date.now() < focusedUser?.onlineStatus + 15000 ? "Online" : ""} </p>
  </span>
  <button className="button" onClick={() => logOut()}>
    Sign Out
  </button>
  <span className="settingSpan" onClick={() => setting()}>
    <img src = {settingPic} className="setting" />
  </span>
  </span>
  { checkSetting || edit ? (
  <span className="settingList">
    <CloseSetting />
      {checkSetting ? (
                <Setting />
                ) : (
                  <ProfileEditing />
              //   <span className="labelPara">
              //     <span className="changeUserSpan">
              //       <p className="changeUser">UserName :</p>
              //       <input className="changeInputUser" placeholder="User Name" value={userName2}
              //       onChange={(e) => setUserName2(e.target.value)} />
              //   </span>
              //   <input type="file" />
              //   <button onClick={() => save()} className="button">
              //     Save
              //   </button>
              // </span>
            )}
            </span>
            ) : (
              false
        )}
  </>
)}
export default Navbar2;
// {/* <span className="closeSpan">
//   <button className="closeSetting" onClick={() => close()}>
//     X
//   </button>
// </span> */}
  // <span className="labelPara">
  //   <p onClick={() => editCheck()}>Edit profile</p>
  //   <button onClick={() => save()} className="button">
  //     Save
  //   </button>
  // </span>