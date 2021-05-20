import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import App from "./App";
import firebase from "./firebase";
import "./signIn.css";
import { setCheck, setUser } from "./store/action";
import { Link } from "react-router-dom";
const SignUp = () => {
  const [ inputCheck, setInputCheck ] = useState(false)
  const [ inputType, setInputType ] =  useState("password")
  const [ picture, setPicture ] = useState("");
  // const [ userCheck ] = useState(false);
  const [ userName, setUserName ] = useState("");
  const { detail, userArr, user } = useSelector((e) => e?.reducer1);
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ error, setError ] = useState(false);
  const [ checking, setChecking ] = useState(false)
  const dispatch = useDispatch();


  const logUp = () => {
    dispatch(setCheck(true));
    setChecking(true);
    const tempUserDetails = {
      username: userName,
      email: email,
      password: password,
    };

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
              details: tempUserDetails ? tempUserDetails:{},
            })
            .then(() => {
              dispatch(setUser(res));
            });
          });
          })
      })
      .catch((err) => {
        setError(err);
        // setUser(false)
        // setTimeout(() => setError(false), 1500);
      });
  };

  useEffect(() => {
    if(checking)
    setTimeout(() => {
      setChecking(false)
    }, 2000)
  },[checking])

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


  return (
    <div>
      {
        <div className="mainDiv">
          <form className="form" onSubmit={onSubmit}>
            {/* <div className="div2">
              <span className="span"></span>
            </div> */}
            <div className="form div">
              <h1 className="h1">SIGN UP</h1>
              <input className="input userName" value={userName} onChange={(e) => setUserName(e.target.value)} type="text" placeholder="User Name" />
              { checking && userName.length < 3 ? (
              userName === ""? 
              <p className="para"> {"This field is required"} </p> :
              <p className="para">UserName should be of at least 3 letter</p> ) : ( false )}
              <input className="input" value={email} onChange={(e) => setEmail(e.target.value)}
                type="text" placeholder="Email Id" />
                { checking && error ? (
                  email.includes("@gmail.com") || email.includes("@email.com") && userArr.filter((item) => item?.details?.email === email) ?
                  // email.filter((item) => item.includes("@gmail.com" || "@email.com"))?
                  <p className="para">
                    {"The email is already in used"}
                  </p>
                  :
                  email.length === 0 || email === ""?
                  <p className="para">
                    {"This field is required"}
                  </p> :
                  <p className="para">
                    {'"@gmail.com" or "@email.com" should be included'}
                  </p>
                ) : (
                  false
                )}
              <input className="input" value={password} onChange={(e) => setPassword(e.target.value)}
                type={inputType} placeholder="Password" />
                { checking ? 
                password === "" && password.length === 0?
                <p className="para"> {"This field is required"} </p> :
                password.length <= 5?
                <p className="para">Password should be of at least 6 letters</p>: false
                : false}
              <span>
                <label>
                <input checked={inputCheck} className="checkbox" type="checkbox"
                onChange={() => checkInput()} />
                Show password</label>
              </span>
              { <input className="file" type="file" onChange={(e) => setPicture(e.target.files[0])} accept="images/*"
                  name="pictures" /> }
              <button className="button10" type={"submit"}>
                Sign Up
              </button>
              <p className="p">
                Already have an account? <Link to="/">Log In</Link>
              </p>
            </div>
          </form>
        </div>
      }
    </div>
  );
};

export default SignUp;