import useSWR from "swr";
import { Breadcrumb } from "../components/breadcrumb";
import { useCompanies } from ".";
import { Link, useParams } from "react-router-dom";
import { Tree, Type } from "../components/tree";

// import styles from "./companies.module.css";
import { generateTree } from "../utils/generate-tree";
import { normalizeAsset } from "../utils/normalize-asset";

export type Asset = {
  id: string;
  locationId: string | null;
  name: string;
  parentId: string | null;
  sensorType: string | null;
  status: string | null;
  gatewayId?: string;
  sensorId?: string;
  type: Type;
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
  const result = useSWR<Asset[]>(id ? `/companies/${id}/assets` : null);
  return {
    ...result,
    data: result.data?.map((d) => ({
      ...d,
      type: (d.sensorType ? "component" : "asset") as Type,
    })),
  };
};

export type Location = {
  id: string;
  name: string;
  parentId: string | null;
  type: Type;
};

const useLocations = () => {
  const { id } = useParams();
  const result = useSWR<Location[]>(id ? `/companies/${id}/locations` : null);
  return {
    ...result,
    data: result.data?.map((d) => ({ ...d, type: "location" as Type })),
  };
};

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
      {locations && assets ? (
        <Tree
          data={generateTree(
            locations.concat(
              // @ts-expect-error No time to fix it right now
              normalizeAsset(assets),
            ),
          )}
        />
      ) : null}
    </div>
  );
}
