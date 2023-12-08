import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import Provider from './Context';
import { AnimalContextProvider } from "./Context/AnimalContext";
import { AnimalSummaryProvider} from "./Context/AnimalSummaryContext"



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <AnimalSummaryProvider>
          <AnimalContextProvider>
            <App />
          </AnimalContextProvider>
        </AnimalSummaryProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);


