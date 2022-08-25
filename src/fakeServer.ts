import { FileData, FileTypes } from "./components/FileSystem";
import { v4 as uuidv4 } from "uuid";
import { NodeData } from "./types";

export async function loadFiles() {
  const numOfFiles = Math.floor(Math.random() * 5);
  const files: FileData[] = [
    {
      id: uuidv4(),
      name: FileTypes.DIRECTORY.toString() + uuidv4().substring(0, 3),
      lastModified: new Date().toDateString(),
      type: FileTypes.DIRECTORY,
      children: []
    },
  ];

  for (let i = 0; i < numOfFiles; i++) {
    const type = i % 2 === 0 ? FileTypes.PDF : FileTypes.PNG;
    files.push({
      id: uuidv4(),
      name: type.toString() + uuidv4().substring(0, 3),
      lastModified: new Date().toDateString(),
      type: type,
    });
  }

  return new Promise<Array<NodeData<FileData>>>((resolve) => {
    setTimeout(() => resolve(files), 1000);
  });
}
