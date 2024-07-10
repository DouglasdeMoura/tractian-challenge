import useSWR from "swr";
import { Breadcrumb } from "../components/breadcrumb";
import { useCompanies } from ".";
import { useParams } from "react-router-dom";
import { NodeProps, Tree } from "../components/tree";

type Asset = {
  id: string;
  locationId: string | null;
  name: string;
  parentId: string | null;
  sensorType: string | null;
  status: string | null;
  gatewayId?: string;
  sensorId?: string;
};

const useCompany = () => {
  const { id } = useParams();
  const companies = useCompanies();

  return {
    ...companies,
    data: companies.data?.find((company) => company.id === id),
  };
};

const useAssets = () => {
  const { id } = useParams();
  return useSWR<Asset[]>(id ? `/companies/${id}/assets` : null);
};

function convertToTreeData(jsonArray?: Asset[]): NodeProps[] {
  if (!jsonArray) {
    return [];
  }

  const nodesMap = new Map<string, NodeProps>();

  // Step 1: Create nodes for each asset and add them to the map
  jsonArray.forEach(({ id, name }) => {
    const node: NodeProps = { label: name, children: [] };
    nodesMap.set(id, node);
  });

  // Step 2: Build the tree structure by setting children for each node
  jsonArray.forEach(({ id, parentId }) => {
    if (parentId) {
      const parentNode = nodesMap.get(parentId);
      const currentNode = nodesMap.get(id);
      if (parentNode && currentNode) {
        parentNode.children = [...(parentNode.children || []), currentNode];
      }
    }
  });

  // Step 3: Extract the root nodes (nodes without a parentId or with a non-existent parentId)
  const rootNodes = Array.from(nodesMap.values()).filter(({ label }) => {
    const currentItem = jsonArray.find((item) => item.name === label);
    return !currentItem?.parentId || !nodesMap.has(currentItem.parentId);
  });

  return rootNodes;
}

export default function Company() {
  const { data: assets } = useAssets();
  const { data: company } = useCompany();

  return (
    <div>
      {company ? <Breadcrumb items={["Ativos", company.name]} /> : null}
      <Tree data={convertToTreeData(assets)} />
    </div>
  );
}
