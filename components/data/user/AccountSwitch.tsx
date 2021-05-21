import { Popover, Text } from "@geist-ui/react";

import { Plus } from "@geist-ui/react-icons";
import { ReactElement } from "react";
import UserRow from "./UserRow";
import { useTheme } from "@geist-ui/react";

export default function AccountSwitch(): ReactElement {
  const theme = useTheme();
  return <>
    <Popover.Item>
      <UserRow />
    </Popover.Item>
    <Popover.Item line />
    <div className={'header'}>
      <Text h6 type={'secondary'}>Linked Accounts</Text>
    </div>
    <Popover.Item>
      <UserRow />
    </Popover.Item>
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