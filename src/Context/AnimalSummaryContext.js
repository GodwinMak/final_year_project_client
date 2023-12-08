import React, { createContext, useReducer, useEffect } from "react";
import axios from 'axios'

export const AnimalSummaryContext = createContext();

const initialState = {
  animalSummary: [],
};

export const animalSummaryReducer = (state, action) => {
  switch (action.type) {
    case "SET_ANIMAL_SUMMARY":
    //   const newAnimalSummary = action.payload;
    //   const storedAnimalSummary =
        // JSON.parse(localStorage.getItem("animalSummary")) || [];

    //   if (
    //     JSON.stringify(newAnimalSummary) !== JSON.stringify(storedAnimalSummary)
    //   ) {
    //     // localStorage.setItem("animalSummary", JSON.stringify(newAnimalSummary));
    //     return { ...state, animalSummary: newAnimalSummary };
    //   }

      // If the data is the same, don't update the context
    //   return state;
        return { ...state, animalSummary: action.payload }; 
    default:
      return state;
  }
};

export const AnimalSummaryProvider = ({ children }) => {


  const [state, dispatch] = useReducer(animalSummaryReducer, initialState);

  useEffect(() => {
    const getAnimalSummary = async () => {
      try {
        const animalSummary = await axios.get(
          "https://apiv2.at.patrickmamsery.co.tz/api/animals/getAnimalSummary"
        );
        dispatch({ type: "SET_ANIMAL_SUMMARY", payload: animalSummary.data });
      } catch (error) {
        console.log(error);
      }
    };
    getAnimalSummary();
  }, []); // Ensure this dependency array is empty if you want to run it once on mount
  return (
    <AnimalSummaryContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AnimalSummaryContext.Provider>
  );
};
