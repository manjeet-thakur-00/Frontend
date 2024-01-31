import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Input from "../common/Input.js";
import Button from "../common/Button.js";
import "../../pages/Css/Signup.css";
import { useNavigate } from "react-router-dom";
function ResetPassword() {
    const BaseUrl = "http://localhost:5000/api/v1";
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        newPassword: "",
        confirmPassword: "",
        token: "",
    });

    // console.log(userInfo, userInfo.token);

    useEffect(() => {
        const tokenFromParams = searchParams.get("token");
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            token: tokenFromParams || "",
        }));
    }, [searchParams]);

    const handleChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        });
    };

    const postData = async () => {
        try {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
                body: JSON.stringify({
                    newPassword: userInfo.newPassword,
                    confirmPassword: userInfo.confirmPassword,
                }),
            };

            const response = await fetch(`${BaseUrl}/resetpassword`, requestOptions);

            if (!response.ok) {
                throw new Error(`HTTP ERROR ${response.status}`);
            }

            const data = await response.json();
            console.log(`Post request successful ${data}`);
            navigate("/login");
        } catch (error) {
            console.error("ERROR IN POST REQUEST", error.message);
        }
    };

    const submitData = (e) => {
        e.preventDefault();
        postData();
    };

    return (
        <div className="full">
            <div className="form">
                <h1>Reset Password</h1>
                <form onSubmit={submitData}>
                    <Input
                        type="password"
                        value={userInfo.newPassword}
                        name="newPassword"
                        onChange={handleChange}
                        placeholder="New Password"
                        required={true}
                        className="text"
                    />
                    <Input
                        type="password"
                        value={userInfo.confirmPassword}
                        name="confirmPassword"
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        required={true}
                        className="text"
                    />
                    <button type='submit' className="btn">Reset Password</button>
                </form>
                <Button to="/" className="btn1" text="Back to Page" />
            </div>
        </div>
    );
}

export default ResetPassword;
