"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { GiTeacher } from "react-icons/gi";
import { useContext } from "react";
import { MenuContext } from "@/contexts";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import navMenu from "../constants/nav";
import { LiaVideoSolid } from "react-icons/lia";
import { GiBookshelf } from "react-icons/gi";
import { IoIosMan } from "react-icons/io";
import { IoIosMenu } from "react-icons/io";
import { MdOutlineChurch, MdOutlineClose } from "react-icons/md";

const icons: {
  teachings: React.ReactNode;
  videos: React.ReactNode;
  publications: React.ReactNode;
  point_man: React.ReactNode;
  sgf: React.ReactNode;
} = {
  teachings: <GiTeacher className="text-[50px]" />,
  videos: <LiaVideoSolid className="text-[50px]" />,
  publications: <GiBookshelf className="text-[50px]" />,
  point_man: <IoIosMan className="text-[50px]" />,
  sgf: <MdOutlineChurch className="text-[50px]" />,
};

const getIconElement = (icon: string): React.ReactNode => {
  //check if icon exists
  if (icons.hasOwnProperty(icon)) {
    // @ts-ignore
    const sendIcon = icons[icon];
    return sendIcon;
  }
};

const Nav = () => {
  const [menuOpen, setMenuOpen] = useContext(MenuContext);

  return (
    <div className="w-full flex bg-cyan-950 h-[50px] sm:h-[70px]">
      <div className="mr-auto">
        <Image
          width={150}
          height={0}
          src="/images/logo.png"
          alt="logo png"
          className="absolute w-[180px] md:top-[-15px] lg:top-[-15px] md:left-[-37px] lg:left-[-37px] sm:w-[150px] sm:left-[-30px]"
        />
      </div>
      <div>
        {menuOpen ? (
          <MdOutlineClose
            className="lg:hidden md:hidden sm:text-[50px] text-white sm:absolute sm:right-4 sm:top-2 sm:z-[20]"
            onClick={() => setMenuOpen(false)}
          />
        ) : (
          <IoIosMenu
            className="lg:hidden md:hidden sm:text-[50px] text-white sm:absolute sm:right-4 sm:top-2 sm:z-10"
            onClick={() => setMenuOpen(true)}
          />
        )}
        <NavigationMenu className={!menuOpen ? "sm:hidden" : ""}>
          <NavigationMenuList>
            {navMenu.map((nav_item, idx) => (
              <NavigationMenuItem key={`${idx}`}>
                {nav_item.submenuItems ? (
                  <>
                    <NavigationMenuTrigger>{`${nav_item.label}`}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] ">
                        {nav_item.submenuItems.map((component, idx) => (
                          <div
                            className="flex items-center justify-start gap-1"
                            key={idx}
                          >
                            {component.icon && getIconElement(component.icon)}
                            <ListItem
                              key={component.title}
                              title={component.title}
                              href={component.url}
                            >
                              {component.description}
                            </ListItem>
                          </div>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <Link
                    className="bg-cyan-950"
                    href={`${nav_item.url}`}
                    legacyBehavior
                    passHref
                  >
                    <NavigationMenuLink
                      onClick={() => setMenuOpen(false)}
                      className={navigationMenuTriggerStyle()}
                    >
                      {`${nav_item.label}`}
                    </NavigationMenuLink>
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};
export default Nav;

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li className="w-full">
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
