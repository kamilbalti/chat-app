import React, { useState, useEffect } from "react";
import "./App.css";
import firebase from "./firebase";
import { useSelector, useDispatch } from "react-redux";
import {
  setRealArr,
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
  setTypingUsers,
} from "./store/action";
import moment from "moment";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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
    typingUsers,
    input1,
  } = useSelector((e) => e?.reducer1);
  const [inputCheck, setInputCheck] = useState(false);
  const [inputType, setInputType] = useState("password");
  const [password2, setPassword2] = useState("");
  const [email2, setEmail2] = useState("");
  const [userName2, setUserName2] = useState("");
  const [checked, setChecked] = useState(true);
  const [edit, setEdit] = useState(false);
  const [checkSetting, setCheckSetting] = useState(false);
  const [tempArr, setTempArr] = useState([]);
  const [messageNumber, setMessageNumber] = useState(0);
  const [search, setSearch] = useState("");
  const [typingArr, setTypingArr] = useState([]);
  const [temp, setTemp] = useState(true);
  const dispatch = useDispatch();
  const uid = user?.uid;

  useEffect(() => {
    dispatch(setFocus(false));
    firebase
      .database()
      .ref("Users/")
      .on("value", (res) => {
        let users = res.val() ? res.val() : "";
        let ourData = users[uid];
        let otherUsers =
          res.val() && users
            ? Object?.values(users)?.filter(
                (item5) => item5?.details?.uid !== uid
              )
            : [];
        let tempTypingArr = [];
        otherUsers?.forEach((item) => {
          let tempType = item?.typingArr || [];
          tempTypingArr.push(...tempType);
          dispatch(setTypingUsers(tempTypingArr));

          dispatch(setCheck(false));
          dispatch(setDetail(ourData ? ourData : {}));
          dispatch(setUserArr(otherUsers ? otherUsers : []));
          setTempArr(otherUsers || []);
          console.log(tempArr, "tempArray");
        });
      });
    setTimeout(() => setTemp(false), 1000);
    // firebase
    //   .database()
    //   .ref("Users/")
    //   .on("value", (res) => {
    //     let users = res.val() || {};
    //     let otherUsers =
    //       res.val() && users
    //         ? Object?.values(users)?.filter(
    //             (item5) => item5?.details?.uid !== uid
    //           )
    //         : [];
    //     let tempTypingArr = [];
    //     otherUsers?.forEach((item) => {
    //       let tempType = item?.typingArr || [];
    //       tempTypingArr.push(...tempType);
    //       dispatch(setTypingUsers(tempTypingArr));
    //     });
    //   })
  }, [user]);

  // console.log(user, "user")

  const AddMessage = () => {
    setMessageNumber(messageNumber + 1);
    let time = Date.now();
    let messageArr = [...realArr];
    let messageObject = {
      time: time,
      inputValue: inputVal,
      sentBy: uid,
      number: messageNumber,
    };
    messageArr.push(messageObject);
    const messageId = [uid, focus].sort().join("");

    firebase
      .database()
      .ref("messages/" + messageId)
      .set({
        typingArr: typingArr,
        message: messageArr,
      })
      .then(() => {
        dispatch(setInput1(""));
      })
      .catch((err) => {
        console.log(err, "error");
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const onsubmit = (e) => {
    e.preventDefault();
    AddMessage();
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

  const onFocus = (uid1) => {
    const messageId = [uid, uid1].sort().join("");
    dispatch(setFocus("loading"));
    setTimeout(
      () =>
        firebase
          .database()
          .ref("messages/" + messageId)
          .on("value", (res) => {
            let tempArr = res?.val()?.message || [];
            dispatch(setRealArr(tempArr));
            dispatch(setFocus(uid1));
          }),
      100
    );
  };
  const focusedUser = userArr?.find((item3) => item3?.details?.uid === focus);

  const back = () => {
    dispatch(setFocus(false));
  };

  const typingFunction = () => {
    const messageId = [uid, focus].sort().join("");
    let typingArr2 =
      typingArr && Array.isArray(typingArr) ? [...typingArr] : [];
    typingArr2.push(messageId);
    setTypingArr(typingArr2);
  };
  const typingRemoveFunction = () => {
    const messageId = [uid, focus].sort().join("");
    setTypingArr(typingArr.filter((item, index) => item !== messageId));
  };

  useEffect(() => {
    firebase.database().ref(`Users/${uid}`).update({
      typingArr: typingArr,
    });
  }, [typingArr]);

  // useEffect(() => {
  //   if(Array.isArray(userArr) && userArr !== [] )
  //   setTempArr([...userArr])
  //   // console.log(tempArr, "tempArray")
  // },[checkSearch])

  const searching = (e) => {
    dispatch(setUserArr(tempArr));
    dispatch(setFocus(false));
    setSearch(e.target.value);
  };

  useEffect(() => {
    dispatch(
      setUserArr(
        userArr?.filter((item, index) =>
          item.details.username.toLowerCase().includes(search.toLowerCase())
        )
      )
    );
  }, [search]);

  const editCheck = () => {
    setEdit(true);
    setCheckSetting(false);
  };

  // const changeCheck = () => {
  //   if (!checked) setChecked(true);
  // };

  // const changeCheck2 = () => {
  //   if (checked) setChecked(false);
  // };

  const save = () => {
    let detail2 = detail;
    detail2.details.username = userName2;
    detail2.details.password = password2;
    detail2.details.email = email2;
    // user.email = email2;
    dispatch(setDetail(detail2));
    setEdit(false);
    setCheckSetting(false);
    // firebase
    // .database()
    // .ref("Users/" + user?.uid)
    // .set({
    // details: detail2?.details ? detail2?.details: {},
    // })
  };

  const close = () => {
    setCheckSetting(false);
    setEdit(false);
  };

  // const checkInput = () => {
  //   if (inputCheck === true) {
  //     setInputCheck(false);
  //     setInputType("password");
  //   } else {
  //     setInputCheck(true);
  //     setInputType("text");
  //   }
  // };

  const setting = () => {
    setCheckSetting(true);
    setEmail2(detail.details.email);
    setPassword2(detail.details.password);
    setUserName2(detail.details.username);
  };

  let intervalStamp;
  useEffect(() => {
    if (user?.uid) {
      console.log(user?.uid, "user");
      intervalStamp = setInterval(() => {
        let onlineStatus = Date.now();
        if (user?.uid) {
          // dispatch(setDetail(detail2));
          firebase
            .database()
            .ref("Users/" + uid)
            .update({
              onlineStatus: onlineStatus,
            });
        }
      }, 15000);
    }
    return ()=>{
      clearInterval(intervalStamp)
    }
  }, []);


  return (
    <div className="mainDiv">
      <span className={(focus ? "leftPart3 " : " ") + ` leftPart`}>
        {!temp ? (
          <>
            <span className="buttonSpan buttonSpan2">
              <img
                className="profilePic"
                src={detail?.details?.profilePhoto}
                width="55px"
                height="55px"
              />
              <p className="profileName">{detail?.details?.username}</p>
            </span>
            <input
              className="searchingInput"
              type="text"
              placeholder="Search UserName Here"
              value={search}
              onChange={(e) => searching(e)}
            />
            <span className="userName">
              {Array.isArray(userArr)
                ? userArr?.map((item2, index2) => (
                    <div
                      key={index2}
                      className={"userListDiv"}
                      onClick={() => onFocus(item2.details.uid)}
                    >
                      <img
                        className="profilePic"
                        src={item2?.details?.profilePhoto}
                        width="55px"
                        height="55px"
                      />
                      <span
                        className={
                          Array.isArray(typingUsers) &&
                          typingUsers?.indexOf(
                            [item2?.details?.uid, uid].sort().join("")
                          ) !== -1 &&
                          typingUsers
                            ? "userPara3"
                            : "userPara userPara2"
                        }
                      >
                        <p className="userName2">{item2?.details?.username}</p>
                        {Array.isArray(typingUsers) &&
                        typingUsers?.indexOf(
                          [item2?.details?.uid, uid].sort().join("")
                        ) !== -1 ? (
                          <p className="typingPara">Typing...</p>
                        ) : (
                          false
                        )}
                        <p className="typingPara">
                          {Date.now() < item2?.onlineStatus + 15000
                            ? "Online"
                            : ""}
                        </p>
                      </span>
                      <p>{realArr?.number}</p>
                    </div>
                  ))
                : false}
            </span>
          </>
        ) : (
          <span className="leftPart2">
            <Spinner
              animation="border"
              variant="secondary"
              className="spinner"
            />
          </span>
        )}
      </span>
      {/* {focus ? (
        temp ? (
          <span className="leftPart leftPart2">
            <Spinner
              animation="border"
              variant="secondary"
              className="spinner"
            />
          </span>
        ) : (
          <span className="leftPart leftPart3">
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
              {Array.isArray(userArr)
                ? userArr?.map((item2, index2) => (
                    <div
                      key={index2}
                      className={"userListDiv"}
                      onClick={() => onFocus(item2?.details?.uid)}
                    >
                      <img
                        className="profilePic"
                        src={item2?.details?.profilePhoto}
                        width="55px"
                        height="55px"
                      />
                      {console.log(typingUsers, "log")}
                      <span className="userPara">
                        <p>{item2?.details?.username}</p>
                        {Array.isArray(typingUsers) &&
                          typingUsers?.indexOf(
                            [item2?.details?.uid, uid].sort().join("")
                          ) !== -1 && <p>Typing</p>}
                      </span>
                    </div>
                  ))
                : false}
            </span>
          </span>
        )
      ) : temp ? (
        <span className="leftPart leftpart2">
          <span className="buttonSpan buttonSpan2">
            <img
              className="profilePic"
              src={detail?.details?.profilePhoto}
              width="55px"
              height="55px"
            />
            <p className="profileName">{detail?.details?.username}</p>
          </span>
          <span className="rightPart2">
            <Spinner
              animation="border"
              variant="secondary"
              className="spinner"
            />
          </span>
        </span>
      ) : (
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
                  <div
                    key={item2}
                    className={"userListDiv"}
                    onClick={() => onFocus(item2?.details?.uid)}
                  >
                    <img
                      className="profilePic"
                      src={item2?.details?.profilePhoto}
                      width="55px"
                      height="55px"
                    />
                    <span className="userPara">
                      <p>{item2?.details?.username}</p>
                      {Array.isArray(typingUsers) &&
                        typingUsers?.indexOf(
                          [item2?.details?.uid, uid].sort().join("")
                        ) !== -1 && <p>Typing</p>}
                    </span>
                  </div>
                ))
              : false}
          </span>
        </span>
      )} */}

      {/* {focus === "loading" ? ( */}
      {/* <span className="rightPart">
          <span className="buttonSpan">
            <button onClick={() => back()} className="back">
              Back
            </button>
            <button className="button" onClick={logOut}>
              Sign Out
            </button>
            <span className="settingSpan">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6d/Windows_Settings_app_icon.png"
                className="setting"
                onClick={() => setting()}
              />
            </span>
          </span>
          <span className="rightPart2">
            <Spinner animation="border" variant="success" className="spinner" />
          </span>
        </span> */}
      {/* ) : focus ? ( */}
      <span className={(focus ? "rightPart3 " : " ") + " rightPart "}>
        <span className="buttonSpan">
          <button onClick={() => back()} className="back">
            Back
          </button>
          {focus && focus !== "loading" ? (
            <img
              className="profilePic"
              src={focusedUser?.details?.profilePhoto}
              width="55px"
              height="55px"
            />
          ) : (
            false
          )}
          <span
            className={
              Array.isArray(typingUsers) &&
              typingUsers?.indexOf(
                [focusedUser?.details?.uid, uid].sort().join("")
              ) !== -1 &&
              typingUsers
                ? "userPara3"
                : "userPara userPara2"
            }
          >
            <p className="profileName">{focusedUser?.details?.username}</p>
            {Array.isArray(typingUsers) &&
              typingUsers?.indexOf(
                [focusedUser?.details?.uid, uid].sort().join("")
              ) !== -1 && <p className="typingPara ">Typing...</p>}
              <p className="typingPara"> {Date.now() < focusedUser?.onlineStatus + 15000 ? "Online" : ""} </p>
            {/* {Array.isArray(typingUsers) &&
              typingUsers?.indexOf(
                [focusedUser?.details?.uid, uid].sort().join("")
              ) !== -1 && <p className="typingPara">Typing...</p>} */}
          </span>
          <button className="button" onClick={() => logOut()}>
            Sign Out
          </button>
          <span className="settingSpan" onClick={() => setting()}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6d/Windows_Settings_app_icon.png"
              className="setting"
            />
          </span>
        </span>
        {checkSetting || edit ? (
          <span className="settingList">
            <span className="closeSpan">
              <button className="closeSetting" onClick={() => close()}>
                X
              </button>
            </span>
            {checkSetting ? (
              <span className="labelPara">
                <p onClick={() => editCheck()}>Edit profile</p>
                <button onClick={() => save()} className="button">
                  Save
                </button>
              </span>
            ) : (
              <span className="labelPara">
                <span className="changeUserSpan">
                  <p className="changeUser">UserName :</p>
                  <input
                    className="changeInputUser"
                    placeholder="User Name"
                    value={userName2}
                    onChange={(e) => setUserName2(e.target.value)}
                  />
                </span>
                <input type="file" />
                <button onClick={() => save()} className="button">
                  Save
                </button>
              </span>
            )}
          </span>
        ) : (
          false
        )}
        <span className="paraDiv">
          <div className="paraDiv2">
            {focus === "loading" ? (
              <span className="rightPart2">
                <Spinner
                  animation="border"
                  variant="success"
                  className="spinner"
                />
              </span>
            ) : focus || window?.innerWidth <= 768 ? (
              realArr?.map((item, index) => (
                <>
                  {/* {item?.sentBy === detail?.details?.uid ? ( */}
                  <div
                    key={item}
                    className={
                      item?.sentBy === detail?.details?.uid
                        ? "time"
                        : "time2 time"
                    }
                  >
                    <p className="timeNow">{moment(item?.time).calendar()}</p>
                    <p
                      className={
                        item?.sentBy === detail?.details?.uid
                          ? "resultPara time4"
                          : "time3 resultPara"
                      }
                    >
                      {item?.inputValue}
                    </p>
                  </div>
                  {/* ) : ( */}
                  {/* <div className="time time2">
                      <p className="timeNow">{moment(item?.time).calendar()}</p>
                      <p className="resultPara time3">{item?.inputValue}</p>
                      </div>
                  )} */}
                </>
              ))
            ) : (
              <span className="rightPart2">
                <p>Select User for chatting</p>
              </span>
            )}
          </div>
          {checked && focus ? (
            focus ? (
              <form className={"inputDiv "} onSubmit={onsubmit}>
                <input
                  placeholder="Type your message Here"
                  className="input1"
                  type="text"
                  onFocus={() => typingFunction()}
                  onBlur={() => typingRemoveFunction()}
                  onChange={(e) => dispatch(setInput1(e.target.value))}
                  value={inputVal}
                />
                <button
                  disabled={inputVal === "" || inputVal === false}
                  className=" buttons"
                >
                  Send
                </button>
              </form>
            ) : (
              false
            )
          ) : !checked && focus ? (
            <form>
              <textarea
                placeholder="Type your message Here"
                className="input1"
                type="text"
                onFocus={() => typingFunction()}
                onBlur={() => typingRemoveFunction()}
                onChange={(e) => dispatch(setInput1(e.target.value))}
                value={inputVal}
              />
              <button
                disabled={inputVal === "" || inputVal === false}
                className=" buttons"
              >
                Send
              </button>
            </form>
          ) : (
            false
          )}
        </span>
      </span>

      {/* <span className="rightPart">
          <span className="buttonSpan">
            <button onClick={() => back()} className="back">
              Back
            </button>
            <button className="button" onClick={logOut}>
              Sign Out
            </button>
            <span className="settingSpan">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6d/Windows_Settings_app_icon.png"
                className="setting"
                onClick={() => setting()}
              />
            </span>
          </span>
          <span className="rightPart2">
            <p>Select User for chatting</p>
          </span>
        </span> */}

      {/* )} */}
    </div>
  );
};

export default App;
