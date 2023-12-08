import { createContext, useReducer } from "react";

const initinalValue = {
  toggle: false,
  selectedAll: false, // Added selectedAll property
  selectedAnimals: [], // Added selectedAnimals property
};

export const Context = createContext();

const reducer = (state = initinalValue, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_TOGGLE":
      return { ...state, toggle: payload };
    case "TOGGLE_ANIMAL_SELECTION":
      const selectedAnimals = state.selectedAnimals.includes(payload)
        ? state.selectedAnimals.filter((animalId) => animalId !== payload)
        : [...state.selectedAnimals, payload];

      return { ...state, selectedAnimals, selectedAll: false };

    case "SELECT_ALL_ANIMALS":
       return {
         ...state,
         selectedAll: payload.length > 0,
         selectedAnimals: payload,
       };
    default:
      return { state };
  }
};

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initinalValue);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default Provider;
