import React, { useState } from "react";
import styled from "styled-components";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(false);
  const [autoSync, setAutoSync] = useState(false);

  return (
    <Container>
      <h1>Settings</h1>
      <p>Configure system preferences and adjust Caelum’s workspace settings.</p>
      
      <SettingItem>
        <label>Dark Mode:</label>
        <ToggleButton onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Enabled" : "Disabled"}
        </ToggleButton>
      </SettingItem>

      <SettingItem>
        <label>Notification Sounds:</label>
        <ToggleButton onClick={() => setNotifications(!notifications)}>
          {notifications ? "Enabled" : "Disabled"}
        </ToggleButton>
      </SettingItem>

      <SettingItem>
        <label>File Auto-Sync:</label>
        <ToggleButton onClick={() => setAutoSync(!autoSync)}>
          {autoSync ? "Enabled" : "Disabled"}
        </ToggleButton>
      </SettingItem>
    </Container>
  );
};

export default Settings;

const Container = styled.div`
  padding: 20px;
  background: #1e1e1e;
  color: white;
  border-radius: 8px;
  max-width: 600px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  padding: 10px;
  background: #292929;
  border-radius: 8px;
`;

const ToggleButton = styled.button`
  background: #3a3a3a;
  border: none;
  color: white;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s ease-in-out;

  &:hover {
    background: #4a4a4a;
  }
`;