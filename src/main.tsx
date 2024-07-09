import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/index.tsx";
import { SWRConfig } from "swr";
import { api } from "./api/client.ts";
import "./styles/global.css";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SWRConfig value={{ fetcher: api.get }}>
      <App />
    </SWRConfig>
  </React.StrictMode>,
);
