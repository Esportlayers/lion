import { Button, useTheme } from "@geist-ui/react";

import { ReactElement } from "react";
import UserAvatar from "../data/user/UserAvatar";

export default function Controls(): ReactElement {
  const theme = useTheme();
  return <div>
    <Button size={'small'} auto>Feedback</Button>
    <UserAvatar />

    <style jsx>{`
      div {
        display: flex;
        align-items: center;
        gap: ${theme.layout.gap};
      }  
    `}</style>
  </div>;
}