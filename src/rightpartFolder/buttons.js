import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import { useSelector, useDispatch } from "react-redux";
import { setFocus, setInput1 } from "../store/action";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";

const Button = () => {
  const { detail, userArr, realArr, inputVal, focus, user, typingUsers, input1 } = useSelector((e) => e?.reducer1);
  const [messageNumber, setMessageNumber] = useState(0);
  const [typingArr, setTypingArr] = useState([]);
  const dispatch = useDispatch();
  const uid = user?.uid;


  const AddMessage = () => {
        // let tempInput = input1.replace(/"  "/g, "&nbsp;")
        // dispatch(setInput1(tempInput))
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

  let intervalStamp;
  useEffect(() => {
    if (user?.uid) {
      console.log(user?.uid, "user");
      intervalStamp = setInterval(() => {
        let onlineStatus = Date.now();
        if (user?.uid) {
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
      dispatch(setFocus(false))
    }
  }, []);


  return (
    <>
      {focus ? (
        <form className={"inputDiv "} onSubmit={onsubmit}>
          <input className="fileInput" type="file"/>
          <input placeholder="Type your message Here" className="input1" type="text" onFocus={() => typingFunction()}
            onBlur={() => typingRemoveFunction()} onChange={(e) => dispatch(setInput1(e.target.value))} value={inputVal} />
          <button disabled={inputVal.trim() === ""} className=" buttons">Send</button>
        </form>
      ) : (
        false
      )}
    </>
  );
};

export default Button;