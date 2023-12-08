/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from "react";
import { Data } from "../../data/jummy";
import { useAnimalSummaryContext } from "../../hooks/useAnimalSummaryContext";
import { Context } from "../../Context";

const Sidebar = () => {
  const animalData = useAnimalSummaryContext();
  const { state, dispatch } = useContext(Context);

  console.log(state)

  let [activeIcon, setActiveIcon] = useState("fa-solid fa-paw");

  const ClickedIcon = (iconName) => {
    if (iconName.icon === activeIcon) {
      dispatch({ type: "SET_TOGGLE", payload: !state.toggle });
    } else {
      dispatch({ type: "SET_TOGGLE", payload: true });
      setActiveIcon(iconName.icon);
    }
  };

  const handleToggleAnimalSelection = (animalId) => {
    dispatch({ type: "TOGGLE_ANIMAL_SELECTION", payload: animalId });
  };

  const handleSelectAllAnimals = () => {
    const allAnimalIds = animalData.animalSummary.map((data) => data.id);
    const allSelected = state.selectedAnimals.length === allAnimalIds.length;

    dispatch({
      type: "SELECT_ALL_ANIMALS",
      payload: allSelected ? [] : allAnimalIds,
    });
  };

  return (
    <div className={`relative`}>
      <div className="h-full z-50 fixed drop-shadow-2xl md:drop-shadow flex">
        <div className="flex-col  md:overflow-auto overflow-hidden justify- items-start  flex bg-slate-100 min-h-full w-[76px]">
          <div className="w-full bg-green-700 p-2 flex flex-col flex-wrap cursor-pointer ">
            <span className="text-orange-700 font-bold text-left">ANIMAL</span>
            <span className="font-bold text-orange-300 text-left">WATCH</span>
            <span className="font-bold text-orange-500 text-left">SYSTEM</span>
          </div>
          <div className="cursor-pinter  grid grid-cols-1 place-content-center place-items-center">
            {Data.map((icon, index) => {
              return (
                <button
                  className={`w-full p-2  grid grid-cols-1 place-content-center place-items-center  ${
                    activeIcon === icon.icon ? "bg-white border-y-[2px]" : ""
                  }`}
                  key={index}
                  onClick={() => {
                    ClickedIcon(icon);
                  }}
                >
                  <i className={`${icon.icon} text-xl `}></i>
                  <span className="text-xs uppercase">{icon.text}</span>
                </button>
              );
            })}
            {/* <button className="absolute inset-x-0 bottom-0 w-full p-2  grid grid-cols-1 place-content-center place-items-center hover:bg-white">
              <i className="fa-solid fa-user text-xl"></i>
              <span className="text-xs uppercase">My aws </span>
            </button> */}
          </div>
        </div>
        <div
          className={` ${
            state.toggle ? "block" : "hidden"
          } w-56 h-full overflow-hidden md:overflow-auto py-6 bg-white border-r border-neutral-200 flex-col justify-start items-start gap-4 inline-flex mt-[48px]`}
        >
          <h4 className="uppercase px-3.5 text-sm font-bold">Animal List</h4>
          <div className="flex px-3.5">
            <input
              type="checkbox"
              className="shrink-0 mt-0.5 border-gray-200 rounded text-orange-600 focus:ring-transparent disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
              id="hs-checked-checkbox"
              checked={state.selectedAll}
              onChange={handleSelectAllAnimals}
            />
            <label
              htmlFor="hs-checked-checkbox"
              className="text-sm text-gray-500 ms-3 "
            >
              Select All
            </label>
          </div>
          {animalData &&
            animalData.animalSummary.map((data, index) => {
              return (
                <div
                  key={index}
                  className="self-stretch duration-300 cursor-pointer px-[18px] py-3.5 justify-start items-center gap-3 inline-flex"
                >
                  <div className="flex items-center ">
                    <input
                      type="checkbox"
                      id="hs-xs-switch"
                      className="relative w-[28px] h-[17px] bg-gray-500 
                      border-transparent text-transparent rounded-full cursor-pointer 
                      transition-colors ease-in-out duration-200 focus:ring-transparent disabled:opacity-50
                       disabled:pointer-events-none checked:bg-none checked:text-orange-600 checked:border-orange-600 
                       focus:checked:border-orange-600 
                      before:inline-block before:w-3 before:h-3 before:bg-white 
                      checked:before:bg-blue-200 before:translate-x-[2px] before:-translate-y-1 checked:before:translate-x-full 
                      before:rounded-full before:shadow before:transform before:ring-0 before:transition 
                      before:ease-in-out before:duration-200"
                      checked={state.selectedAnimals.includes(data.id)}
                      onChange={() => handleToggleAnimalSelection(data.id)}
                    />
                    <label
                      htmlFor="hs-xs-switch"
                      className="text-sm text-gray-500 ms-3 dark:text-gray-400"
                    >
                      {data.name} {data.id}
                    </label>
                    <span
                      className="w-3 h-3 rounded-full ms-2"
                      style={{
                        background: `rgb(${data.color})`,
                      }}
                    ></span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
