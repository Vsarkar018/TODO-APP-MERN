import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../context/appContext";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import FormRow from "../components/FormRow";
function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    isLoading,
    editItem,
    fetchSingleTask,
    user,
    editTask,
    singleTaskError: error,
    alert,
  } = useGlobalContext();
  const [values, setValues] = useState({ task: "", status: "" });
  useEffect(() => {
    fetchSingleTask(id);
  }, [id]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const { task, status } = values;
      editTask(id, { task, status });
  };
  useEffect(() => {
    if (editItem) {
      const { task, status } = editItem;
      setValues({ task, status });
    }
  }, [editItem]);
  console.log(values.task, values.status);
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  if (isLoading && !editItem) {
    return <div className="loading"></div>;
  }
  if (!editItem || error) {
    return (
      <>
        {!user && navigate("/")}
        <ErrorContainer className="page">
          <h5>There was an error, Please try again later</h5>

          <Link to="/dashboard" className="btn">
            Dashboard
          </Link>
        </ErrorContainer>
      </>
    );
  }
  return (
    <>
      {!user && navigate("/")}
      <Navbar />
      {alert.showAlert && (
        <div className={`alert alert-${alert.type}`}>{alert.msg}</div>
      )}
      <Container className="page">
        <header>
          <Link to="/dashboard" className="btn btn-block back-home">
            Back to Dashboard
          </Link>
        </header>
        <form className="from" onSubmit={handleSubmit}>

          <h4>Update Task</h4>

          <div className="form-container">
            <FormRow
              type="name"
              name="task"
              value={values.task}
              handleChange={handleChange}
            />
            <div className="form-row">
              <label htmlFor="status" className="form-label">
                status
              </label>
              <select
                name="status"
                value={values.status}
                onChange={handleChange}
                className="status"
              >
                <option value="Pending">Pending</option>
                <option value="Done">Done</option>
                <option value="Discarded">Discarded</option>
                <option value="Postponed">Postponed</option>
              </select>
            </div>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </Container>
    </>
  );
}
const ErrorContainer = styled.section`
  text-align: center;
  padding-top: 6rem; ;
`;

const Container = styled.section`
  header {
    margin-top: 4rem;
  }
  .form {
    max-width: var(--max-width);
    margin-top: 2rem;
  }
  .form h4 {
    text-align: center;
  }
  .form > p {
    text-align: center;
    color: var(--green-dark);
    letter-spacing: var(--letterSpacing);
    margin-top: 0;
  }
  .status {
    background: var(--grey-100);
    border-radius: var(--borderRadius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .back-home {
    text-align: center;
    display: block;
    width: 100%;
    font-size: 1rem;
    line-height: 1.15;
    background: var(--black);
  }
  .back-home:hover {
    background: var(--grey-500);
  }
  @media (min-width: 768px) {
    .back-home {
      width: 200px;
    }
    .form h4 {
      text-align: left;
    }
    .form-container {
      display: grid;
      grid-template-columns: 1fr 1fr 100px auto;
      column-gap: 0.5rem;
      align-items: center;
    }

    .form > p {
      text-align: left;
    }
    .form-row {
      margin-bottom: 0;
    }
    .submit-btn {
      align-self: end;
    }
  }
`;
export default Edit;
