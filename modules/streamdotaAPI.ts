export const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetcher = (
  path: RequestInfo,
  init: RequestInit = {}
): Promise<any> => {
  const uri = BASE_API_URL + path;
  const options = {
    headers: {
      Authorization: `JWT ${localStorage.getItem("jwt")}`,
      ...(init.headers ?? {}),
    },
    ...init,
  };
  return fetch(uri, options).then((res) => res.json());
};
