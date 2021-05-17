import { User } from "@streamdota/shared-types";
import { fetcher } from "@/modules/streamdotaAPI";
import useSWR from "swr";

export function useUser(): {
  user: User;
  isLoading: boolean;
  isError: boolean;
} {
  const { data, error } = useSWR("/user/baseData", fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
}
