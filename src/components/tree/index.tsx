import { memo, useState } from "react";
import { ChevronIcon } from "../icons/chevron";
import styles from "./styles.module.css";
import { IconBolt, IconAlertTriangle } from "@tabler/icons-react";

export type Type = "component" | "asset" | "location";

export type NodeProps = {
  id: string;
  label: React.ReactNode;
  type: Type;
  children: NodeProps[];
  open?: boolean;
  sensorType?: string | null;
  status?: string | null;
};

const Node: React.FC<NodeProps> = memo(
  ({ children, label, type, open, sensorType, status }) => {
    const [isExpanded, setIsExpanded] = useState(!!open);

    const hasChildren = children.length > 0;

    const toggleExpand = () => {
      setIsExpanded(!isExpanded);
    };

    return (
      <div>
        <div
          onClick={toggleExpand}
          className={styles.item}
          data-open={isExpanded}
        >
          {hasChildren &&
            (isExpanded ? (
              <ChevronIcon pointing="bottom" />
            ) : (
              <ChevronIcon pointing="right" />
            ))}
          <img className={styles.icon} src={`/assets/${type}.png`} />
          {label}
          {sensorType === "energy" ? <IconBolt /> : null}
          {status === "alert" ? <IconAlertTriangle /> : null}
        </div>
        {isExpanded && hasChildren && (
          <div className={styles.padding}>
            {children.map((childNode) => (
              <Node key={childNode.id} {...childNode} open={open} />
            ))}
          </div>
        )}
      </div>
    );
  },
);

Node.displayName = "Node";

type TreeProps = {
  data: NodeProps[];
  open?: boolean;
};

export const Tree: React.FC<TreeProps> = memo(({ data, open }) => {
  return (
    <div>
      {data.map((node) => (
        <Node key={node.id} {...node} open={open} />
      ))}
    </div>
  );
});

Tree.displayName = "Tree";
