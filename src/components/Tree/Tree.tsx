import { List } from "@mui/material";
import { ReactNode, useMemo } from "react";
import { NodeData } from "../../types";
import { TreeNode } from "./TreeNode";

export interface TreeProps<T> {
  nodes: Array<NodeData<T>>;
  renderNode: (node: T) => ReactNode;
}

export function Tree<T>({ nodes, renderNode }: TreeProps<T>) {
  const rootNode: any = useMemo(() => {
    return { id: "0", children: nodes };
  }, [nodes]);

  return <TreeNode node={rootNode} depth={0} render={renderNode} />;
}
