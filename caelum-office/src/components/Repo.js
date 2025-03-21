import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Repo = ({ setLastAction }) => {
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
    setLastAction(`Opened ${file.name}`);
  };

  const saveFile = () => {
    setFiles(files.map(file =>
      file.id === selectedFile.id ? { ...file, content: editedContent } : file
    ));
    setLastAction(`Saved ${selectedFile.name}`);
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
              {file.type === "folder" ? (file.expanded ? "📂" : "📁") : "📄"} {file.name}
            </FileItem>
            {file.type === "folder" && file.expanded && (
              <SubFileList>
                {file.children.map(child => (
                  <FileItem 
                    key={child.id}
                    type={child.type}
                    onClick={() => openFile(child)}
                  >
                    📄 {child.name}
                  </FileItem>
                ))}
              </SubFileList>
            )}
          </React.Fragment>
        ))}
      </FileList>
    </Container>
  );
};

export default Repo;