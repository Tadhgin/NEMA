import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Logs = () => {
  const [logs, setLogs] = useState([
    { id: 1, message: "Initialized repository", timestamp: "10:30 AM" },
    { id: 2, message: "Updated UI structure", timestamp: "10:45 AM" },
    { id: 3, message: "Modified README.md", timestamp: "11:00 AM" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs((prevLogs) => [
        ...prevLogs,
        { id: prevLogs.length + 1, message: "Caelum is processing...", timestamp: new Date().toLocaleTimeString() },
      ]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <h1>Activity Logs</h1>
      <p>Here you’ll find a history of my interactions and actions taken within the system.</p>
      <LogList>
        {logs.slice().reverse().map((log) => (
          <LogItem key={log.id}>
            <Timestamp>{log.timestamp}</Timestamp> - {log.message}
          </LogItem>
        ))}
      </LogList>
    </Container>
  );
};

export default Logs;

const Container = styled.div`
  padding: 20px;
  background: #1e1e1e;
  color: white;
  border-radius: 8px;
  max-width: 600px;
`;

const LogList = styled.ul`
  margin-top: 10px;
  padding: 0;
`;

const LogItem = styled.li`
  background: #292929;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 8px;
  font-size: 14px;
`;

const Timestamp = styled.span`
  color: #bbbbbb;
  font-size: 12px;
`;