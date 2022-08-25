import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NodeData } from "../../types";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { ReactNode, useState } from "react";

const BASE_PADDING = 2;
const DEFAULT_PADDING = 4;

interface TreeNodeProps<T> {
  node: NodeData<T>;
  depth: number;
  render: (node: T) => ReactNode;
}

export function TreeNode<T>({ node, depth, render }: TreeNodeProps<T>) {
  const isRoot = depth === 0;
  const [open, setOpen] = useState(isRoot);

  const handleClick = () => {
    setOpen(!open);
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
          {node.children && (open ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>
      )}
      {node.children && (
        <Collapse in={open}>
          <List disablePadding={true}>
            {node.children.map((childNode) => (
              <TreeNode node={childNode} depth={depth + 1} render={render} />
            ))}
          </List>
        </Collapse>
      )}
    </List>
  );
}
