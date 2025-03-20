import React from "react";
import styled from "styled-components";

const StatusBar = ({ activePage, lastAction }) => {
  return (
    <Container>
      <span>
        <span role="img" aria-label="pin">📌</span> Active Page: <strong>{activePage}</strong>
      </span>
      <span>
        <span role="img" aria-label="memo">📝</span> Last Action: {lastAction || "Idle..."}
      </span>
    </Container>
  );
};

export default StatusBar;

const Container = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #1e1e1e;
  color: white;
  padding: 10px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 2px solid #292929;
  z-index: 100;
`;