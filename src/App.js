import React, { useState, useEffect } from "react";
import "./App.css";
import firebase from "./firebase";
import { useSelector, useDispatch } from "react-redux";
import { setRealArr, setUndoArr, setRedoArr, setInput1, setInput2, setNum, setUser, 
  setUserName, setUserArr, setPictureUrl, setDetail, setCheck } from "./store/action";

const App = () => {
  const { detail, userArr, realArr, inputVal, inputVal2, user } = useSelector(
    (e) => e?.reducer1
  );
  const [object, setObject] = useState(false);
  // const [detail, setDetail] = useState({});
  // const [time, setTime] = useState(new Date());
  const dispatch = useDispatch();
  const uid = user?.uid;
  // const [ pictureUrl, setPictureUrl] = useState("")

  useEffect(() => {
    firebase
      .database()
      .ref("messages/" + uid)
      .on("value", (res) => {
        let tempArr = res?.val()?.message ? res?.val()?.message : [];
        dispatch(setRealArr(tempArr));
        // let tempUserArr = res?.val()?.userArr ? res?.val()?.userArr: []
        // dispatch(setUserArr(tempUserArr))
      });
    firebase
      .database()
      .ref("Users/" + uid)
      .on("value", (res) => {
        dispatch(setCheck(false))
        dispatch(setDetail(res?.val() ? res?.val() : {}))
        // let tempUserArr = [...userArr]
        // tempUserArr.push(detail?.details?.username)
      });
      firebase.database().ref(uid + "members/").on("value", (res) => {
        dispatch(setUserArr(res?.userArr))
      })
  }, []);

  // console.log(userName, "userName")
  // console.log(userArr)

  useEffect(() => {
    let object2;
    object2 = { input1: inputVal, input2: inputVal2 };
    setObject(object2);
  }, [inputVal, inputVal2]);

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
    let messageArr = [...realArr];
    messageArr.push(inputVal);
    firebase
      .database()
      .ref("messages/" + uid)
      .set({
        message: messageArr,
      })
      .then(() => {
        console.log(detail, "detail")
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
        }
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

  // const imgSrc = firebase.database().ref("Users/" + uid)?.userArr2?.profilePhoto
  // console.log(detail?.details?.profilePhoto, "profile photo");

  return (
    <div>
      <div className="mainDiv">
        <span className="paraDiv userDiv">
          <span className="buttonSpan buttonSpan2">
            <img className="profilePic" src={detail?.details?.profilePhoto} width="65px" height="65px" />
            <h1 className="profileName">{detail?.details?.username}</h1>
          </span>
          <span className="userName">
            {userArr ? userArr?.map((item, index) => <p className="resultPara userPara">{item}</p>) : false}
          </span>
        </span>
        {/* <span className="userDiv"> */}
        <span className="buttonSpan">
          <button className="button" onClick={logOut}>
            Sign Out
          </button>
        </span>
        <span className="paraDiv">
          {realArr?.map((item, index) => (
            <p className="resultPara">{item}</p>
          ))}
          <form onSubmit={onsubmit}>
            <input placeholder="Type your message Here" className="input1" type="text" value={inputVal}
              onChange={(e) => dispatch(setInput1(e.target.value))} />
            <button className="buttons">Send</button>
          </form>
        </span>
        {/* </span> */}
      </div>
    </div>
  );
}

export default App;