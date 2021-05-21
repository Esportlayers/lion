import { Button, Popover, useTheme } from '@geist-ui/react';

import AccountSwitch from './AccountSwitch';
import { ChevronUpDown } from '@geist-ui/react-icons'
import { ReactElement } from 'react';

export default function AccountToggle(): ReactElement {
  const theme = useTheme();

  return <Popover content={<AccountSwitch />} placement="bottomEnd" portalClassName="accountSwitchPopover">
    <Button iconRight={<ChevronUpDown />} auto size="small" className="accountSwitchButton" />

    <style jsx global>{`
      .accountSwitchPopover {
        width: 240px !important;

        & .item:hover {
          background-color: ${theme.palette.accents_1};
          cursor: pointer;
        }

        & .item .user {
          padding: 0;
        }
      }

      .accountSwitchButton {
        padding: 0 .2rem!important;
      }
    `}</style>
  </Popover>
}