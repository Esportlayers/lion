import { ReactElement, useMemo } from "react";

import { BASE_API_URL } from "@/modules/streamdotaAPI";
import { User } from "@geist-ui/react";
import { useUser } from "@/hooks/data/useUser";

export default function UserRow(): ReactElement {
  const { user, isLoading, isError } = useUser();

  const url = useMemo(() => {
    if (!isLoading && !isError) {
      return BASE_API_URL + user?.avatar;
    }
    return ''
  }, [isError, isLoading, user]);

  return <User src={url} name={user?.displayName || ''} />
}