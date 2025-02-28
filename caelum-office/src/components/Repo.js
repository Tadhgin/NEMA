import React, { useState } from "react";
import styled from "styled-components";

const Repo = () => {
  const [files, setFiles] = useState([
    { id: 1, name: "README.md", type: "file" },
    { id: 2, name: "src", type: "folder" },
    { id: 3, name: "public", type: "folder" },
    { id: 4, name: "package.json", type: "file" },
  ]);

  return (
    <Container>
      <h1>Repository Management</h1>
      <p>View and manage files within the repository.</p>
      <FileList>
        {files.map((file) => (
          <FileItem key={file.id} type={file.type}>
            {file.type === "folder" ? "📁" : "📄"} {file.name}
          </FileItem>
        ))}
      </FileList>
    </Container>
  );
};

export default Repo;

const Container = styled.div`
  padding: 20px;
  background: #1e1e1e;
  color: white;
  border-radius: 8px;
  max-width: 600px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

const FileList = styled.ul`
  margin-top: 15px;
  padding: 0;
`;

const FileItem = styled.li`
  background: ${({ type }) => (type === "folder" ? "#3a3a3a" : "#292929")};
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: 0.3s ease-in-out;

  &:hover {
    background: ${({ type }) => (type === "folder" ? "#4a4a4a" : "#3a3a3a")};
    transform: scale(1.03);
  }
`;
