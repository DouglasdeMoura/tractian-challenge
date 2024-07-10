/* eslint-disable react-refresh/only-export-components */
import { Link } from "react-router-dom";
import useSWR from "swr";
import styles from "./index.module.css";

export type Company = {
  id: string;
  name: string;
};

export const useCompanies = () => useSWR<Company[]>("/companies");

function Index() {
  const { data } = useCompanies();

  return (
    <div className={styles.wrapper}>
      <h1>Selecione a empresa</h1>

      <ul>
        {data?.map((company) => (
          <li key={company.id}>
            <Link to={`/companies/${company.id}`}>{company.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Index;
