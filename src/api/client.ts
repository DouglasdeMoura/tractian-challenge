/**
 * @link https://douglasmoura.dev/en-US/using-fetch-with-typescript
 */

class HTTPError extends Error {
  readonly response: unknown;
  readonly status: number;
  readonly statusText: string;

  constructor(status: number, statusText: string, response: unknown) {
    super(statusText);
    this.status = status;
    this.statusText = statusText;
    this.response = response;
  }
}

const createQuery =
  (baseURL: RequestInfo | URL = '', baseInit?: RequestInit) =>
    <TResponse = unknown>(url: RequestInfo | URL, init?: RequestInit) =>
      // eslint-disable-next-line @typescript-eslint/no-base-to-string, @typescript-eslint/restrict-template-expressions
      fetch(`${baseURL}${url}`, { ...baseInit, ...init }).then(async (res) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const response = await res.json()

        if (!res.ok)
          throw new HTTPError(res.status, res.statusText, response);

        return response as TResponse
      })

// In this function, we define our base URL and headers.
const query = createQuery(
  import.meta.env.VITE_API_BASE_URL,
  {
    headers: {
      'Content-Type': 'application/json',
    },
  })


const makeRequest = (method: RequestInit['method']) =>
  <TResponse = unknown, TBody = Record<string, unknown>>(url: RequestInfo | URL, body: TBody) =>
    query<TResponse>(url, {
      method,
      body: JSON.stringify(body),
    })

export const api = {
  get: query,
  post: makeRequest('POST'),
  delete: makeRequest('DELETE'),
  put: makeRequest('PUT'),
  patch: makeRequest('PATCH'),
}
