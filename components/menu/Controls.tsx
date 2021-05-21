import { Button, Popover, useTheme } from "@geist-ui/react";

import { ReactElement } from "react";
import UserAvatar from "../data/user/UserAvatar";
import UserControls from "./UserControls";

export default function Controls(): ReactElement {
  const theme = useTheme();
  return <div>
    <Button size={'small'} auto>Feedback</Button>
    <Popover content={<UserControls />} placement="bottomEnd" portalClassName="userControlsPopover">
      <button className="userControlsButton">
        <UserAvatar />
      </button>
    </Popover>


    <style jsx>{`
      div {
        display: flex;
        align-items: center;
        gap: ${theme.layout.gap};
      }

      .userControlsButton {
        border: none;
        background: none;
        padding: 0;
        margin: 0;
        appearance: none;
        cursor: pointer;
      }
      
      :global(.userControlsPopover) {
        width: 180px !important;
      }
    `}</style>
  </div>;
}