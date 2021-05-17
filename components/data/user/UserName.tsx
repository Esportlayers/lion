import { ReactElement } from "react";
import { useUser } from "@/hooks/data/useUser";

export default function UserName(): ReactElement {
  const { user } = useUser();

  return <div>{user?.displayName}</div>;

}