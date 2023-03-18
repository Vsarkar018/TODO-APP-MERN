import {
  LOGOUT_USER,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  SET_LOADING,
  SET_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  ALERT_OFF
} from "./actions";

const reducer = (state, action) => {
  if (action.type === SET_LOADING) {
    return { ...state, isLoading: true, showAlert: false };
  }

  if (action.type === REGISTER_USER_SUCCESS) {
    return { ...state, isLoading: false, user: action.payload.name,alert:{
      showAlert:true,type:"success",status:action.payload.status
    } };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return { ...state, isLoading: false, user: action.payload.name};
  }

  if (action.type === REGISTER_USER_ERROR) {
    return { ...state, isLoading: false, user: null, alert:{showAlert:true,type:"danger",status:action.status} };
  }
  if (action.type === LOGIN_USER_ERROR) {
    return { ...state, isLoading: false, user: null, alert:{showAlert: true,type:"danger",status:action.status} };
  }
  if (action.type === SET_USER) {
    return { ...state, user: action.payload };
  }
  if (action.type === LOGOUT_USER) {
    return { ...state, user: null, showAlert: false };
  }
if(action.type===ALERT_OFF){
  return { ...state, alert:{showAlert: false,type:"",status:"" }};
}
  throw new Error(`no such action : ${action}`);
};

export default reducer;
