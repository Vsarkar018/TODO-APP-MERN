import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/appContext";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import FormRow from "../components/FormRow";
function Dashboard() {
  const { isLoading, createTask, fetchTask } = useGlobalContext();
  const [task, setTask] = useState([]);
  const handleChange = (e) => {
    setTask(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (task) {
      createTask(task);
    }
  };
  // useEffect(()=>{
  //   fetchTask();
  // },[])
  return (
    <>
      <Navbar />

      <Wrapper className="page">
        <form onSubmit={handleSubmit} className="job-form">
          <FormRow
            type="name"
            value={task}
            name="Task"
            placeholder="Task"
            onChange={handleChange}
          />
          <button type="submit" className="btn" disabled={isLoading}>
            {isLoading ? "Adding task..." : "Add Task"}
          </button>
        </form>
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