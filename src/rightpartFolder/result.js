import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import { Spinner, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
// import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
// import CloseSetting from "./closeSetting";
// import Button from "./buttons";
import CustomModal from "../Component/Modal";

const Result = () => {
  // const dispatch = useDispatch();
  const chatRef = useRef();
  const { detail, realArr, focus, tempArr2, galleryPic } = useSelector(
    (e) => e?.reducer1
  );
  const [showModal, setShowModal] = useState(false);
  // const [temp, setTemp] = useState(false)

  useEffect(() => {
    if (focus)
      chatRef.current.scrollTo({
        top: chatRef?.current?.scrollHeight,
        left: 0,
        // behavior: "smooth",
      });
    // console.log(chatRef.current.scrollHeight, "scrollHeight")
  }, [focus, realArr]);

  // const openPic = (index) => {
  // setTemp(index)
  // alert(temp)
  // }

  return (
    <div ref={chatRef} className="paraDiv2">
      {
        // temp?
        //     <div className="bgGray">
        //       <span className="closeSpan">
        //         <CloseSetting />
        //       </span>
        //         { temp? <img className="sendingPic pic2" src={realArr[temp]}/> : false}
        //           <span className="miniImage">
        //           {
        //           realArr?.map((item, index) => (
        //               <img onClick={() => openPic(index)} className="pic2 pic3" src={ item?.pictureUrl !== "" && item?.pictureUrl} />
        //           ))
        //           }
        //         </span>
        //       </div>

        // :
        focus === "loading" ? (
          <span className="rightPart2">
            <Spinner animation="border" variant="success" className="spinner" />
          </span>
        ) : focus || window?.innerWidth <= 768 ? (
          realArr?.map((item, index) => (
            <>
              <div
                key={index}
                className={`
                  ${
                    item?.sentBy === detail?.details?.uid
                      ? "time"
                      : "time2 time"
                  }
                  ${!!item?.pictureUrl ? " picDiv" : ""}
                `}
              >
                <p className="timeNow">{moment(item?.time).calendar()}</p>
                {/* {item.inputValue? */}
                <p
                  className={`resultPara 
                    ${item?.sentBy === detail?.details?.uid ? "time4" : "time3"}
                    `}
                >
                  {!!item?.pictureUrl ? (
                    <span onClick={() => setShowModal(item.pictureUrl)}>
                      <img className="sendingPic" src={item.pictureUrl} />
                    </span>
                  ) : (
                    item?.inputValue
                  )}
                </p>
                {/* : */}
                {/* } */}
              </div>
            </>
          ))
        ) : (
          <span className="rightPart2">
            <p>Select User for chatting</p>
          </span>
        )
      }
      {!!showModal && (
        <CustomModal open={showModal} onClose={() => setShowModal(false)}>
          {/* <h1>ABC</h1> */}
          <img className="modalPic" src={showModal} />
        </CustomModal>
      )}
    </div>
  );
};
export default Result;
