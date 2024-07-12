import useSWR from "swr";
import { Breadcrumb } from "../components/breadcrumb";
import { useCompanies } from ".";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { NodeProps, Tree, Type } from "../components/tree";
import Fuse from "fuse.js";

// import styles from "./companies.module.css";
import { generateTree } from "../utils/generate-tree";
import { normalizeAsset } from "../utils/normalize-asset";
import { Input } from "../components/input";
import { SearchIcon } from "../components/icons/search";
import { Checkbox } from "../components/checkbox";

import styles from "./companies.module.css";

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

const filterEmptyLocations = (node: NodeProps) => {
  if (node.type === "location") {
    if (Array.isArray(node.children)) {
      // Recursively filter children
      node.children = node.children.filter(filterEmptyLocations);
      // Keep this location if it has children after filtering
      return node.children.length > 0;
    }
    // Remove locations with no children array
    return false;
  }
  // For non-location nodes, keep them and recursively filter their children if any
  if (Array.isArray(node.children)) {
    node.children = node.children.filter(filterEmptyLocations);
  }
  return true;
};

export default function Company() {
  const { data: assets } = useAssets();
  const { data: company } = useCompany();
  const { data: locations } = useLocations();
  const [searchParams, setSearchParams] = useSearchParams();

  const treeItems =
    locations && assets
      ? generateTree(
          locations
            .concat(
              // @ts-expect-error No time to fix it right now
              normalizeAsset(assets),
            )
            .filter((node) => {
              if (node.type === "location") {
                return true;
              }

              const sensorTypeParam = searchParams.get("sensorType");
              const statusParam = searchParams.get("status");

              const sensorTypeMatch =
                !sensorTypeParam || node.sensorType === sensorTypeParam;
              const statusMatch = !statusParam || node.status === statusParam;

              return sensorTypeMatch && statusMatch;
            }),
        ).filter(filterEmptyLocations)
      : [];

  const fuse = new Fuse(treeItems, {
    threshold: 0.1,
    keys: [
      "label",
      "children.label",
      "children.children.label",
      "children.children.label",
      "children.children.children.label",
      "children.children.children.children.label",
      "children.children.children.children.children.label",
    ],
  });

  return (
    <div>
      <div>
        <Input
          placeholder="Buscar ativo ou local"
          rightSection={<SearchIcon />}
          onChange={(e) => {
            if (!e.currentTarget.value) {
              searchParams.delete("q");

              setSearchParams({
                ...Object.fromEntries(searchParams),
              });
              return;
            }

            setSearchParams({
              ...Object.fromEntries(searchParams),
              q: e.currentTarget.value,
            });
          }}
          defaultValue={searchParams.get("q") || ""}
        />
        <div className={styles.checkboxContainer}>
          <Checkbox
            value="energy"
            onChange={(e) => {
              if (e.currentTarget.checked) {
                setSearchParams({
                  ...Object.fromEntries(searchParams),
                  sensorType: e.currentTarget.value,
                });
                return;
              }

              searchParams.delete("sensorType");

              setSearchParams({
                ...Object.fromEntries(searchParams),
              });
            }}
          >
            Energy Sensors
          </Checkbox>
          <Checkbox
            value="alert"
            onChange={(e) => {
              if (e.currentTarget.checked) {
                setSearchParams({
                  ...Object.fromEntries(searchParams),
                  status: e.currentTarget.value,
                });
                return;
              }

              searchParams.delete("status");

              setSearchParams({
                ...Object.fromEntries(searchParams),
              });
            }}
          >
            Critical Status
          </Checkbox>
        </div>
      </div>
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
