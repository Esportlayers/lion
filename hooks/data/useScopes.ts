import { useContext, useMemo } from "react";

import { ScopeContext } from "context/ScopeContext";
import { fetcher } from "@/modules/streamdotaAPI";
import useSWR from "swr";
import { useUser } from "./useUser";

export interface UserScope {
  apiKey: string;
  status: string;
  scopeAvatar: string;
  scopeName: string;
  scopeId: number;
}

export function useScopes(): {
  scopes: UserScope[];
  isLoading: boolean;
  isError: boolean;
} {
  const { data, error } = useSWR("/scopes", fetcher);

  return {
    scopes: data || [],
    isLoading: !error && !data,
    isError: error,
  };
}

export function useCurrentScope(): { src: string; name: string } {
  const { scopes } = useScopes();
  const { scope } = useContext(ScopeContext);
  const { user } = useUser();

  return useMemo(() => {
    if (scope === "-") {
      return {
        src: user?.avatar || "",
        name: user?.displayName || "",
      };
    }

    const scopedUser = scopes.find(({ scopeId }) => scopeId === scope);
    return {
      src: scopedUser?.scopeAvatar || "",
      name: scopedUser?.scopeName || "",
    };
  }, [scopes, scope, user]);
}

export function useScopedApiKey(): string {
  const { scopes } = useScopes();
  const { scope } = useContext(ScopeContext);
  const { user } = useUser();

  return useMemo(() => {
    if (scope === "-") {
      return user?.frameApiKey || "";
    }

    const scopedUser = scopes.find(({ scopeId }) => scopeId === scope);
    return scopedUser?.apiKey || "";
  }, [scopes, scope, user]);
}
