import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormRow from "../components/FormRow";
import { useGlobalContext } from "../context/appContext";
import styled from "styled-components";
function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const { user, login, isLoading, alert } = useGlobalContext();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    login(values);
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <>
      {/* {console.log(user)} */}
      {user && navigate("/dashboard")}
      <Wrapper className="page full-page">
        <div className="container">
          {alert.showAlert && (
            <div className={`alert alert-${alert.type}`}>
              Incorrect email or pssword
            </div>
          )}
          <form className="form" onSubmit={handleSubmit}>
            <h4>Login</h4>
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
              {isLoading ? "Fetching User..." : "Login"}
            </button>
            <p>
              Don't have an account ?<Link to="/register"> Register here</Link>
            </p>
          </form>
        </div>
      </Wrapper>
    </>
  );
}

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
export default Login;
