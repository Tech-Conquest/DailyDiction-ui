import React, { useContext, useState } from "react";
import "./style.css";
import { GlobalContext } from "../../core/context/context";
import { IUser } from "../../core/interface/User";
import { userCreation } from "../../core/api/utils";

const SignUp = ({ isAdmin }: { isAdmin: boolean }) => {
  const [userDetails, setUserDetails] = useState<IUser>({
    username: "",
    password: "",
    email: "",
    isAdmin: isAdmin,
  });
  const [error, setError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<String>("");
  const [isUserCreated, setUserCreated] = useState<Boolean>(false);

  const globalContex: any = useContext(GlobalContext);

  const createUser = async () => {
    setError("");
    let authenticationResult = await userCreation(userDetails);
    if (authenticationResult.status === "failure") {
      setError(authenticationResult.message);
    } else {
      setUserCreated(true);
      setError("");
      setTimeout(() => {
        globalContex.setShowSignup(false);
        globalContex.setShowLogin(true);
      }, 1000);
    }
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl login-form sign-up-form relative">
      <div
        className="switch"
        onClick={() => {
          globalContex.setShowSignup(false);
          globalContex.setShowLogin(true);
        }}
      >
        Login
      </div>
      <div className="card-body text-center justify-center">
        <h2 className="card-title justify-center">Sign up</h2>
        {error ? <p className="text-red-800">{error}</p> : null}
        {isUserCreated ? (
          <p className="text-green-800">Account created successfully</p>
        ) : null}

        <div className="form-control">
          <label className="label">
            <span className="label-text">UserName</span>
          </label>
          <input
            type="text"
            placeholder="Enter username"
            className="input input-bordered"
            required
            onChange={(event) => {
              setUserDetails((prevData) => ({
                ...prevData,
                username: event.target.value,
              }));
            }}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Enter email"
            className="input input-bordered"
            required
            onChange={(event) => {
              setUserDetails((prevData) => ({
                ...prevData,
                email: event.target.value,
              }));
            }}
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
            required
            onChange={(event) => {
              setUserDetails((prevData) => ({
                ...prevData,
                password: event.target.value,
              }));
            }}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Confirm password</span>
          </label>
          <input
            type="password"
            placeholder="Enter confirmed password"
            className="input input-bordered"
            required
            onChange={(event) => {
              if (!(event.target.value === userDetails.password)) {
                setPasswordError("password don't match");
              } else {
                setPasswordError("");
              }
            }}
          />
          {passwordError ? (
            <p className="text-red-800 text-left text-sm mt-1">
              {passwordError}
            </p>
          ) : null}
        </div>
        <div className="card-actions justify-center">
          <button className="btn login-form-btn" onClick={createUser}>
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
