import {
  LOGOUT_USER,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  SET_LOADING,
  SET_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  ALERT_OFF,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_ERROR,
  FETCH_ALL_TASKS,
  FETCH_ALL_TASKS_ERROR,
  SET_USER_ERROR,
  DELETE_TASK,
  DELETE_TASK_ERROR,
  FETCH_TASK,
  FETCH_TASK_ERROR,
  EDIT_TASK,
  EDIT_TASK_ERROR,
} from "./actions";

const reducer = (state, action) => {
  if (action.type === SET_LOADING) {
    return { ...state, isLoading: true, showAlert: false };
  }

  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.name,
      alert: {
        showAlert: true,
        type: "success",
        status: action.payload.status,
      },
    };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return { ...state, isLoading: false, user: action.payload.name };
  }

  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      user: null,
      alert: {
        showAlert: true,
        type: "danger",
        status: action.status,
        msg: action.msg,
      },
    };
  }
  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      user: null,
      alert: {
        showAlert: true,
        type: "danger",
        status: action.status,
        msg: action.msg,
      },
    };
  }
  if (action.type === SET_USER) {
    return { ...state, user: action.payload };
  }
  if (action.type === SET_USER_ERROR) {
    return { ...state, user: null };
  }

  if (action.type === LOGOUT_USER) {
    return { ...state, user: null, showAlert: false };
  }
  if (action.type === ALERT_OFF) {
    return { ...state, alert: { showAlert: false, type: "", status: "" } };
  }
  if (action.type === CREATE_TASK_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      tasks: [...state.tasks, action.payload],
    };
  }
  if (action.type === CREATE_TASK_ERROR) {
    return {
      ...state,
      isLoading: false,
      alert: { showAlert: true, type: "danger", status: action.status , msg:action.msg },
    };
  }

  if (action.type === SET_USER) {
    return { ...state, user: action.payload };
  }
  if (action.type === FETCH_ALL_TASKS) {
    return {
      ...state,
      isLoading: false,
      alert: {
        showAlert: false,
        type: "",
        status: "",
      },
      tasks: action.payload,
      editItem: null,
      singleJobError: false,
      editComplete: false,
    };
  }
  if (action.type === FETCH_ALL_TASKS_ERROR) {
    return { ...state, isLoading: false };
  }
  if (action.type === DELETE_TASK) {
    return { ...state, isLoading: false };
  }
  if (action.type === DELETE_TASK_ERROR) {
    return {
      ...state,
      isLoading: false,
      alert: { showAlert: true, status: action.status, msg: action.msg },
    };
  }
  if (action.type === FETCH_TASK) {
    return { ...state, isLoading: false, editItem: action.payload };
  }
  if (action.type === FETCH_TASK_ERROR) {
    return { ...state, isLoading: false, editItem: "", singleTaskError: true };
  }
  if (action.type === EDIT_TASK) {
    return {
      ...state,
      isLoading: false,
      editItem: action.payload,
      alert: { showAlert: true, type: "success", msg: action.msg },
    };
  }
  if (action.type === EDIT_TASK_ERROR) {
    return {
      ...state,
      isLoading: false,
      alert: {
        showAlert: true,
        type: "danger",
        status: action.status,
        msg: action.msg,
      },
    };
  }
  throw new Error(`no such action : ${action}`);
};

export default reducer;
