import { useCallback, useEffect, useState } from "react";
import useSWR, { mutate } from "swr";

import { User } from "@streamdota/shared-types";
import { fetcher } from "@/modules/streamdotaAPI";
import { useToasts } from "@geist-ui/react";

export function useUser(): {
  isError: boolean;
  isLoading: boolean;
  patch: (v: Partial<User>) => void;
  user: User;
} {
  const { data, error } = useSWR("/user/baseData", fetcher);
  const [, setToast] = useToasts();

  const patch = async (patchData: Partial<User>) => {
    mutate("/user/baseData", { ...data, ...patchData }, false);
    mutate("/user/baseData", () =>
      fetcher("/user/baseData", {
        method: "PATCH",
        body: JSON.stringify(patchData),
      })
    );
    setToast({
      text: "Changes saved",
      type: "success",
    });
  };

  return {
    isError: error,
    isLoading: !error && !data,
    patch,
    user: data,
  };
}
