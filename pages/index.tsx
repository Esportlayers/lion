import { Loading } from "@geist-ui/react";
import { NextSeo } from 'next-seo';
import { ReactElement } from "react";
import useRequireAuth from "@/hooks/useRequireAuth";

export default function Home(): ReactElement {
  useRequireAuth();
  return (
    <div>
      <NextSeo title={'Dashboard - streamdota.com'} />
      <Loading type="success" size={'large'} />
      <style jsx>{`
        div {
          width: 2rem;
        }
      `}</style>
    </div>
  )
}
