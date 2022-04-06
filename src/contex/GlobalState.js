import axios from "axios";
import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import useToken from "../components/useToken";

const initialState = {
  data: [],
};

export const GlobalContex = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const { token, user } = useToken();

  //GET PACKAGES
  function getPackages() {
    axios
      .get(`https://tracking-core.herokuapp.com/packages/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((data) => {
        dispatch({
          type: "GET_PACKAGES",
          payload: data.data,
        });
      });
  }

  //REMOVE PACKAGE
  function removePackage(id) {
    axios
      .delete(`https://tracking-core.herokuapp.com/packages/${id}`)
      .then((res) => {
        dispatch({
          type: "REMOVE_PACKAGE",
          payload: id,
        });
      });
  }

  //ADD PACKAGE
  const addPackage = (name, number, description) => {
    const body = {
      archived: false,
      trackingInfo: null,
      name: name,
      trackingNumber: number,
      description: description,
      user: user.id,
    };
    axios
      .post("https://tracking-core.herokuapp.com/packages", body)
      .then((res) => {
        dispatch({
          type: "ADD_PACKAGE",
          payload: res.data,
        });
      });
  };

  //   UPDATE PACKAGE

  function updatePackage(pck, status) {
    pck.archived = status;
    axios
      .put(`https://tracking-core.herokuapp.com/packages/${pck.id}`, pck)
      .then((res) => {
        console.log(res);
        dispatch({
          type: "UPDATE_PACKAGE",
          payload: res.data,
        });
      });
  }

  return (
    <GlobalContex.Provider
      value={{
        data: state.data,
        removePackage,
        addPackage,
        updatePackage,
        getPackages,
      }}
    >
      {children}
    </GlobalContex.Provider>
  );
};
