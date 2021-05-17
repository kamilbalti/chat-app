import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import { useSelector, useDispatch } from "react-redux";
import { setDownloadingUrl, setInput1, setRealArr, setSendPicture, setTempArr2, setTempCheck } from "../store/action";
import { useRef } from "react";

const Button = () => {
  const { realArr, inputVal, focus, user, downloadingUrl, sendPicture, tempArr2, tempCheck } = useSelector((e) => e?.reducer1);
  // const [ tempRealArr, setTempRealArr ] = useState([])
  const [inputSpanName, setInputSpanName] = useState("fileSpan");
  const [messageNumber, setMessageNumber] = useState(0);
  const [typingArr, setTypingArr] = useState([]);
  const dispatch = useDispatch();
  const inputRef = useRef();
  const uid = user?.uid;
  // const [ tempCheck, setTempCheck ] = useState(false)


  const AddMessage = () => {
    setMessageNumber(messageNumber + 1);
    let time = Date.now();
    let messageArr = [...realArr];
    let messageObject = {
      time: time,
      inputValue: inputVal,
      sentBy: uid,
      number: messageNumber,
      pictureUrl: downloadingUrl,
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
        inputRef.current.value = ""
        dispatch(setDownloadingUrl(""))
        dispatch(setSendPicture(false))
        dispatch(setTempArr2([]))
        dispatch(setTempCheck(false))
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
      // console.log(user?.uid, "user");
      updatingOnlineStatus();
      intervalStamp = setInterval(() => {
        if (user?.uid) {
          updatingOnlineStatus();
        }
      }, 15000);
    }

    return () => {
      clearInterval(intervalStamp);
      // dispatch(setFocus(false));
    };
  }, []);

  const updatingOnlineStatus = () => {
    let onlineStatus = Date.now();
    firebase
      .database()
      .ref("Users/" + uid)
      .update({
        onlineStatus: onlineStatus,
      });
  };

  const changeFileInput = (e) => {
    dispatch(setTempCheck(tempCheck + 1))
    let uploadFile = firebase.storage().ref("file/" + Date.now());
    uploadFile.put(e.target.files[0]).then(() => {
      uploadFile.getDownloadURL().then((url) => {
        dispatch(setDownloadingUrl(url))
        dispatch(setSendPicture(false))
      });
    });
  };

  useEffect(() => {
  if(sendPicture) {
    // setTempRealArr([...realArr])
    let temp = [...realArr]
    tempArr2.map((item) => temp.push(item))
    // setTempRealArr(temp)
    dispatch(setRealArr(temp))
    // let messageArr = [...realArr]
    const messageId = [uid, focus].sort().join("");
    firebase
      .database()
      .ref("messages/" + messageId)
      .set({
        typingArr: typingArr,
        message: temp,
      })
    dispatch(setTempArr2([]))
    dispatch(setTempCheck(false))
    dispatch(setDownloadingUrl(""))
    // if(sendPicture){
      dispatch(setSendPicture(false))
    // }
  }
  },[sendPicture])

  useEffect(() => {
    if( tempCheck, downloadingUrl !== "" ){
      let time = Date.now();
      let tempArr3 = [ ...tempArr2 ]
      let messageObject2 = {
        time: time,
        inputValue: inputVal,
        sentBy: uid,
        number: messageNumber,
        pictureUrl: downloadingUrl,
      };
      messageObject2.pictureUrl !== "" && tempArr3.push(messageObject2)
      dispatch(setTempArr2(tempArr3))
      // let tempArr2 = [...tempArr]
      // tempArr2.push(downloadingUrl)
      // setTempArr(tempArr2)
    }
    // else{
        // setTempArr2([])
      // }
    // else{
      // dispatch(setTempArr2([]))
    // }
  },[downloadingUrl])
  

  // useEffect(() => {
    // if(!downloadingUrl)
      // inputRef.current.value = ""
  // },[downloadingUrl])
  // useEffect(() => {
  // if(sendPicture){
  //   setTempRealArr([...realArr])
  //   let temp = tempRealArr
  //   tempArr2.map((item, index) => temp.push(item))
  //   setTempRealArr(temp)
  //   dispatch(setRealArr(temp))
  //   dispatch(setTempCheck(false))
  // }
  // },[sendPicture])

  // useEffect(() => {
  // },[tempRealArr])


  return (
    <>
      {focus ? (
        <form className={"inputDiv"} onSubmit={onsubmit}>
          <span className={inputSpanName} onMouseEnter={() => setInputSpanName(inputSpanName + " fileSpan2")}
            onMouseOut={() => setInputSpanName("fileSpan")} onClick={() => setInputSpanName("fileSpan")}>
            <input className="fileInput" type="file" ref={inputRef} onChange={(e) => changeFileInput(e)}/>
          </span>
          <span className={downloadingUrl === ""? "visible" : "hidden" }>
            <input placeholder="Type your message Here" className="input1" type="text" onFocus={() => typingFunction()}
              onBlur={() => typingRemoveFunction()} onChange={(e) => dispatch(setInput1(e.target.value))} value={inputVal} />
            <button disabled={inputVal.trim() === "" && downloadingUrl === ""}
            className={" buttons"}>Send</button>
          </span>
        </form>
      ) : (
        false
      )}
    </>
  );
};

export default Button;