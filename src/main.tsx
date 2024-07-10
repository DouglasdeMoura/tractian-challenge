import React from "react";
import ReactDOM from "react-dom/client";
import Index from "./routes/index.tsx";
import { SWRConfig } from "swr";
import { api } from "./api/client.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./styles/global.css";
import Company from "./routes/companies.$id.tsx";

async function enableMocking() {
  if (!import.meta.env.DEV) {
    return;
  }

  const { worker } = await import("./mocks/browser");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

const router = createBrowserRouter([
  { path: "/", element: <Index /> },
  {
    path: "/companies/:id",
    element: <Company />,
  },
]);

enableMocking()
  .then(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ReactDOM.createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
        <SWRConfig value={{ fetcher: api.get }}>
          <RouterProvider router={router} />
        </SWRConfig>
      </React.StrictMode>,
    );
  })
  .catch((error: unknown) => {
    console.error("Failed to enable mocking", error);
  });
