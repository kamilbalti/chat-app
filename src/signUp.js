import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import App from "./App";
import firebase, { storage } from "./firebase";
import "./signIn.css";
import {
  setCheck,
  setDetail,
  setPictureUrl,
  setUser,
  setUser2,
  setUserArr,
} from "./store/action";
import { Link } from "react-router-dom";
const SignUp = () => {
  // const [pictureUrl, setPictureUrl] = useState("");
  // const [userArr, setUserArr ] = useState([])
  const [ checkVal, setCheckVal ] = useState(false)
  const [ inputCheck, setInputCheck ] = useState(false)
  const [ inputType, setInputType ] =  useState("password")
  const [ picture, setPicture ] = useState("");
  const [ userCheck, setUserCheck ] = useState(false);
  const [ userName, setUserName ] = useState("");
  const { user, userArr, detail, realArr } = useSelector((e) => e?.reducer1);
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ error, setError ] = useState(false);
  const dispatch = useDispatch();
  // console.log(picture, "picture");

  // let hour = new Date()?.getHours();
  // let minutes = new Date()?.getMinutes()
  // let minute2;
  // minutes < 10?
  // minute2 = "0" + minutes:
  // minute2 = minutes
  // let time =  + hour + " : " + minute2 + "\n"


  const logUp = () => {
    const tempUserDetails = {
      username: userName,
      email: email,
      password: password,
    };

    // tempUserArr.push(userName);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        let date = Date.now();
        let uploadImage = firebase
          .storage()
          .ref()
          .child("profiles/" + date);
        uploadImage.put(picture).then(() => {
          uploadImage.getDownloadURL().then((url) => {
            console.log(url, "url");
            tempUserDetails.userArr = userArr
            tempUserDetails.uid = res?.user?.uid
            tempUserDetails.profilePhoto = url;
            
            firebase
            .database()
            .ref("Users/" + res?.user?.uid)
            .set({
              details: tempUserDetails?tempUserDetails:{},
            })
            .then(() => {
              dispatch(setUser(res));
            });
            dispatch(setCheck(true));
          });
          // if(res?.user?.uid !== false || res?.user?.uid !== ""){
          //     firebase.database().ref(res?.user?.uid + "/members/")
          //       .set({
          //         userArr: Array.isArray(userArr) ? [...userArr]: [],
          //         userDetail: { userName: userName, uid: res?.user?.uid },
          //         message: [...realArr]
          //       })
          //       .then(() => {
          //         let userArr2 = Array.isArray(userArr)?[...userArr]:[]
          //         if(userName !== false)
          //         userArr2.push(tempUserDetails?.userName)
          //         dispatch(setUserArr(userArr2))
          //       })}
          })
      })
      .catch((err) => {
        setError(err);
        setTimeout(() => setError(false), 1500);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    logUp();
  };

  const checkInput = () => {
    if(inputCheck === true)
    {
    setInputCheck(false)
    setInputType("password")
    }
    else
    {
    setInputCheck(true)
    setInputType("text")}
  }

  // useEffect(()=>{
  // console.log(picture, "picture")
  // },[picture])

  return (
    <div>
      {user?.uid ? (
        (<App />)
      ) : (
        <div className="mainDiv">
          <form className="form" onSubmit={onSubmit}>
            <div className="div2">
              <span className="span">{/* <img src={} /> */}</span>
              {/* <button className="file" type="file">upload your file</button> */}
              { <input className="file" type="file" onChange={(e) => setPicture(e.target.files[0])}
                  name="pictures" /> }
            </div>
            <div className="form div">
              <h1 className="h1">SIGN UP</h1>
              <input className="input" value={userName} onChange={(e) => setUserName(e.target.value)}
                type="text" placeholder="User Name" />
              {userCheck ? (
                <p className="para">UserName should be of at least 5 letter</p>
              ) : (
                false
              )}
              <input className="input" value={email} onChange={(e) => setEmail(e.target.value)}
                type="text" placeholder="Email Id" />
              <input className="input" value={password} onChange={(e) => setPassword(e.target.value)}
                type={inputType} placeholder="Password" />
              <span>
                <label>
                <input checked={inputCheck} className="checkbox" type="checkbox"
                onChange={() => checkInput()} />
                Show password</label>
              </span>
              {error ? (
                <p className="para">
                  {"The email is already in used"}
                </p>
              ) : (
                false
              )}
              <button className="button10" type={"submit"}>
                Sign Up
              </button>
              <p className="p">
                Already have an account? <Link to="/">Log In</Link>
              </p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignUp;