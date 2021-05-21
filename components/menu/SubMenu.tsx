import { ReactElement, useEffect, useState } from "react";
import { Tabs, useTheme } from "@geist-ui/react";

import cs from 'classnames';
import { useRouter } from "next/dist/client/router";

export default function SubMenu(): ReactElement {
  const theme = useTheme();
  const [sticky, setSticky] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const scrollHandler = () => setSticky(document.documentElement.scrollTop > 60);
    document.addEventListener('scroll', scrollHandler);
    return () => document.removeEventListener('scroll', scrollHandler);
  }, [setSticky]);

  return <div className={cs('wrapper', { sticky })}>
    <div className={'inner'}>
      <Tabs value={router.asPath} onChange={(route) => router.push(route)}>
        <Tabs.Item label="Dashboard" value="/" />
        <Tabs.Item label="Chat Listener" value="/chatListener" />
      </Tabs>

    </div>

    <style jsx>{`
        .wrapper {
          height: 48px;
          position: relative;
          overflow: hidden;
          box-shadow: inset 0 -1px ${theme.palette.border};
        }
        
        .sticky {
          position: fixed;
          z-index: 10;
          top: 0;
          right: 0;
          left: 0;
          background: ${theme.palette.background};
          box-shadow: rgba(0, 0, 0, 0.1) 0 0 15px 0;
        }

        .inner {
          display: flex;
          width: ${theme.layout.pageWidthWithMargin};
          max-width: 100%;
          margin: 0 auto;
          padding: 0 ${theme.layout.pageMargin};
          height: 48px;
          box-sizing: border-box;
          overflow-y: hidden;
          overflow-x: auto;
          overflow: -moz-scrollbars-none;
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          box-sizing: border-box;

          &::-webkit-scrollbar {
            display: none;
          }

          & :global(.content) {
            display: none;
          }

          & :global(.tabs),
          & :global(header) {
            height: 100%;
            border: none;
          }

          & :global(.tab) {
            height: calc(100% - 2px);
            padding-top: 0;
            padding-bottom: 0;
            color: ${theme.palette.accents_5};
            font-size: 0.875rem;
          }
          & :global(.tab):hover {
            color: ${theme.palette.foreground};
          }
          & :global(.active) {
            color: ${theme.palette.foreground};
          }
        }
    `}</style>
  </div>
}