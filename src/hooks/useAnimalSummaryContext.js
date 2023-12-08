import { useContext } from "react";

import { AnimalSummaryContext } from "../Context/AnimalSummaryContext";

export const useAnimalSummaryContext =()=>{
    const context = useContext(AnimalSummaryContext);

    if(!context){
        throw new Error('useAnimalSummaryContext must be used inside an AnimalSummaryContextProvider');
    }

    return context;
}