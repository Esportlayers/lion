import MenuLinks from "./MenuLinks";
import { ReactElement } from "react";
import SubMenu from "./SubMenu";

export default function Menu(): ReactElement {
  return <div>
    <MenuLinks />
    <SubMenu />
  </div>
}