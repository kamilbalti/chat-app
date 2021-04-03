import React from "react"
import { useSelector } from "react-redux";
const Navbar1 = () => {
    const { detail } = useSelector((e) => e.reducer1);
    return(
    <span className="buttonSpan buttonSpan2">
    <img
      className="profilePic"
      src={detail?.details?.profilePhoto}
      width="55px"
      height="55px"
    />
    <p className="profileName">{detail?.details?.username}</p>
  </span>
)}
export default Navbar1;