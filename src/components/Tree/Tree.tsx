import { List } from "@mui/material";
import { ReactNode, useEffect, useMemo } from "react";
import { NodeData } from "../../types";
import { TreeNode } from "./TreeNode";

export interface TreeProps<T> {
  nodes: Array<NodeData<T>>;
  renderNode: (node: T) => ReactNode;
  onLoadChildren: (path: Array<string>, node?: T) => void;
}

export function Tree<T>({ nodes, renderNode, onLoadChildren }: TreeProps<T>) {
  useEffect(() => {
    onLoadChildren([]);
  }, []);

  const rootNode: any = useMemo(() => {
    console.log("ROOT");
    return { id: "0", children: nodes };
  }, [nodes]);

  return (
    <TreeNode
      node={rootNode}
      depth={0}
      path={[]}
      render={renderNode}
      onLoadChildren={onLoadChildren}
    />
  );
}

//function findNodeByPath();
