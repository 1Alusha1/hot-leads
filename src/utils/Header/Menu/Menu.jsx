import { motion } from "framer-motion";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

import "./Menu.scss";
import { anim, ModalAnim } from "@/lib/helpers/anim";
import Link from "next/link";

export const Menu = ({ isActive, setIsActive, data }) => {
    useEffect(() => {
      const handleScroll = () => {
        if (isActive) {
          setIsActive(false);
        }
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [isActive]);
  

  return (
    <motion.div className="menu" {...anim(ModalAnim.wrapperPresence)}>
      <Image
        fill
        alt=""
        src="/images/MenuBg.png"
        className="menu__background"
      />
      <div className="top">
        <Image
          alt="top-logo"
          src="/images/logo.svg"
          width={200}
          height={200}
          className="menu__logo"
        />
        <div className="menu__back-button" onClick={() => setIsActive(false)}>
          <svg
            className="menu__back-button-icon"
            viewBox="0 0 26 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0.292893 7.29289C-0.0976311 7.68342 -0.0976311 8.31658 0.292893 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292893 7.29289ZM26 7L1 7V9L26 9V7Z" />
          </svg>
          BACK
        </div>
      </div>
      <div className="navigation">
        <div className="left">
          {data.navlist.map((currL, i) => (
            <motion.div
              onClick={() => handleClick(currL.link)}
              key={i}
              className="navigation__link upperCase bold"
              {...anim(ModalAnim.menuItemsPresence)}
              custom={i}
            >
              <Link href="" className="fz--100 fz--tablet-100 fz--mobile-40">
                {currL.name}
              </Link>
              <span className="number light">[ {i + 1} ]</span>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="bottom">
        <div className="socials">
          {data.bottom.socials.map((item, index) => (
            <div className="socials__link" key={index}>
              <Image src={item.icon} alt={item.title} width={30} height={30} />
              <Link className="fz--mobile-16" href={item.link} target="_blank">
                {item.title}
                <span className="socials__link__text-line" />
              </Link>
            </div>
          ))}
        </div>
        <span className="line"></span>
        <div className="policy">
          {data.bottom.policy.map((item, index) => (
            <Link href={item.link} key={index} className="policy__link">
              {item.title}
            </Link>
          ))}
        </div>
      </div>
      <div className="running-text__wrapper">
        <div className="running-text">
          <span className="fz--70 fz--mobile-40">
            HOTLEADSHOTLEADSHOTLEADSHOTLEADSHOTLEADSHOTLEADSHOTLEADS
          </span>
          <span className="fz--70 fz--mobile-40">
            HOTLEADSHOTLEADSHOTLEADSHOTLEADSHOTLEADSHOTLEADSHOTLEADS
          </span>
        </div>
      </div>
    </motion.div>
  );
};
