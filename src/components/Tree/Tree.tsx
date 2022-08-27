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

export function findNodeByPath<T>(
  nodes: Array<NodeData<T>>,
  path: Array<string>
) {
  let target;

  for (const id of path) {
    target = nodes.find((node) => node.id === id);

    if (target) {
      nodes = target.children ?? [];
    }
  }

  return target;
}
