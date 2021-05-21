import { Link, Popover } from "@geist-ui/react";
import { ReactElement, useCallback } from "react";

export default function UserControls(): ReactElement {
  const onLogout = useCallback(() => {
    localStorage.removeItem('jwt');
    location.href = 'https://streamdota.com';
  }, []);
  return <>
    <Popover.Item title>
      <span>User Settings</span>
    </Popover.Item>
    <Popover.Item>
      <Link onClick={onLogout} href={'#'}>Logout</Link>
    </Popover.Item>
  </>
}