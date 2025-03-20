import React from "react";
import styled from "styled-components";

const Sidebar = ({ setActivePage, setLastAction }) => {
  return (
    <Container>
      <Title>Caelum's Office</Title>
      <Nav>
        <NavItem
          onClick={() => {
            setActivePage("Home");
            setLastAction("Navigated to Home");
          }}
        >
          <span role="img" aria-label="home">🏠</span> Home
        </NavItem>
        <NavItem
          onClick={() => {
            setActivePage("Logs");
            setLastAction("Opened Logs");
          }}
        >
          <span role="img" aria-label="logs">📜</span> Logs
        </NavItem>
        <NavItem
          onClick={() => {
            setActivePage("Repo");
            setLastAction("Opened Repository");
          }}
        >
          <span role="img" aria-label="repository">📁</span> Repo
        </NavItem>
        <NavItem
          onClick={() => {
            setActivePage("Settings");
            setLastAction("Opened Settings");
          }}
        >
          <span role="img" aria-label="settings">⚙️</span> Settings
        </NavItem>
      </Nav>
    </Container>
  );
};

export default Sidebar;

const Container = styled.aside`
  width: 250px;
  background: #1e1e1e;
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-right: 2px solid #292929;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 10px;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const NavItem = styled.div`
  cursor: pointer;
  padding: 12px;
  background: #292929;
  border-radius: 8px;
  text-align: center;
  font-size: 16px;
  transition: 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: #3a3a3a;
    transform: scale(1.05);
  }
`;