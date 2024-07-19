"use client";

import { scrollToSection } from "@/lib/utils";
import { useEffect, useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import Link from "next/link";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./LanguageSwitch";
import { usePathname, useRouter } from "@/navigation";
function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const [menu, setMenu] = useState(false);
  const t = useTranslations();
  const links = ["help", "faq"];
  const toggleMenu = () => {
    setMenu(!menu);
  };

  const handleClick = async (sectionId: string) => {
    if (pathname === "/") {
      // If on home page, scroll directly
      toggleMenu();
      scrollToSection(sectionId);
    } else {
      // If on another page, navigate to home then scroll
      router.push("/");
      toggleMenu();
      setTimeout(() => scrollToSection(sectionId), 100);
    }
  };

  return (
    <div className="md:sticky md:top-0  md:shadow-none z-30 ">
      {/* DESKTOP */}
      <div className=" hidden lg:block animate-in fade-in zoom-in bg-white p-4 shadow-lg">
        <div className="flex justify-between mx-[41px] lg:mx-20 items-center">
          <div>
            <Link href={"/"}>
              <img src={"/images/logomain.png"} width={200} alt="logo" />
            </Link>
          </div>
          <div className="flex items-center gap-[40px] select-none">
            {links.map((link, index) => (
              <span
                className={`hover:text-primary-200 cursor-pointer font-bold flex items-center gap-2 text-gray text-nowrap`}
                key={index}
                onClick={() => handleClick(link)}
              >
                {t(link)}
              </span>
            ))}
            <div>
              <LocaleSwitcher />
            </div>
          </div>
        </div>
      </div>
      {/* MOBILE */}
      <div
        className={` block lg:hidden shadow-sm  fixed top-0 w-full z-[999] bg-white py-4 animate-in fade-in zoom-in  ${
          menu ? " bg-primary py-2" : ""
        } `}
      >
        <div className="flex justify-between mx-[10px]">
          <div className="flex gap-[50px] text-[16px] items-center select-none">
            <Link href={"/"}>
              <img src={"/images/logomain.png"} width={150} alt="logo" />
            </Link>
          </div>
          <div className="flex items-center gap-[40px]">
            {menu ? (
              <IoClose
                className="cursor-pointer animate-in fade-in zoom-in text-3xl text-black"
                onClick={toggleMenu}
              />
            ) : (
              <IoMenu
                className="cursor-pointer animate-in fade-in zoom-in text-3xl"
                onClick={toggleMenu}
              />
            )}
          </div>
        </div>
        {menu ? (
          <div className="my-8 select-none animate-in slide-in-from-right">
            <div className="flex flex-col gap-8 mt-8 mx-4">
              {links.map((link, index) => (
                <p
                  className={`hover:text-primary cursor-pointer font-bold flex items-center gap-2  text-gray`}
                  key={index}
                  onClick={() => handleClick(link)}
                >
                  {t(link)}
                </p>
              ))}
              <LocaleSwitcher />
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
