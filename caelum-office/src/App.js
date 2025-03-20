import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Repo from "./pages/Repo";
import Logs from "./pages/Logs";
import Settings from "./pages/Settings";
import StatusBar from "./components/StatusBar";
import { loadPlugins, loadPlugin } from "./core/pluginLoader";
import { fetchData } from "./network/apiConnector";

const App = () => {
  const [activePage, setActivePage] = useState("Home");
  const [lastAction, setLastAction] = useState("");

  // External API check
  const runExternalCheck = async () => {
    try {
      const result = await fetchData("https://api.example.com/status");
      console.log("API Response:", result);
    } catch (error) {
      console.error("Error fetching API status:", error);
    }
  };

  // Run the external check and load plugins on component mount
  useEffect(() => {
    runExternalCheck();
    loadPlugins(); // Load all plugins
    loadPlugin("examplePlugin"); // Load a specific plugin (optional)
  }, []);

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