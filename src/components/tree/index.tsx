import { useState } from "react";
import { ChevronIcon } from "../icons/chevron";
import styles from "./styles.module.css";

type NodeProps = {
  label: React.ReactNode;
  children?: NodeProps[];
};

type TreeProps = {
  data: NodeProps[];
};

const Node: React.FC<NodeProps> = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasChildren = props.children && props.children.length > 0;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div onClick={toggleExpand} className={styles.item}>
        {hasChildren &&
          (isExpanded ? (
            <ChevronIcon pointing="bottom" />
          ) : (
            <ChevronIcon pointing="right" />
          ))}
        {props.label}
      </div>
      {isExpanded && hasChildren && (
        <div className={styles.padding}>
          {props.children?.map((childNode, index) => (
            <Node key={index} {...childNode} />
          ))}
        </div>
      )}
    </div>
  );
};

export const Tree: React.FC<TreeProps> = ({ data }) => {
  return (
    <div>
      {data.map((node, index) => (
        <Node key={index} {...node} />
      ))}
    </div>
  );
};
