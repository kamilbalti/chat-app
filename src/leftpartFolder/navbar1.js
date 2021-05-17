import React, { useState } from "react"
import { useSelector } from "react-redux";
import CustomModal from "../Component/Modal";
const Navbar1 = () => {
    const { detail } = useSelector((e) => e.reducer1);
  const [showModal, setShowModal] = useState(false);

    return(
    <span className="buttonSpan buttonSpan2">
          {!!showModal && (
              <CustomModal open={showModal} onClose={() => setShowModal(false)}>
                {/* <h1>ABC</h1> */}
                <img className="modalPic" src={showModal} />
              </CustomModal>
        )}
    <img onClick={() => setShowModal(detail?.details?.profilePhoto)} className="profilePic" 
    src={detail?.details?.profilePhoto} width="55px" height="55px"/>
    <p className="profileName">{detail?.details?.username}</p>
  </span>
)}
export default Navbar1;