import { Input, Spacer } from "@geist-ui/react";

import DebouncedInput from "../ui/DebouncedInput";
import { ReactElement } from "react";
import Switch from "../ui/Switch";
import { useUser } from "@/hooks/data/useUser";

export default function ChatListenerTile(): ReactElement {
  const { patch, user } = useUser();

  return <div>
    <Switch
      checked={Boolean(user?.useKeywordListener)}
      label={'Use keyword listener'}
      setChecked={(useKeywordListener) => patch({ useKeywordListener })} />

    <Spacer y={.5} />

    <DebouncedInput value={user?.keywordListener} setValue={(keywordListener) => patch({ keywordListener })} placeholder={'Keyword e.g. #twitch'} />
  </div>
}