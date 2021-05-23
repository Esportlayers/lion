import { ReactElement } from "react";
import { useTheme } from "@geist-ui/react";
import { useUser } from "@/hooks/data/useUser";

export default function ChatListenerMessage(_actions, rowData): ReactElement {
  const theme = useTheme();
  const { user } = useUser();
  const keyword = user?.keywordListener || '#griefcode';
  const highlighted = rowData.rowValue.origin.message.replace(new RegExp(keyword, 'ig'), `<span class='keywordHighlight'>${keyword}</span>`);
  return <>
    <span dangerouslySetInnerHTML={{ __html: highlighted }} />
    <style jsx global>{`
      .keywordHighlight {
        font-weight: bold;
        background-color: ${theme.palette.cyanLighter};
      }  
    `}</style>
  </>;
}