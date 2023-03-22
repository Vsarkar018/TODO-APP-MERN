import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";
import {
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  LOGOUT_USER,
  SET_LOADING,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  ALERT_OFF,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_ERROR,
  FETCH_ALL_TASKS_ERROR,
  FETCH_ALL_TASKS,
  SET_USER,
  DELETE_TASK,
  DELETE_TASK_ERROR,
  FETCH_TASK_ERROR,
  FETCH_TASK,
  EDIT_TASK,
  EDIT_TASK_ERROR,
} from "./actions";
const initialState = {
  user: null,
  isLoading: false,
  alert: {
    showAlert: false,
    type: "",
    status: "",
    msg: "",
  },
  tasks: [],
  editItem: null,
  singleTaskError: false,
};

const url = `http://localhost:5000/api/v1/`;

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };
  const register = async (userInput) => {
    setLoading();
    try {
      const { data, status } = await axios.post(`${url}auth/register`, {
        ...userInput,
      });
      console.log(data, status);
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { name: data.user.name, status: status },
      });
      localStorage.setItem(
        "user",
        JSON.stringify({ name: data.user.name, token: data.token })
      );
    } catch (error) {
      const {
        data: { msg: msg },
        status,
      } = error.response;
      dispatch({ type: REGISTER_USER_ERROR, status: status, msg: msg });
    }
  };

  const login = async (userInput) => {
    setLoading();
    try {
      const { data, status } = await axios.post(`${url}auth/login`, {
        ...userInput,
      });
      // console.log(data,status);
      console.log(data.user.name);
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { name: data.user.name, status: status },
      });
      localStorage.setItem(
        "user",
        JSON.stringify({ name: data.user.name, token: data.token })
      );
    } catch (error) {
      const {
        status,
        data: { msg: msg },
      } = error.response;
      dispatch({ type: LOGIN_USER_ERROR, status: status, msg: msg });
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: LOGOUT_USER });
  };
  const createTask = async (userInput) => {
    setLoading();
    try {
      const { token } = JSON.parse(localStorage.getItem("user"));
      const { data } = await axios.post(
        `${url}tasks`,
        { task: userInput },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      dispatch({ type: CREATE_TASK_SUCCESS, payload: data.task });
    } catch (error) {
      const {
        data: { msg: msg },
        status,
      } = error.response;
      dispatch({ type: CREATE_TASK_ERROR, status: status, msg: msg });
    }
  };
  const fetchAllTask = async () => {
    setLoading();
    try {
      const { token } = JSON.parse(localStorage.getItem("user"));
      const { data } = await axios.get(`${url}tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: FETCH_ALL_TASKS, payload: data.tasks });
    } catch (error) {
      const { status } = error.response;
      dispatch({ type: FETCH_ALL_TASKS_ERROR, status: status });
    }
  };
  const deleteTask = async (taskId) => {
    try {
      const { token } = JSON.parse(localStorage.getItem("user"));
      await axios.delete(`${url}tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchAllTask();
      dispatch({ type: DELETE_TASK });
      console.log("deletetask");
    } catch (error) {
      const {
        data: { msg: msg },
        status,
      } = error.response;
      dispatch({ type: DELETE_TASK_ERROR, msg: msg, status: status });
    }
  };
  const fetchSingleTask = async (taskId) => {
    setLoading();
    try {
      const { token } = JSON.parse(localStorage.getItem("user"));
      const { data } = await axios.get(`${url}tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: FETCH_TASK, payload: data.task });
    } catch (error) {
      const {
        data: { msg: msg },
        status,
      } = error.response;
      dispatch({ type: FETCH_TASK_ERROR, status: status, msg: msg });
    }
  };
  const editTask = async (taskId, userInput) => {
    setLoading();
    try {
      const { token } = JSON.parse(localStorage.getItem("user"));
      const { data } = await axios.patch(
        `${url}tasks/edit/${taskId}`,
        { ...userInput },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      dispatch({
        type: EDIT_TASK,
        payload: data.task,
        msg: "Updated Successfully...",
      });
    } catch (error) {
      const {
        data: { msg: msg },
        status,
      } = error.response;
      dispatch({ type: EDIT_TASK_ERROR, msg: msg, status: status });
    }
  };
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const newUser = JSON.parse(user);
      dispatch({ type: SET_USER, payload: newUser.name });
    }
  }, []);
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch({ type: ALERT_OFF });
    }, 2000);
    return () => clearTimeout(timeout);
  });
  return (
    <AppContext.Provider
      value={{
        ...state,
        setLoading,
        register,
        login,
        logout,
        createTask,
        fetchAllTask,
        deleteTask,
        fetchSingleTask,
        editTask,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
