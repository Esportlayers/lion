import { Button, Popover, useTheme } from '@geist-ui/react';
import { ReactElement, useState } from 'react';

import AccountSwitch from './AccountSwitch';
import { ChevronUpDown } from '@geist-ui/react-icons'

export default function AccountToggle(): ReactElement {
  const [visible, setVisible] = useState(false);
  const theme = useTheme();

  return <Popover
    content={<AccountSwitch onSelect={() => setVisible(false)} />}
    placement="bottomEnd"
    portalClassName="accountSwitchPopover"
    visible={visible}
    onVisibleChange={setVisible}
  >
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