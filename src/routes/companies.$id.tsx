import useSWR from "swr";
import { Breadcrumb } from "../components/breadcrumb";
import { useCompanies } from ".";
import { Link, useParams } from "react-router-dom";
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

type Location = {
  id: string;
  name: string;
  parentId: string | null;
};

const useLocations = () => {
  const { id } = useParams();
  return useSWR<Location[]>(id ? `/companies/${id}/locations` : null);
};

function convertToTreeData(
  locations?: Location[],
  assets?: Asset[],
): NodeProps[] {
  if (!locations || !assets) {
    return [];
  }

  const locationNodes: Map<string, NodeProps> = new Map();
  const assetNodes: Map<string, NodeProps> = new Map();

  // Process Locations
  locations.forEach((location) => {
    locationNodes.set(location.id, {
      label: location.name,
      children: [],
    });
  });

  // Process Assets
  assets.forEach((asset) => {
    const node: NodeProps = {
      label: asset.name,
      children: [],
    };

    if (asset.sensorType) {
      // It's a component
      if (asset.parentId && assetNodes.has(asset.parentId)) {
        assetNodes.get(asset.parentId)?.children?.push(node);
      } else if (asset.locationId && locationNodes.has(asset.locationId)) {
        locationNodes.get(asset.locationId)?.children?.push(node);
      }
    } else {
      // It's an asset
      if (asset.parentId && assetNodes.has(asset.parentId)) {
        assetNodes.get(asset.parentId)?.children?.push(node);
      } else if (asset.locationId && locationNodes.has(asset.locationId)) {
        locationNodes.get(asset.locationId)?.children?.push(node);
      } else {
        // Unlinked asset, handle accordingly
      }
      assetNodes.set(asset.id, node);
    }
  });

  // Compile the tree from locations
  const treeData: NodeProps[] = Array.from(locationNodes.values());

  return treeData;
}

export default function Company() {
  const { data: assets } = useAssets();
  const { data: company } = useCompany();
  const { data: locations } = useLocations();

  return (
    <div>
      {company ? (
        <Breadcrumb
          items={[
            <Link key={0} to="/">
              Ativo
            </Link>,
            company.name,
          ]}
        />
      ) : null}
      <Tree data={convertToTreeData(locations, assets)} />
    </div>
  );
}
