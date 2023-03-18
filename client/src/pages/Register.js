import React, { useState } from "react";
import { useGlobalContext } from "../context/appContext";
import { Link, useNavigate } from "react-router-dom";
import FormRow from "../components/FormRow";
import styled from "styled-components";
const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { user, register, isLoading, alert } = useGlobalContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    register(values);
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  return (
    <>
      {user && navigate("/dashboard")}
      <Wrapper className="page full-page">
        <div className="container">
          {alert.showAlert && (
            <div className={`alert alert-${alert.type}`}>
              {alert.type === "success"
                ? "Registration Successful"
                : alert.status === 500
                ? "Email Already Exist"
                : "Please enter a Valid password"}
            </div>
          )}
          <form className="form" onSubmit={handleSubmit}>
            <h4>Register</h4>
            <FormRow
              type="name"
              name="name"
              value={values.lastName}
              handleChange={handleChange}
            />
            <FormRow
              type="email"
              name="email"
              value={values.email}
              handleChange={handleChange}
            />
            <FormRow
              type="password"
              name="password"
              value={values.password}
              handleChange={handleChange}
            />

            <button
              type="submit"
              className="btn btn-block"
              disabled={isLoading}
            >
              {isLoading ? "Registering user..." : "Register"}
            </button>
            <p>
              Already an member ?<Link to="/login"> Login here</Link>
            </p>
          </form>
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400;
    border-top: 5px solid var(--primary-500);
  }

  h4 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
  }
`;
export default Register;
