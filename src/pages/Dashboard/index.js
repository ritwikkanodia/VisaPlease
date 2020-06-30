import React, { useEffect, useState } from "react";
import { auth, firestore } from "../../firebaseConfig";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Cookies from "universal-cookie";
import Track from "./../Dashboard/track";
import Calculator from "./calculator";
import Profile from "../Dashboard/Profile"
import MerchantLocator from "./merchantLocator";
import SidePanel from "./components/sidePanel";
import ScoreDisplay from "./Display/ScoreDisplay";
import "./calculator.css"
const Dashboard = () => {
  const cookies = new Cookies();
  const userid = cookies.get("userid");
  const [firstName, setFirstName] = useState();

  useEffect(() => {
    async function fetchInfo() {
      const userRef = firestore.doc(`users/${userid}`);
      const snapshot = await userRef.get();
      const userData = snapshot.data();      
      if(!userData)
        window.location = "/auth"
      setFirstName(userData.firstName);
    }
    fetchInfo();
  });

  const logout = async () => {
    await cookies.remove("userid", { path: '/' })
    window.location = "/auth"
  }
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light border-bottom fixed-top">
        <div className="container">
          <Link id="visa" className="navbar-brand visa">
            VRecover
          </Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link id="Login" className="nav-link" to="/dashboard/profile">Profile</Link>
              </li>
              <li className="nav-item">
                <Link id="Login" className="nav-link" onClick={()=>logout()}>LogOut</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-3 col-12 d-none d-sm-block px-0">
            <SidePanel />
          </div>
          <div className="col-sm-9 pt-5">
            <Switch>
              <Route path="/" exact component={Track} />
              <Route path="/dashboard/ScoreDisplay" exact component={ScoreDisplay} />
              <Route path="/dashboard/calculator" component={Calculator} />
              <Route path="/dashboard/locator" component={MerchantLocator} />
              <Route path="/dashboard/profile" component={Profile} />
              <Route path="/dashboard" component={Track} />
             
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
};
export default Dashboard;
