import { act } from "react-dom/cjs/react-dom-test-utils.production.min";

export default (state, action) => {
  switch (action.type) {
    case "REMOVE_PACKAGE":
      return {
        data: state.data.filter((pack) => {
          return pack.id !== action.payload;
        }),
      };
    case "ADD_PACKAGE": {
      return { data: [...state.data, action.payload] };
    }
    case "GET_PACKAGES": {
      return { ...state, data: action.payload };
    }
    case "UPDATE_PACKAGE":
      return {
        ...state,
        data: state.data.map((item) => {
          return item.id === action.payload.id ? action.payload : item;
        }),
      };

    default:
      return state;
  }
};
