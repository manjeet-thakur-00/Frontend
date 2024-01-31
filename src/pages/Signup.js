import React, { useState } from "react";
import Input from "../components/common/Input.js";
import Button from "../components/common/Button.js";
import { useNavigate } from "react-router-dom";
import './Css/Signup.css';

function Signup() {
    const BaseUrl = "http://localhost:5000/api/v1";
    const navigate = useNavigate();

    const initialValue = {
        Name: "",
        Email: "",
        Password: "",
        ConfirmPassword: "",
        MobileNo: "",
    };

    const [userInfo, setUserinfo] = useState(initialValue);
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const onhandleChange = (e) => {
        setUserinfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        });

        // Clear password and confirm password errors on input change
        setPasswordError("");
        setConfirmPasswordError("");
    };

    const validatePassword = () => {
        if (userInfo.Password.length < 8) {
            setPasswordError("Password must be at least 8 characters and one special chracter with uppercase letter.");
            return false;
        }

        return true;
    };

    const validateConfirmPassword = () => {
        if (userInfo.Password !== userInfo.ConfirmPassword) {
            setConfirmPasswordError("Passwords do not match.");
            return false;
        }

        return true;
    };

    const postedData = async () => {
        try {
            if (validatePassword() && validateConfirmPassword()) {
                const requestOption = {
                    method: "POST",
                    headers: {
                        "content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userName: userInfo.Name,
                        email: userInfo.Email,
                        password: userInfo.Password,
                        confirmPassword: userInfo.ConfirmPassword,
                        mobileNo: userInfo.MobileNo,
                    }),
                };

                const responce = await fetch(`${BaseUrl}/register`, requestOption);
                if (!responce.ok) {
                    throw new Error(`HTTP ERROR ${responce.status}`);
                }

                const data = await responce.json();
                console.log(`Post request successful ${data}`);
                navigate("/login");
            }
        } catch (error) {
            console.log("ERROR IN POST REQUEST", error.message);
        }
    };

    const submitData = (e) => {
        e.preventDefault();
        postedData();
    };

    return (
        <div className="full">
            <div className="form">
                <h1>Sign Up</h1>
                <form onSubmit={submitData}>
                    <Input
                        type="text"
                        value={userInfo.Name}
                        name="Name"
                        onChange={onhandleChange}
                        placeholder="Name"
                        required={true}
                        className="text"
                    />
                    <Input
                        type="email"
                        value={userInfo.Email}
                        name="Email"
                        onChange={onhandleChange}
                        placeholder="Email"
                        required={true}
                        className="text"
                    />
                    <Input
                        type="password"
                        value={userInfo.Password}
                        name="Password"
                        onChange={onhandleChange}
                        placeholder="Password"
                        required={true}
                        className="text"
                    />
                    {passwordError && <p className="error-message">{passwordError}</p>}
                    <Input
                        type="Password"
                        value={userInfo.ConfirmPassword}
                        name="ConfirmPassword"
                        onChange={onhandleChange}
                        placeholder="ConfirmPassword"
                        required={true}
                        className="text"
                    />
                    {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
                    <Input
                        type="text"
                        value={userInfo.MobileNo}
                        name="MobileNo"
                        onChange={onhandleChange}
                        placeholder="MobileNo"
                        required={true}
                        className="text"
                    />
                    <button type="submit" className="btn"  >signup</button>

                </form>
                <p className="para">Already have an account</p>
                <Button to="/login" className="btn1" text="login" />
            </div>
        </div>
    );
}

export default Signup;
