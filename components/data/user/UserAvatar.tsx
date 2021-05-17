import { ReactElement, useMemo } from "react";

import { Avatar } from "@geist-ui/react";
import { BASE_API_URL } from "@/modules/streamdotaAPI";
import { useUser } from "@/hooks/data/useUser";

export default function UserAvatar(): ReactElement {
  const { user, isLoading, isError } = useUser();

  const url = useMemo(() => {
    if (!isLoading && !isError) {
      return BASE_API_URL + user?.avatar;
    }
    return ''
  }, [isError, isLoading, user]);

  return <Avatar size="small" src={url} />
}