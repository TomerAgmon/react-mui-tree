import { Avatar, ListItemText } from "@mui/material";
import { NodeData } from "../types";
import { Tree } from "./Tree/Tree";
import FolderIcon from "@mui/icons-material/Folder";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertPhotoRoundedIcon from "@mui/icons-material/InsertPhotoRounded";
import { loadFiles } from "../fakeServer";
import { useEffect, useState } from "react";

export enum FileTypes {
  PNG = "Picture ",
  PDF = "Document ",
  DIRECTORY = "Folder ",
}

export interface FileData {
  id: string;
  name: string;
  lastModified: string;
  type: FileTypes;
  children?: Array<FileData>;
}

const FILE_SYSTEM: Array<NodeData<FileData>> = [
  {
    id: "1",
    name: "myPhoto1",
    lastModified: "1/2/1",
    type: FileTypes.PNG,
  },
  {
    id: "2",
    name: "myFolder1",
    lastModified: "1/2/3",
    type: FileTypes.DIRECTORY,
    children: [
      {
        id: "3",
        name: "myPhoto2",
        lastModified: "1/2/1",
        type: FileTypes.PNG,
      },
      {
        id: "4",
        name: "myDoc1",
        lastModified: "1/2/1",
        type: FileTypes.PDF,
      },
      {
        id: "6",
        name: "myFolder2",
        lastModified: "1/2/3",
        type: FileTypes.DIRECTORY,
        children: [
          {
            id: "7",
            name: "myPhoto2",
            lastModified: "1/2/1",
            type: FileTypes.PNG,
          },
          {
            id: "8",
            name: "myDoc1",
            lastModified: "1/2/1",
            type: FileTypes.PDF,
          },
        ],
      },
    ],
  },
  {
    id: "5",
    name: "myDoc3",
    lastModified: "1/2/1",
    type: FileTypes.PDF,
  },
];

function File({ file }: { file: FileData }) {
  let icon;
  let color;

  switch (file.type) {
    case FileTypes.DIRECTORY:
      color = "#85C1E9";
      icon = <FolderIcon />;
      break;
    case FileTypes.PDF:
      color = "#F1948A";
      icon = <PictureAsPdfIcon />;
      break;
    case FileTypes.PNG:
      color = "#ABEBC6";
      icon = <InsertPhotoRoundedIcon />;
      break;
  }

  return (
    <>
      <Avatar sx={{ background: color, mr: 2 }}>{icon}</Avatar>
      <ListItemText primary={file.name} secondary={file.lastModified} />
    </>
  );
}

export function FileSystem() {
  const [files, setFiles] = useState<Array<NodeData<FileData>>>([]);

  const handleLoadChildren = async (path: Array<string>, node?: FileData) => {
    const res = await loadFiles();

    if (files.length !== 0) {
      const updatedRoot = updateInPath(files, path);
      if (updatedRoot) {
        updatedRoot.children = res;
        setFiles(files);
      }
    } else {
      setFiles(res);
    }
  };

  return (
    <>
      <Tree
        onLoadChildren={handleLoadChildren}
        nodes={files}
        renderNode={(file: FileData) => {
          return <File file={file} />;
        }}
      />
    </>
  );
}

function updateInPath(files: FileData[], path: string[]): FileData | undefined {
  let fileRoot: FileData[] | undefined = files;
  let target: FileData | undefined;
  for (const id of path) {
    target = fileRoot?.find((file) => file.id === id);

    if (target) {
      fileRoot = target.children;
    }
  }

  return target;
}
