import React, { useState, useEffect } from "react";
import "./App.css";
import firebase from "./firebase";
import { useSelector, useDispatch } from "react-redux";
import {
  setRealArr,
  setUndoArr,
  setRedoArr,
  setInput1,
  setInput2,
  setNum,
  setUser,
  setUserName,
  setUserArr,
  setPictureUrl,
  setDetail,
  setCheck,
  setFocus,
} from "./store/action";
import moment from "moment";

const App = () => {
  const {
    detail,
    userArr,
    realArr,
    inputVal,
    inputVal2,
    focus,
    user,
    userName,
  } = useSelector((e) => e?.reducer1);
  const [object, setObject] = useState(false);
  // const [detail, setDetail] = useState({});
  // const [time, setTime] = useState(new Date());
  const dispatch = useDispatch();
  const uid = user?.uid;
  // const [ pictureUrl, setPictureUrl] = useState("")

  useEffect(() => {
    firebase
      .database()
      .ref("Users/")
      .on("value", (res) => {
        let users = res.val();
        let ourData = res?.val
          ? Object.values(users).find((item) => item?.details?.uid === uid)
          : {};
        let otherUsers = res?.val
          ? Object.values(users).filter((item) => item?.details?.uid !== uid)
          : [];
        dispatch(setCheck(false));
        dispatch(setDetail(ourData ? ourData : {}));
        dispatch(setUserArr(otherUsers));
        // let tempUserArr = [...userArr]
        // tempUserArr.push(detail?.details?.username)
      });
    // firebase.database().ref(uid + "/members/").on("value", (res) => {
    //   if(Array.isArray(res?.userArr) || res?.userArr)
    // })
  }, []);

  // // if(user?.uid !== false || user?.uid !== ""){
  //     firebase.database().ref(uid + "/members/")
  //       .set({
  //         userArr: Array.isArray(userArr) && userArr ? userArr: [],
  //         userDetail: { userName: detail?.userName, uid: detail?.uid},
  //         message: [...realArr]
  //       })
  //         .then(() => {
  //           let userArr2 = Array.isArray(userArr)?[...userArr]:[]
  //           if(userName !== false && userName !== "")
  //           userArr2.push(detail?.userName)
  //           else
  //           dispatch(setUserArr([]))
  //           if(Array.isArray(userArr2)&&userArr2)
  //           dispatch(setUserArr(userArr2))
  //           else
  //           dispatch(setUserArr([]))
  //         })
  // }

  // console.log(userName, "userName")
  // console.log(userArr)

  // useEffect(() => {
  //   let object2;
  //   object2 = { input1: inputVal, input2: inputVal2 };
  //   setObject(object2);
  // }, [inputVal, inputVal2]);

  // const submit = () => {
  //   let submitArr = Array.isArray(realArr) ? [...realArr] : [];
  //   submitArr.push(object);
  //   let tempUndoArr = Array.isArray(undoArr)
  //     ? [...undoArr, submitArr?.slice(0, submitArr?.length - 1)]
  //     : [[{ input1: "", input2: "" }]];
  //   firebase
  //     .database()
  //     .ref("messages/" + uid)
  //     .set({
  //       message: submitArr,
  //       // undo: tempUndoArr,
  //     });
  //   // dispatch(setInput1(""));
  //   dispatch(setInput2(""));
  //   dispatch(setRedoArr([]));
  // };

  // const update = () => {
  //   let tempUpdateArr = [...realArr];
  //   let updateArr = Array.isArray(realArr) ? [...realArr] : [];
  //   updateArr[num] = { input1: inputVal, input2: inputVal2 };
  //   console.log(tempUpdateArr, "tempupdatedarr");
  //   firebase
  //     .database()
  //     .ref("messages" + uid)
  //     .set({
  //       message: updateArr,
  //       // undo: [...undoArr, [...tempUpdateArr]],
  //     });
  //   // dispatch(setInput1(""));
  //   dispatch(setInput2(""));
  //   dispatch(setNum(false));
  // };

  const AddMessage = () => {
    let time = Date.now();

    let messageArr = [...realArr];
    let object = { time: time, inputValue: inputVal, sentBy: uid };
    messageArr.push(object);
    const messageId = [uid, focus].sort().join("");

    firebase
      .database()
      .ref("messages/" + messageId)
      .set({
        // secondUser: { profilePhoto: focus?.details?.profilePhoto,
        // userName: focus?.details?.profilePhoto},
        message: messageArr,
      })
      .then(() => {
        console.log(detail, "detail");
        // if (!detail?.myMessages ||(Array.isArray(detail?.myMessages) && detail?.myMessages?.indexOf(uid) === -1)) {
        // let tempMessagesArr = detail?.myMessages ? [...detail?.myMessages] : [];
        // tempMessagesArr.push(uid);
        // firebase
        // .database()
        // .ref("Users/" + uid + "/myMessages")
        // .set(tempMessagesArr)
        // .then(() => {
        // console.log(tempMessagesArr)
        // let tempArr = [...undo]
        dispatch(setInput1(""));
      })
      .catch((err) => {
        console.log(err, "error");
        // });
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };
  // .then(()=>{
  // })
  // dispatch(setRealArr(messageArr))
  // };

  const onsubmit = (e) => {
    e.preventDefault();
    // console.log('a')
    AddMessage();
  };

  const logOut = () => {
    let temp2 = firebase.auth().signOut();
    dispatch(setUser(false));
  };

  const onFocus = (uid1) => {
    const messageId = [uid, uid1].sort().join("");

    firebase
      .database()
      .ref("messages/" + messageId)
      .on("value", (res) => {
        let tempArr = res?.val()?.message ? res?.val()?.message : [];
        dispatch(setRealArr(tempArr));
        // let tempUserArr = res?.val()?.userArr ? res?.val()?.userArr: []
        // dispatch(setUserArr(tempUserArr))
      });
    dispatch(setFocus(uid1));
  };
  const focusedUser = userArr?.find((item) => item?.details?.uid === focus);

  // const imgSrc = firebase.database().ref("Users/" + uid)?.userArr2?.profilePhoto
  // console.log(detail?.details?.profilePhoto, "profile photo");

  return (
    <div>
      <div className="mainDiv">
        <span className="leftPart">
          <span className="buttonSpan buttonSpan2">
            <img
              className="profilePic"
              src={detail?.details?.profilePhoto}
              width="55px"
              height="55px"
            />
            <p className="profileName">{detail?.details?.username}</p>
          </span>
          <span className="userName">
            {Array.isArray(userArr) && userArr
              ? userArr?.map((item2, index2) => (
                  <div className={"userListDiv"}>
                    <img
                      className="profilePic"
                      src={item2?.details?.profilePhoto}
                      width="55px"
                      height="55px"
                    />
                    <p
                      key={item2}
                      onClick={() => onFocus(item2?.details?.uid)}
                      className="userPara"
                    >
                      {item2?.details?.username}
                    </p>
                  </div>
                ))
              : []}
          </span>
        </span>
        <span className="rightPart">
          <span className="buttonSpan">
            <img
              className="profilePic"
              src={focusedUser?.details?.profilePhoto}
              width="65px"
              height="65px"
            />
            <p className="profileName">{focusedUser?.details?.username}</p>
            <button className="button" onClick={logOut}>
              Sign Out
            </button>
          </span>
          {focus && (
            <span className="paraDiv">
              <div>
                {realArr?.map((item, index) => (
                  <>
                    <span className="time">{moment(item?.time).calendar()}
                    <p key={item} className="resultPara">
                      {item?.inputValue}
                    </p>
                    </span>
                  </>
                ))}
              </div>
              <form className={"inputDiv"} onSubmit={onsubmit}>
                <input
                  placeholder="Type your message Here"
                  className="input1"
                  type="text"
                  value={inputVal}
                  onChange={(e) => dispatch(setInput1(e.target.value))}
                />
                <button className="buttons">Send</button>
              </form>
            </span>
          )}
        </span>
      </div>
    </div>
  );
};

export default App;
