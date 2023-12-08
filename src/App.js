import React from "react";
import {Route, Routes} from 'react-router-dom'
import Dashboard from "./pages/client-dashboard";
import io from 'socket.io-client'


const ENDPOINT = "https://apiv2.at.patrickmamsery.co.tz"; 

function App() {
  React.useEffect(() => {
    const socket = io.connect(ENDPOINT);

    // Optionally, you can handle socket events or any other setup logic here

    // Cleanup the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []); // Empty dependency array ensures that the effect runs only once when the component mounts

  return (
    <div className="h-full w-full">
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
