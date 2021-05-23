import { ReactElement, useCallback, useContext } from "react";

import { Button } from "@geist-ui/react";
import { LoadingContext } from "context/LoadingContext";
import { fetcher } from "@/modules/streamdotaAPI";

export default function ChatMessageAction(_actions, rowData): ReactElement {
  const { loading, setLoading } = useContext(LoadingContext);

  const onShowOverlay = useCallback(async () => {
    if (!loading) {
      await fetcher(
        "/live/keywordQuestion",
        {
          method: 'POST',
          body: JSON.stringify(rowData.rowValue.origin)
        }
      );
      setLoading(true);
    }
  }, [loading]);

  return <Button size={'small'} auto loading={loading} onClick={onShowOverlay}>
    Show
  </Button>;
}