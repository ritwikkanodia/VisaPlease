import React, { Component, useState } from "react";
import { Link,useHistory } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import { generateUserDocument } from "../../utils/firestore";
import "../Dashboard/calculator.css"
const SignIn = () => {
  const history=useHistory()
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const registerAccount = async () => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      generateUserDocument(user, { firstName, lastName });
      history.push("/dashboard")
      window.location.reload()
    } catch (err) {
      setError("Error Signing up with email and password");
    }
  };

  return (
    <div className="sign-up">
    <div id="log">
      <h3>Sign Up</h3>

      <div className="form-group">
        <label>First name</label>
        <input
          type="text"
          className="form-control"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Last name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
</div>
      <button
        type="submit"
        className="btn btn-primary btn-block"
        onClick={() => registerAccount()}
      >
        Sign Up
      </button>
      <p className="forgot-password text-right">
        Already registered <Link to="/auth/login">sign in?</Link>
      </p>
    </div>
  );
};
export default SignIn;
