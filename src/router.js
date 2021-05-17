import { React ,useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignIn from "./signIn";
import SignUp from "./signUp";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import firebase from "./firebase";
import { setUser } from "./store/action";

const Router2 = () => {
  const { user } = useSelector((e) => e?.reducer1);
  const dispatch = useDispatch();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((isUser) => {
      dispatch(setUser(isUser));
    });
  }, []);
  if (user === "loading" )
    return (
      <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Spinner padding="100px" animation="border" variant={"success"} />
      </div>
    );
    // if(user === "user2"){
    //   return(
    //     // <SignIn />
    //     window.location.href="/"
    //   )
    // }

  return (
    <Router>
      <Route exact path={"/"} component={SignIn} />
      <Route exact path={"/SignUp"} component={SignUp} />
    </Router>
  );
};

export default Router2;