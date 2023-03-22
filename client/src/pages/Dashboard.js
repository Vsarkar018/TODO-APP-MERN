import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/appContext";
import Navbar from "../components/Navbar";
import FormRow from "../components/FormRow";
import Tasks from "../components/tasks";

function Dashboard() {
  const { isLoading, createTask, fetchAllTask, alert } = useGlobalContext();
  const [task, setTask] = useState("");
  const handleChange = (e) => {
    setTask(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (task) {
      createTask(task);
      setTask("");
    }
  };
  useEffect(()=>{
    fetchAllTask();
  },[])
  return (
    <>
      <Navbar />

      <Wrapper className="page">
        {alert.showAlert && (
          <div className="alert alert-danger">
            {alert.msg}
          </div>
        )}
        <form className="job-form" onSubmit={handleSubmit}>
          <FormRow
            type="name"
            name="task"
            value={task}
            handleChange={handleChange}
            horizontal
            placeholder="task"
          />
          <button type="submit" className="btn" disabled={isLoading}>
            {isLoading ? "Adding New Task..." : "Add Task"}
          </button>
        </form>

        <Tasks />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.section`
  padding: 3rem 0;

  .job-form {
    background: var(--white);
    display: grid;
    row-gap: 1rem;
    column-gap: 0.5rem;
    align-items: center;
    margin-bottom: 3rem;
    border-radius: var(--borderRadius);
    padding: 1.5rem;
    .form-input {
      padding: 0.75rem;
    }

    .form-input:focus {
      outline: 1px solid var(--primary-500);
    }
    .form-row {
      margin-bottom: 0;
    }
    .btn {
      padding: 0.75rem;
    }
    @media (min-width: 776px) {
      grid-template-columns: 1fr 1fr auto;
      .btn {
        height: 100%;
        padding: 0 2rem;
      }
      column-gap: 2rem;
    }
  }
  .alert {
    max-width: var(--max-width);
    margin-bottom: 1rem;
  }
`;

export default Dashboard;
