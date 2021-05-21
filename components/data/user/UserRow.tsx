import { ReactElement, useMemo } from "react";

import AccountToggle from "./AccountToggle";
import { BASE_API_URL } from "@/modules/streamdotaAPI";
import { User } from "@geist-ui/react";
import { useUser } from "@/hooks/data/useUser";

interface Props {
  withAccountSwitch?: boolean;
}

export default function UserRow({ withAccountSwitch }: Props): ReactElement {
  const { user, isLoading, isError } = useUser();

  const url = useMemo(() => {
    if (!isLoading && !isError) {
      return BASE_API_URL + user?.avatar;
    }
    return ''
  }, [isError, isLoading, user]);

  return <div className={'row'}>
    <User src={url} name={user?.displayName || ''} />
    {withAccountSwitch && <AccountToggle />}

    <style jsx>{`
      .row {
        display: flex;
        align-items: center;
      }
    `}</style>
  </div>
}