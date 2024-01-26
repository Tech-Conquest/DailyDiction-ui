import React, { useContext, useState } from "react";
import "./style.css";
import { GlobalContext } from "../../core/context/context";
import { authenticateUser } from "../../core/api/utils";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const globalContex: any = useContext(GlobalContext);
  const navigate = useNavigate();
  const loginUser = async () => {
    setError("");
    let authenticationResult = await authenticateUser({
      username: userName,
      password: password,
    });
    if (authenticationResult.status === "failure") {
      setError(authenticationResult.message);
    } else {
      globalContex.setIsLoggedIn(true);
      navigate("/admin/upload");
    }
  };
  return (
    <div className="card w-96 bg-base-100 shadow-xl login-form relative">
      <div
        className="switch"
        onClick={() => {
          globalContex.setShowSignup(true);
          globalContex.setShowLogin(false);
        }}
      >
        Sign up
      </div>
      <div className="card-body text-center justify-center">
        <h2 className="card-title justify-center">Login</h2>
        {error ? <p className="text-red-800">{error}</p> : null}
        <div className="form-control">
          <label className="label">
            <span className="label-text">UserName</span>
          </label>
          <input
            type="text"
            placeholder="Enter username"
            className="input input-bordered"
            onChange={(event) => setUserName(event.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="Enter password"
            className="input input-bordered"
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <div className="card-actions justify-center">
          <button className="btn login-form-btn" onClick={loginUser}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
