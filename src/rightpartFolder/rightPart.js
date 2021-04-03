import React from "react";
import "../App.css";
// import firebase from "../firebase";
import { useSelector } from "react-redux";
// import {
//   setInput1,
// } from "../store/action";
import Navbar2 from "./navbar2";
import Result from "./result";
import Button from "./buttons";

const RightPart = () => {
  const { focus } = useSelector((e) => e?.reducer1);

  // const [messageNumber, setMessageNumber] = useState(0);
  // const [typingArr, setTypingArr] = useState([]);
  // const dispatch = useDispatch();
  // const uid = user?.uid;

  // const AddMessage = () => {
  //   setMessageNumber(messageNumber + 1);
  //   let time = Date.now();
  //   let messageArr = [...realArr];
  //   let messageObject = {
  //     time: time,
  //     inputValue: inputVal,
  //     sentBy: uid,
  //     number: messageNumber,
  //   };
  //   messageArr.push(messageObject);
  //   const messageId = [uid, focus].sort().join("");

  //   firebase
  //     .database()
  //     .ref("messages/" + messageId)
  //     .set({
  //       typingArr: typingArr,
  //       message: messageArr,
  //     })
  //     .then(() => {
  //       dispatch(setInput1(""));
  //     })
  //     .catch((err) => {
  //       console.log(err, "error");
  //     })
  //     .catch((err) => {
  //       console.log(err, "error");
  //     });
  // };

  // const onsubmit = (e) => {
  //   e.preventDefault();
  //   AddMessage();
  // };

  // const typingFunction = () => {
  //   const messageId = [uid, focus].sort().join("");
  //   let typingArr2 =
  //     typingArr && Array.isArray(typingArr) ? [...typingArr] : [];
  //   typingArr2.push(messageId);
  //   setTypingArr(typingArr2);
  // };
  // const typingRemoveFunction = () => {
  //   const messageId = [uid, focus].sort().join("");
  //   setTypingArr(typingArr.filter((item, index) => item !== messageId));
  // };

  // useEffect(() => {
  //   firebase.database().ref(`Users/${uid}`).update({
  //     typingArr: typingArr,
  //   });
  // }, [typingArr]);

  // let intervalStamp;
  // useEffect(() => {
  //   if (user?.uid) {
  //     console.log(user?.uid, "user");
  //     intervalStamp = setInterval(() => {
  //       let onlineStatus = Date.now();
  //       if (user?.uid) {
  //         firebase
  //           .database()
  //           .ref("Users/" + uid)
  //           .update({
  //             onlineStatus: onlineStatus,
  //           });
  //       }
  //     }, 15000);
  //   }
  //   return ()=>{
  //     clearInterval(intervalStamp)
  //   }
  // }, []);

  return (
    <div className="mainDiv">
      <span className={(focus ? "rightPart3 " : " ") + " rightPart "}>
        <Navbar2 />
        <span className="paraDiv">
          <Result />
          {/* <div className="paraDiv2">
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
                </>
              ))
            ) : (
              <span className="rightPart2">
                <p>Select User for chatting</p>
              </span>
            )}
          </div> */}

          <Button />
          {/* {focus ? (
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
           } */}
        </span>
      </span>
    </div>
  );
};

export default RightPart;
