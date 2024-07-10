import useSWR from "swr";

type Company = {
  id: string;
  name: string;
};

const useCompanies = () => useSWR<Company[]>("/companies");

function Index() {
  const { data } = useCompanies();

  return (
    <>
      <h1>Selecione a empresa</h1>

      <ul>
        {data?.map((company) => <li key={company.id}>{company.name}</li>)}
      </ul>
    </>
  );
}

export default Index;
