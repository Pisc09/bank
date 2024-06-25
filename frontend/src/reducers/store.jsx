import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

// Initial state
const initialState = {
  firstName: "",
  lastName: "",
  userName: "",
  previousUserName: "",
  isEditing: false,
};

// Actions
export function setUser(user) {
  return {
    type: "SET_USER",
    payload: user,
  };
}

export function setUserName(userName) {
  return {
    type: "SET_user",
    payload: userName,
  };
}

export function setEditing(isEditing) {
  return {
    type: "SET_EDITING",
    payload: isEditing,
  };
}

export function resetUserName() {
  return {
    type: "RESET_USER",
  };
}

export function saveUserName() {
  return {
    type: "SAVE_USER",
  };
}

// Reducer
function userReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        userName: action.payload.userName,
        previousUserName: state.userName,
      };
    case "SET_user":
      return {
        ...state,
        userName: action.payload,
      };
    case "SAVE_USER":
      return {
        ...state,
        previousUserName: state.userName,
      };
    case "SET_EDITING":
      return {
        ...state,
        isEditing: action.payload,
      };
    case "RESET_USER":
      return {
        ...state,
        userName: state.previousUserName,
      };
    default:
      return state;
  }
}

// Store
const middleware = [];
export const store = createStore(
  userReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
