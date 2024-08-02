"use client";

import Nav from "./Nav";
import { MenuProvider } from "@/contexts";

const NavBar = () => {
  return (
    <MenuProvider>
      <Nav />
    </MenuProvider>
  );
};

export default NavBar;
