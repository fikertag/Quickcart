"use client";
import { createContext, useReducer, useContext, useEffect } from "react";
import axios from "axios";

export const CatagoryContext = createContext();

export const CatagoryReducer = (state, action) => {
  switch (action.type) {
    case "set_catagory":
      return {
        catagory: action.payload,
      };
    case "create_catagory":
      return {
        catagory: [action.payload, ...state.catagory],
      };
    case "delete_catagory":
      return {
        catagory: state.catagory.filter(
          (item) => item._id !== action.payload._id
        ),
      };
    case "edit_catagory":
      return {
        catagory: state.catagory.map((item) =>
          item._id === action.payload._id
            ? { ...item, ...action.payload }
            : item
        ),
      };
    default:
      return state;
  }
};

export const CatagoryContextPovider = ({ children }) => {
  const [state, dispatch] = useReducer(CatagoryReducer, { catagory: "" });

  useEffect(() => {
    const fetchCatagory = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/v1/catagory"
        );
        dispatch({ type: "set_catagory", payload: data });
      } catch (error) {
        console.log("error");
      }
    };
    fetchCatagory();
  }, []);

  return (
    <CatagoryContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CatagoryContext.Provider>
  );
};

export function useCatagoryContext() {
  return useContext(CatagoryContext);
}
