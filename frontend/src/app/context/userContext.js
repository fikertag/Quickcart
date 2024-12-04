"use client";
import { createContext, useReducer, useContext, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserReducer = (state, action) => {
  switch (action.type) {
    case "set_user":
      return {
        user: action.payload,
      };
    case "create_user":
      return {
        user: [action.payload, ...state.user],
      };
    case "delete_user":
      return {
        user: state.user.filter((item) => item._id !== action.payload._id),
      };
    case "edit_user":
      return {
        user: state.user.map((item) =>
          item._id === action.payload._id
            ? { ...item, ...action.payload }
            : item
        ),
      };
    default:
      return state;
  }
};

export const UserContextPovider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, { User: "" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/v1/User");
        dispatch({ type: "set_user", payload: data });
      } catch (error) {
        console.log("error");
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUserContext() {
  return useContext(UserContext);
}
