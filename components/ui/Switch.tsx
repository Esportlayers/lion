import { Toggle, useTheme } from "@geist-ui/react";

import { ReactElement } from "react";

interface Props {
  checked: boolean;
  label: string;
  setChecked: (checked: boolean) => void;
}

export default function Switch({ checked, label, setChecked }: Props): ReactElement {
  const theme = useTheme();
  return <div>
    <Toggle size="large" checked={checked} onChange={(event) => setChecked(event.target.checked)} />
    <label onClick={() => setChecked(!checked)}>{label}</label>
    <style jsx>{`
      div {
        display: flex;
        align-items: center;
        grid-gap: ${theme.layout.gapHalf};
      }
      label {
        cursor: pointer;
      }
    `}</style>
  </div>
}