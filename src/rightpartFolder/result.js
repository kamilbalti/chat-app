import React, { useEffect, useRef } from "react";
import moment from "moment";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";

const Result = () => {
  const dispatch = useDispatch();
  const chatRef = useRef();
  const { detail, realArr, focus } = useSelector((e) => e?.reducer1);

  useEffect(() => {
    if (focus)
      chatRef.current.scrollTo({
        top: chatRef?.current?.scrollHeight,
        left: 0,
        // behavior: "smooth",
      });
      console.log(chatRef.current.scrollHeight, "scrollHeight")
  }, [focus, realArr]);

  return (
    <div ref={chatRef} className="paraDiv2">
      {focus === "loading" ? (
        <span className="rightPart2">
          <Spinner animation="border" variant="success" className="spinner" />
        </span>
      ) : focus || window?.innerWidth <= 768 ? (
        realArr?.map((item, index) => (
          <>
            <div
              key={item}
              className={
                item?.sentBy === detail?.details?.uid ? "time" : "time2 time"
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
                  {item.inputValue}
              </p>
            </div>
          </>
        ))
      ) : (
        <span className="rightPart2">
          <p>Select User for chatting</p>
        </span>
      )}
    </div>
  );
};
export default Result;
