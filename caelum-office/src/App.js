import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Repo from "./pages/Repo";
import Logs from "./pages/Logs";
import Settings from "./pages/Settings";
import StatusBar from "./components/StatusBar";

const App = () => {
  const [activePage, setActivePage] = useState("Home");
  const [lastAction, setLastAction] = useState("");

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar setActivePage={setActivePage} setLastAction={setLastAction} />
      <main style={{ flexGrow: 1, padding: "20px", color: "white" }}>
        {activePage === "Home" && <Home />}
        {activePage === "Repo" && <Repo setLastAction={setLastAction} />}
        {activePage === "Logs" && <Logs />}
        {activePage === "Settings" && <Settings />}
      </main>
      <StatusBar activePage={activePage} lastAction={lastAction} />
    </div>
  );
};

export default App;
