"use client";
import { createContext, useReducer, useContext, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext();

export const ProductReducer = (state, action) => {
  switch (action.type) {
    case "set_product":
      return {
        product: action.payload,
      };
    case "create_product":
      return {
        product: [action.payload, ...state.product],
      };
    case "delete_product":
      return {
        product: state.product.filter(
          (item) => item._id !== action.payload._id
        ),
      };
    case "edit_product":
      return {
        product: state.product.map((item) =>
          item._id === action.payload._id
            ? { ...item, ...action.payload }
            : item
        ),
      };
    default:
      return state;
  }
};

export const ProductContextPovider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductReducer, { product: "" });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/v1/product"
        );
        dispatch({ type: "set_product", payload: data });
      } catch (error) {
        console.log("error");
      }
    };
    fetchProduct();
  }, []);

  return (
    <ProductContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export function useProductContext() {
  return useContext(ProductContext);
}
