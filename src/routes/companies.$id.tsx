import useSWR from "swr";
import { Breadcrumb } from "../components/breadcrumb";
import { useCompanies } from ".";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Tree, Type } from "../components/tree";
import Fuse from "fuse.js";

// import styles from "./companies.module.css";
import { generateTree } from "../utils/generate-tree";
import { normalizeAsset } from "../utils/normalize-asset";
import { Input } from "../components/input";
import { SearchIcon } from "../components/icons/search";

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
  const [searchParams, setSearchParams] = useSearchParams();

  const treeItems = locations
    ? generateTree(
        locations.concat(
          // @ts-expect-error No time to fix it right now
          normalizeAsset(assets),
        ),
      )
    : [];

  const fuse = new Fuse(treeItems, {
    keys: [
      "label",
      "children.label",
      "children.children.label",
      "children.children.label",
      "children.children.children.label",
    ],
  });

  return (
    <div>
      <Input
        placeholder="Buscar ativo ou local"
        rightSection={<SearchIcon />}
        onChange={(e) => {
          setSearchParams({ q: e.currentTarget.value });
        }}
        defaultValue={searchParams.get("q") || ""}
      />
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
          // Forces re-render when search changes
          key={searchParams.get("q")}
          data={
            searchParams.get("q")
              ? fuse.search(searchParams.get("q") || "").map((i) => i.item)
              : treeItems
          }
          open={!!searchParams.get("q")}
        />
      ) : null}
    </div>
  );
}
