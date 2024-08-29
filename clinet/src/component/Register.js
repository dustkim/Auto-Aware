import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopList from "./TopList";
import "../css/Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [classValue, setClassValue] = useState("");
  const [registerDate, setRegisterDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // submit 시 기본 폼 제출 방지
    // Handle registration logic here
    console.log("Registration submitted:", {
      name,
      class: classValue,
      registerDate,
    });
  };

  return (
    <div className="register-container">
      <TopList activeItem="Register" />
      <div className="register-main">
        <div className="register-left">
          <div className="id-section">#ID</div>
          <div className="upload-section">
            <div className="upload-circle">
              <i className="download-icon">⬇</i>
            </div>
          </div>
        </div>
        <div className="register-right">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Class</label>
              <input
                type="text"
                value={classValue}
                onChange={(e) => setClassValue(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Register date</label>
              <input
                type="date"
                value={registerDate}
                onChange={(e) => setRegisterDate(e.target.value)}
              />
            </div>
            <div className="button-group">
              <button type="button" onClick={() => navigate(-1)}>
                Back
              </button>
              <button type="submit">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
