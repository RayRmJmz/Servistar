import { ReactElement } from "react";
import { useAuthenticationStore } from "../../store";
import SideNav from "./SideNav";
import HeaderNav from "./HeaderNav";

export default function Navs(): ReactElement | null {
  const isLoggedIn = useAuthenticationStore((state) => state.isLoggedIn);

  return isLoggedIn ? (
    <>
      <HeaderNav />
      <SideNav />
    </>
  ) : null;
}
