import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import App from "./App";
import firebase from "./firebase";
import "./signIn.css";
import "./App.css"
import { setUser } from "./store/action";
import { Link } from "react-router-dom/cjs/react-router-dom.min";


const SignIn = () => {
  const [ inputType, setInputType ] =  useState("password")
  const [ inputCheck, setInputCheck ] = useState(false)
  const dispatch = useDispatch();
  const { user } = useSelector((e) => e?.reducer1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const logIn = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((res) => {
        setEmail("");
        setPassword("");
        console.log("res", res);
        dispatch(setUser(res?.user));
      })

      .catch((err) => {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      });
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


  const onSubmit = (e) => {
    e.preventDefault();
    logIn()
  };


  return (
    <div>
      {user?.uid ? (
        <App />
      ) : (
        // <div className="div">
          <div className="mainDiv">
            <form className="form" onSubmit={onSubmit}>
                <div className="form
                 div">
                <h1 className="h1">LOGIN</h1>
                  <input className="input" value={email} onChange={(e) => setEmail(e.target.value)}
                    type="text" placeholder="Email Id" />
                  {/* <input className="input" value={userName} onChange={(e) => setUserName(e.target.value)} */}
                    {/* type="text" placeholder="User Name" /> */}
                  <input className="input" value={password} onChange={(e) => setPassword(e.target.value)}
                    type={inputType} placeholder="Password" />
                  <span>
                    <label>
                      <input checked={inputCheck} className="checkbox" type="checkbox"
                        onClick={() => checkInput()}/>
                        Show password
                    </label>
                  </span>
                  {error ? (
                    <p className="para">
                      {"You made a Mistake in password or email"}
                    </p>
                  ) : (
                    false
                  )}
                  <button className="button10" type={"submit"}>
                    Log In
                  </button>
                <p className="p">
                  Do not have an Account? <Link to="signUp">Create one</Link>
                </p>
              </div>
                </form>
              </div>
            // </div>
          )}
        </div>
      );
    };


export default SignIn;