import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Repo = () => {
  const initialFiles = [
    { id: 1, name: "README.md", type: "file", content: "This is the README file content." },
    { id: 2, name: "src", type: "folder", expanded: false, children: [
      { id: 3, name: "index.js", type: "file", content: "console.log('Hello, world!');" },
      { id: 4, name: "App.js", type: "file", content: "import React from 'react';\nexport default function App() { return <h1>Welcome!</h1>; }" }
    ]},
    { id: 5, name: "public", type: "folder", expanded: false, children: [
      { id: 6, name: "index.html", type: "file", content: "<html><body><h1>Public File</h1></body></html>" }
    ]},
    { id: 7, name: "package.json", type: "file", content: "{\n  \"name\": \"caelum-office\",\n  \"version\": \"1.0.0\"\n}" }
  ];

  const [files, setFiles] = useState(() => {
    const savedFiles = localStorage.getItem("repoFiles");
    return savedFiles ? JSON.parse(savedFiles) : initialFiles;
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    localStorage.setItem("repoFiles", JSON.stringify(files));
  }, [files]);

  const toggleFolder = (id) => {
    setFiles(files.map(file =>
      file.id === id ? { ...file, expanded: !file.expanded } : file
    ));
  };

  const openFile = (file) => {
    setSelectedFile(file);
    setEditedContent(file.content);
  };

  const saveFile = () => {
    setFiles(files.map(file =>
      file.id === selectedFile.id ? { ...file, content: editedContent } : file
    ));
    setSelectedFile(null);
  };

  return (
    <Container>
      <h1>Repository Management</h1>
      <p>Click a folder to expand/collapse. Click a file to open and edit.</p>
      <FileList>
        {files.map((file) => (
          <React.Fragment key={file.id}>
            <FileItem 
              type={file.type}
              onClick={() => file.type === "folder" ? toggleFolder(file.id) : openFile(file)}
            >
              {file.type === "folder" ? (
                <span role="img" aria-label={file.expanded ? "open folder" : "closed folder"}>
                  {file.expanded ? "📂" : "📁"}
                </span>
              ) : (
                <span role="img" aria-label="document">📄</span>
              )} 
              {file.name}
            </FileItem>
            {file.type === "folder" && file.expanded && (
              <SubFileList>
                {file.children.map(child => (
                  <FileItem 
                    key={child.id}
                    type={child.type}
                    onClick={() => openFile(child)}
                  >
                    <span role="img" aria-label="document">📄</span> {child.name}
                  </FileItem>
                ))}
              </SubFileList>
            )}
          </React.Fragment>
        ))}
      </FileList>

      {selectedFile && (
        <FileEditor>
          <h2>Editing: {selectedFile.name}</h2>
          <TextArea 
            value={editedContent} 
            onChange={(e) => setEditedContent(e.target.value)} 
          />
          <ButtonContainer>
            <SaveButton onClick={saveFile}>Save</SaveButton>
            <CloseButton onClick={() => setSelectedFile(null)}>Cancel</CloseButton>
          </ButtonContainer>
        </FileEditor>
      )}
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
`;

const FileList = styled.ul`
  margin-top: 15px;
  padding: 0;
`;

const SubFileList = styled.ul`
  padding-left: 20px;
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

const FileEditor = styled.div`
  background: #292929;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
  color: white;
  width: 100%;
  max-width: 600px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  background: #181818;
  color: white;
  border: 1px solid #444;
  padding: 10px;
  font-size: 14px;
  border-radius: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const SaveButton = styled.button`
  background: #00aa00;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
`;

const CloseButton = styled.button`
  background: #ff4444;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
`;
