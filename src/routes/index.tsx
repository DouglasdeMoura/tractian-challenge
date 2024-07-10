import useSWR from "swr";

function App() {
  const { data } = useSWR("/companies");

  return (
    <>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </>
  );
}

export default App;
