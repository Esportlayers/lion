export const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetcher = (
  path: RequestInfo,
  init: RequestInit = {}
): Promise<any> => {
  const uri = BASE_API_URL + path;
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("jwt")}`,
      ...(init.headers ?? {}),
    },
    ...init,
  };
  return fetch(uri, options).then((res) => {
    if (res.status === 200) {
      return res.json();
    }

    return true;
  });
};
