import React, { useState } from "react";
// import Button from "../common/Button";
import "../../pages/Css/Signup.css";
import Input from "../common/Input.js";

function SendMail() {
    const BaseUrl = "http://localhost:5000/api/v1";

    const [userInfo, setUserinfo] = useState("");

    const onhandleChange = (e) => {
        setUserinfo({
            userInfo,
            [e.target.name]: e.target.value,
        });
    };
    const postedData = async () => {
        try {
            const requestOption = {
                method: "POST",
                headers: {
                    "content-Type": "application/json",
                },
                body: JSON.stringify({ email: userInfo.Email }),
            };

            const responce = await fetch(`${BaseUrl}/sendmail`, requestOption);
            if (!responce.ok) {
                throw new Error(`HTTP ERROR ${responce.status}`);
            }
            const data = await responce.json();
            console.log(`Post request succesfull ${data}`);
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
                <form onSubmit={submitData}>
                    <Input
                        type="email"
                        value={userInfo.Email}
                        name="Email"
                        onChange={onhandleChange}
                        placeholder="Email"
                        required={true}
                        className="text"
                    />
                    <button type='submit' className="btn">Send Mail</button>
                </form>
            </div>
        </div>
    );
}

export default SendMail;
