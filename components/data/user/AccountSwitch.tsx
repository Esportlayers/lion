import { Popover, Text, User } from "@geist-ui/react";
import { ReactElement, useCallback, useContext } from "react";

import { BASE_API_URL } from "@/modules/streamdotaAPI";
import { Plus } from "@geist-ui/react-icons";
import { ScopeContext } from "context/ScopeContext";
import UserRow from "./UserRow";
import { useScopes } from "@/hooks/data/useScopes";
import { useTheme } from "@geist-ui/react";

interface Props {
  onSelect: () => void;
}

export default function AccountSwitch({ onSelect }: Props): ReactElement {
  const theme = useTheme();
  const { isLoading, scopes } = useScopes();
  const { setScope } = useContext(ScopeContext);

  const onSelectScope = useCallback((scopeId: '-' | number) => {
    onSelect();
    setScope(scopeId);
  }, [onSelect, setScope]);

  return <>
    <Popover.Item onClick={() => onSelectScope('-')}>
      <UserRow />
    </Popover.Item>

    {!isLoading && scopes && scopes.length > 0 && <>
      <Popover.Item line />

      <div className={'header'}>
        <Text h6 type={'secondary'}>Linked Accounts</Text>
      </div>

      {scopes.map(({ scopeAvatar, scopeName, scopeId }) => <Popover.Item key={scopeId} onClick={() => onSelectScope(scopeId)}>
        <User src={BASE_API_URL + scopeAvatar} name={scopeName || ''} />
      </Popover.Item>)}
    </>}

    <Popover.Item line />

    <Popover.Item>
      <div className={'link'}>
        <div>Link Account</div>
        <Plus color={theme.palette.accents_4} />
      </div>
    </Popover.Item>

    <style jsx>{`
      .header {
        padding: 8pt 16pt;
        text-align: left;
      }
      
      .link {
        display: flex;
        justify-content: space-between;
      }
    `}</style>
  </>
}