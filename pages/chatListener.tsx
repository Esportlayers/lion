import { Page, Text } from "@geist-ui/react";

import { NextSeo } from 'next-seo';
import { ReactElement } from "react";
import useRequireAuth from "@/hooks/useRequireAuth";

export default function Home(): ReactElement {
  useRequireAuth();
  return (
    <Page size={'large'}>
      <NextSeo title={'Chat Listener - streamdota.com'} />
      <Text h2>Chat Listener</Text>
      <style jsx>{`
        div {
          width: 2rem;
        }
      `}</style>
    </Page>
  )
}
