/* eslint-disable react-refresh/only-export-components */
import { Outlet, useNavigate } from "react-router-dom";
import useSWR from "swr";
import styles from "./index.module.css";
import { Radio } from "../components/radio";

export type Company = {
  id: string;
  name: string;
};

export const useCompanies = () => useSWR<Company[]>("/companies");

function Index() {
  const { data } = useCompanies();
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.menu}>
        <h1>Selecione a empresa</h1>

        <div className={styles.radioContainer}>
          {data?.map((company) => (
            <Radio
              key={company.id}
              name="company"
              onClick={() => {
                navigate(`/companies/${company.id}`);
              }}
            >
              {company.name}
            </Radio>
          ))}
        </div>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

export default Index;
