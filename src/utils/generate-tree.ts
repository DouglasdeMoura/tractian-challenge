import { NodeProps } from "../components/tree";
import { CompanyAsset } from "../routes/companies.$id";

export function generateTree(items: CompanyAsset[]): NodeProps[] {
  const itemMap = new Map<string, NodeProps>();

  // Create a map of all items
  items.forEach((item) => {
    const asset: NodeProps = {
      id: item.id,
      type: item.type,
      label: item.name,
      children: [],
    }

    if (item.type === 'asset' || item.type === 'component') {
      asset.sensorType = item.sensorType;
      asset.status = item.status;
    }


    itemMap.set(item.id, asset);
  });

  const result: NodeProps[] = [];

  // Build the tree structure
  items.forEach((item) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const treeItem = itemMap.get(item.id)!;

    if (item.parentId === null) {
      // This is a root item
      result.push(treeItem);
    } else {
      // This item has a parent
      const parent = itemMap.get(item.parentId);
      if (parent) {
        parent.children.push(treeItem);
      }
    }
  });

  return result;
}
