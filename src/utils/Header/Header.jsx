"use client";
import React, { useContext, useEffect, useState } from "react";
import { Logo } from "../Logo/Logo";

import "./Header.scss";
import Link from "next/link";
import { LocaleContext } from "@/lib/providers/LocaleContext/context";
import { URL_HEADER } from "@/lib/helpers/DataUrls";
import { getFetchData } from "@/lib/helpers/DataFetch";
import { useLanguageContent } from "@/lib/helpers/useLanguageContent";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "./Menu/Menu";
import { ModalContext } from "@/lib/providers/ModalProvider/ModalProvider";
import useIsDesktop from "@/lib/helpers/useIsDesktop";
import { anim, headerAnim } from "@/lib/helpers/anim";

export default function Header({ type }) {
  const [data, setData] = useState(null);
  const isDesktop = useIsDesktop();
  const { isActiveModal, setisActiveModal } = useContext(ModalContext);
  const [isMenuActive, setIsMenuActive] = useState(false);

  const path = usePathname();
  const { lang } = useContext(LocaleContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getFetchData(URL_HEADER);

        setData(useLanguageContent(result, lang));
      } catch (error) {
        console.error("Error fetching header data:", error);
      }
    }

    fetchData();
  }, [path, lang]);

  const getLanguagePath = (targetLang, currentPath) => {
    // Handle root path special case
    if (currentPath === "/" || currentPath === "/ua" || currentPath === "/ru") {
      return targetLang === "en" ? "/" : `/${targetLang}`;
    }

    // Handle regular paths
    const pathWithoutLang = currentPath.replace(/^\/(ua|ru)\//, "/");

    if (targetLang === "en") {
      return pathWithoutLang; // Remove language prefix for English
    } else {
      return `/${targetLang}${pathWithoutLang === "/" ? "" : pathWithoutLang}`;
    }
  };

  return (
    data && (
      <motion.header {...anim(headerAnim)} className="header">
        <Link
          href={lang !== "en" ? `/${lang}` : "/"}
          className="header__logo-link"
        >
          <Logo className="header__logo" />
        </Link>

        <div
          className={classNames("header__wrapper", {
            "header__wrapper--active": isActiveModal.active,
          })}
        >
          {isActiveModal.active && !isDesktop && (
            <div
              className="header__back-button"
              onClick={() => setisActiveModal({ active: false, type: "" })}
            >
              <svg
                className="header__back-button-icon"
                viewBox="0 0 26 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0.292893 7.29289C-0.0976311 7.68342 -0.0976311 8.31658 0.292893 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292893 7.29289ZM26 7L1 7V9L26 9V7Z" />
              </svg>
              BACK
            </div>
          )}
          <ul className="header__list">
            {isActiveModal.active && (
              <div
                className="header__back-button"
                onClick={() => setisActiveModal({ active: false, type: "" })}
              >
                <svg
                  className="header__back-button-icon"
                  viewBox="0 0 26 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0.292893 7.29289C-0.0976311 7.68342 -0.0976311 8.31658 0.292893 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292893 7.29289ZM26 7L1 7V9L26 9V7Z" />
                </svg>
                BACK
              </div>
            )}
            {data.navlist?.map((currLink, index) => (
              <Link
                key={`header_link_${index}`}
                className={classNames("link", {
                  "link--red": type === "sell",
                })}
                href={currLink.link}
                data-use-scroll={currLink.link}
              >
                <span>{currLink.name}</span>
              </Link>
            ))}
          </ul>
          <div className="lang-swith">
            <Link
              href={getLanguagePath("ua", path)}
              className={classNames("link", {
                "link--active": lang === "ua",
                "link--red": type === "sell",
              })}
            >
              ua
            </Link>
            <span>/</span>
            <Link
              href={getLanguagePath("ru", path)}
              className={classNames("link", {
                "link--active": lang === "ru",
                "link--red": type === "sell",
              })}
            >
              ru
            </Link>
            <span>/</span>
            <Link
              href={getLanguagePath("en", path)}
              className={classNames("link", {
                "link--active": lang === "en",
                "link--red": type === "sell",
              })}
            >
              en
            </Link>
          </div>{" "}
          <div className="menu-wrapper">
            <div className="menu__button" onClick={() => setIsMenuActive(true)}>
              <p className="uppercase">Menu</p>
            </div>
            <AnimatePresence mode="wait">
              {isMenuActive && (
                <Menu
                  isActive={isMenuActive}
                  setIsActive={setIsMenuActive}
                  data={data}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.header>
    )
  );
}
