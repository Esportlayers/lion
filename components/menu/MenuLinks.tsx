import { Breadcrumbs, User, useTheme } from "@geist-ui/react";

import AccountToggle from "../data/user/AccountToggle";
import { BASE_API_URL } from "@/modules/streamdotaAPI";
import Controls from './Controls';
import Link from 'next/link';
import { ReactElement } from "react";
import StreamdotaIcon from './Icon.svg';
import { useCurrentScope } from "@/hooks/data/useScopes";

export default function MenuLinks(): ReactElement {
  const theme = useTheme();
  const scope = useCurrentScope();

  return <nav>
    <Breadcrumbs size={'large'}>
      <Breadcrumbs.Item>
        <div className={'site-name'}>
          <Link href={'/'} aria-label={'Go home'}>
            <a>
              <StreamdotaIcon />
            </a>
          </Link>
        </div>
      </Breadcrumbs.Item>
      <Breadcrumbs.Item>
        <div>
          <User src={BASE_API_URL + scope.src} name={scope.name} />
          <AccountToggle />
        </div>
      </Breadcrumbs.Item>
    </Breadcrumbs>

    <div className={'controls'}>
      <Controls />
    </div>


    <style jsx>{`
      nav {
        margin: 0 auto;
        max-width: 1000px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 ${theme.layout.gap};

        & :global(.Icon_svg__streamdota-icon) {
          width: 36px;
          height: 23px;
        }
      }

      div, a {
        display: flex;
        align-items: center;
      }
    `}</style>
  </nav>
}