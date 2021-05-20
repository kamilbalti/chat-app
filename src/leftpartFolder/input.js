import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFocus, setUserArr } from "../store/action";

const Input = () => {
    const [search, setSearch] = useState("");
    const { userArr, tempArr } = useSelector((e) => e?.reducer1);
    const dispatch = useDispatch();
    const searching = (e) => {
        dispatch(setUserArr(tempArr));
        dispatch(setFocus(false));
        setSearch(e.target.value);
      };

      useEffect(() => {
        dispatch(
          setUserArr(
            userArr?.filter((item) =>
              item?.details?.username.toLowerCase().includes(search.toLowerCase())
            )
          )
        );
      }, [search]);
    
    return(
    <input
    className="searchingInput"
    type="text"
    placeholder="Search Username Here"
    value={search}
    onChange={(e) => searching(e)}
  />
)}
export default Input;