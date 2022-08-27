import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItemButton } from "@mui/material";
import { NodeData } from "../../types";
import { Children, ReactNode, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const BASE_PADDING = 2;
const DEFAULT_PADDING = 4;

interface TreeNodeProps<T> {
  node: NodeData<T>;
  depth: number;
  path: Array<string>;
  render: (node: T) => ReactNode;
  onLoadChildren: (path: Array<string>, node?: T) => void;
}

export function TreeNode<T>({
  node,
  depth,
  path,
  onLoadChildren,
  render,
}: TreeNodeProps<T>) {
  const isRoot = depth === 0;
  const [isExpanded, setIsExpanded] = useState(isRoot);

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsExpanded(!isExpanded);

    if (!isExpanded && node.children?.length === 0) {
      setIsLoading(true);
      await onLoadChildren([...path, node.id], node);
      setIsLoading(false);
    }
  };

  return (
    <List
      disablePadding={true}
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      {!isRoot && (
        <ListItemButton
          onClick={handleClick}
          sx={{ pl: BASE_PADDING + (depth - 1) * DEFAULT_PADDING }}
        >
          {render(node)}
          {node.children && (isExpanded ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>
      )}
      {isLoading && <CircularProgress />}
      {node.children && (
        <Collapse in={isExpanded}>
          <List disablePadding={true}>
            {node.children.map((childNode) => (
              <TreeNode
                key={childNode.id}
                node={childNode}
                depth={depth + 1}
                path={isRoot ? [] : [...path, node.id]}
                render={render}
                onLoadChildren={onLoadChildren}
              />
            ))}
          </List>
        </Collapse>
      )}
    </List>
  );
}
