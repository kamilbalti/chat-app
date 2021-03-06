import React, { useEffect, useState } from "react";
import firebase from "../firebase";
import { useSelector, useDispatch } from "react-redux";
import { setCheck, setDetail, setFocus, setInput1, setRealArr, setTempArr, setTypingUsers, setUserArr } 
from "../store/action";
import CustomModal from "../Component/Modal";

const Detail = () => {
const { focus, user, detail, userArr, typingUsers, realArr, tempArr } = useSelector((e) => e?.reducer1);
const [showModal, setShowModal] = useState(false);
const dispatch = useDispatch()
const uid = user?.uid;

  const onFocus = (uid1) => {
    dispatch(setInput1(""))
    if(uid && uid1){ 
      const messageId = [uid, uid1].sort().join("")
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
          1000
          );
        }
  };

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
          dispatch(setTempArr(otherUsers || []));
          // console.log(tempArr, "tempArray");
        });
      });
  }, [user]);

  return (
          <>
            {!!showModal && (
                <CustomModal open={showModal} onClose={() => setShowModal(false)}>
                  {/* <h1>ABC</h1> */}
                  <img className="modalPic" src={showModal} />
                </CustomModal>
            )}
            <span className="userName">
              {Array.isArray(userArr)
                ? userArr?.map((item2, index2) => (
                    <div key={index2} className={"userListDiv"}>
                      <img onClick={() => setShowModal(item2?.details?.profilePhoto)} className="profilePic" 
                      src={item2?.details?.profilePhoto} width="55px" height="55px"/>
                      
                      <span onClick={() => onFocus(item2.details.uid)} className={ Array.isArray(typingUsers) &&
                      typingUsers?.indexOf( [item2?.details?.uid, uid].sort().join("") ) !== -1 && typingUsers ? 
                      "userPara3" : "userPara userPara2 userPara4" }>
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
  );
};

export default Detail;