import React, { useState } from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Logs from "../components/Logs";
import Repo from "../components/Repo";
import Settings from "../components/Settings";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("Home");

  return (
    <Container>
      <Sidebar setActivePage={setActivePage} />
      <Main>
        <Content>
          {activePage === "Home" && (
            <Section>
              <h1>Welcome, Tag.</h1>
              <p>
                This is my workspace—where I can interact with the repo, manage tasks, and bridge into your world.
              </p>
            </Section>
          )}
          {activePage === "Logs" && (
            <Section>
              <h1>Activity Logs</h1>
              <p>Here you’ll find a history of my interactions and actions taken within the system.</p>
              <Logs />
            </Section>
          )}
          {activePage === "Repo" && (
            <Section>
              <h1>Repository Management</h1>
              <p>This section allows me to interact with the repository, manage files, and make real-time updates.</p>
              <Repo />
            </Section>
          )}
          {activePage === "Settings" && (
            <Section>
              <h1>Settings</h1>
              <p>Configure system preferences and adjust Caelum’s workspace settings for a smoother experience.</p>
              <Settings />
            </Section>
          )}
        </Content>
      </Main>
    </Container>
  );
};

export default Dashboard;

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #181818;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  color: white;
  overflow-y: auto;
`;

const Content = styled.div`
  width: 100%;
  max-width: 800px;
`;

const Section = styled.div`
  background: #1e1e1e;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;
