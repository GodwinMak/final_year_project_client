/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";

import io from "socket.io-client";

const ENDPOINT = "https://apiv2.at.patrickmamsery.co.tz/api/socket"; // Replace with your Socket.IO server URL

export const AnimalContext = createContext();

const initialState = {
  animalData: [],
  path: []
};

export const animalReducer = (state, action) => {
  switch (action.type) {
    case "SET_ANIMAL_DATA":
      return { ...state, animalData: action.payload };
    case "ADD_ANIMAL":
      return { ...state, animalData: [...state.animalData, action.payload] };
    case "SET_PATH":
      return { ...state, path: action.payload };
    case "ADD_COORDINATES_TO_PATH":
      const { animal_TagId, animal_location } = action.payload;
      // Find the animal in the path array based on animal_TagId
      const updatedPath = state.path.map((animal) =>
        animal.animal_TagId === animal_TagId
          ? { ...animal, path: [...animal.path, animal_location.coordinates] }
          : animal
      );
      return { ...state, path: updatedPath };
    default:
      return state;
  }
};

export const AnimalContextProvider = ({ children }) => {
  const socket = io.connect(ENDPOINT);

  const [state, dispatch] = useReducer(animalReducer, initialState);

  useEffect(() => {
    // Connect to Socket.IO server

    // Listen for newAnimalData events from the server
    socket.on("newAnimalData", (newData) => {
      console.log(newData)
      dispatch({ type: "ADD_ANIMAL", payload: newData });
      dispatch({ type: "ADD_COORDINATES_TO_PATH", payload: newData });
    });

    // Clean up the socket connection when the component unmounts
    return () => socket.disconnect();
  }, [socket]);

  const getAnimalData = async () => {
    try {
      const placeholderData = await axios.get(
        "https://apiv2.at.patrickmamsery.co.tz/api/animals/getLastThreeMonthsData"
      );

      dispatch({
        type: "SET_ANIMAL_DATA",
        payload: placeholderData.data.animalsData,
      });
      dispatch({
        type: "SET_PATH",
        payload: placeholderData.data.result
      })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AnimalContext.Provider value={{ state, getAnimalData }}>
      {children}
    </AnimalContext.Provider>
  );
};
