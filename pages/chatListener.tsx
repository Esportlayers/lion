import { Page, Spacer, Text } from "@geist-ui/react";
import Tether, { EventTypes, getWSUrl } from "@esportlayers/io";

import { BASE_API_URL } from "@/modules/streamdotaAPI";
import ChatListenerTable from "@/components/pages/chatListener/ChatListenerTable";
import ChatListenerTile from "@/components/tiles/ChatListenerTile";
import { NextSeo } from 'next-seo';
import { ReactElement } from "react";
import useRequireAuth from "@/hooks/useRequireAuth";
import { useScopedApiKey } from "@/hooks/data/useScopes";

export default function Home(): ReactElement {
  useRequireAuth();
  const apiKey = useScopedApiKey();

  return (<>
    <NextSeo title={'Chat Listener - streamdota.com'} />
    <Page>
      <Text h2>Chat Listener</Text>
      <ChatListenerTile />
      <Spacer y={2} />
      <Text h3>Received messages</Text>
      <Tether url={getWSUrl(BASE_API_URL + '/live/scoped/' + apiKey)} scopes={[EventTypes.keyword_message, EventTypes.keyword_message_overlay]}>
        <ChatListenerTable />
      </Tether>
      <style jsx>{`
        div {
          width: 2rem;
        }
      `}</style>
    </Page>
  </>)
}
