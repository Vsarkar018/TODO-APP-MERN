import axios from "axios";
import React, { useContext,useEffect,useReducer } from "react";
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
  CREATE_TASK_ERROR
} from "./actions";
const initialState = {
  user: null,
  isLoading: false,
  alert: {
    showAlert:false,
    type:"",
    status:""
  },
  tasks:[]
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };
  const register = async (userInput) => {
    setLoading();
    try {
       const {data,status} =  await axios.post(
        `http://localhost:5000/api/v1/auth/register`,
        {
          ...userInput,
        }
      )
      console.log(data,status);
        dispatch({ type: REGISTER_USER_SUCCESS, payload:{name:data.user.name,status:status}});
        localStorage.setItem(
          "user",
          JSON.stringify({ name: data.user.name, token: data.token })
        );

    } catch (error) { 
      const {data,status} = error.response;
      console.log(data,status);
      dispatch({ type: REGISTER_USER_ERROR ,status:status});
    }
  };

  const login = async (userInput) => {
    setLoading();
    try {
      const { data,status } = await axios.post(
        `http://localhost:5000/api/v1/auth/login`,
        {
          ...userInput,
        }
      );
      // console.log(data,status);
      console.log(data.user.name);
      dispatch({ type: LOGIN_USER_SUCCESS, payload:{ name:data.user.name,status:status }});
      localStorage.setItem(
        "user",
        JSON.stringify({ name: data.user.name, token: data.token })
      );
    } catch (error) {
      const {status} = error.response
      dispatch({ type: LOGIN_USER_ERROR,status:status });
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: LOGOUT_USER });
  };
  const createTask = async (userInput) =>{
    try {
      const { data, status } = await axios.post(
        `http://localhost:5000/api/v1/task/`,
        userInput
      );
      dispatch({type:CREATE_TASK_SUCCESS, payload:data.task})
    } catch (error) {
      const {status} = error.response;
      dispatch({type: CREATE_TASK_ERROR , status:status})
    }
  }
  // useEffect(() => {
  //   const user = localStorage.getItem("user");
  //   if (user) {
  //     const newUser = JSON.parse(user);
  //     dispatch({ type: SET_USER, payload: newUser.name });
  //   }
  // }, []);
    useEffect(() => {
      const timeout = setTimeout(() => {
        dispatch({type:ALERT_OFF});
      }, 2000);
      return () => clearTimeout(timeout);
    });
  return (
    <AppContext.Provider
      value={{ ...state, setLoading, register, login, logout }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
