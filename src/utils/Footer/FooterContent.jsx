"use client";
import { DataContext } from "@/lib/providers/DataProvider/context";
import React, { useContext, useRef, useState } from "react";
import { Button } from "../Button/Button";
import { HoverAnim } from "../HoverAnim/HoverAnim";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { footerAnim, presenceAnim } from "@/lib/helpers/anim";
import classNames from "classnames";

export default function FooterContent({ type }) {
  const { data } = useContext(DataContext);
  const [isAnimated, setIsAnimated] = useState(true);
  const footerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["0% 100%", "40% 100%"],
    layoutEffect: false,
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isAnimated && latest === 1) {
      setIsAnimated(latest === 1);
    }
  });

  return (
    <footer className="footer" ref={footerRef}>
      <motion.div
        {...presenceAnim(footerAnim.doll, isAnimated)}
        className="footer__image"
      >
        <Image
          src={type === "buy" ? "/images/footer/footer-buy.webp" : "/images/footer/footer.webp"}
          fill
          alt="footer"
        />
      </motion.div>
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
      <div className="left">
        <div className="borders">
          <motion.svg
            {...presenceAnim(footerAnim.borders, isAnimated)}
            custom={"left"}
            className="border border--left-top"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 18.002V11.002C1 5.47911 5.47715 1.00195 11 1.00195H18"
              stroke="#A7A7A7"
            />
          </motion.svg>
          <motion.svg
            {...presenceAnim(footerAnim.borders, isAnimated)}
            custom={"right"}
            className="border border--right-top"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 18.002L17 11.002C17 5.47911 12.5228 1.00195 7 1.00195L2.68221e-07 1.00195"
              stroke="#A7A7A7"
            />
          </motion.svg>
          <motion.svg
            {...presenceAnim(footerAnim.borders, isAnimated)}
            custom={"right"}
            className="border border--right-bottom"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-5.88596e-07 17L7 17C12.5228 17 17 12.5228 17 7L17 2.68221e-07"
              stroke="#A7A7A7"
            />
          </motion.svg>
          <motion.svg
            className="border border--left-bottom"
            {...presenceAnim(footerAnim.borders, isAnimated)}
            custom={"left"}
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 -5.88596e-07L1 7C1 12.5228 5.47715 17 11 17H18"
              stroke="#A7A7A7"
            />
          </motion.svg>
        </div>
        <div className="footer__title">
          {data.left.title.split(" ").map((word, index) => (
            <motion.p
              {...presenceAnim(footerAnim.title, isAnimated)}
              custom={index}
              key={index}
              className={classNames("fz--58 fz--mobile-40 uppercase", {
                red: type === "sell",
                green: type === "buy",
              })}
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
        {/* <h1
          className="fz--58 fz--mobile-40 footer__title"
          dangerouslySetInnerHTML={{ __html: data.left.title }}
        /> */}
        <motion.p
          {...presenceAnim(footerAnim.opacity, isAnimated)}
          custom={0.5}
          className="left__text shadow light"
        >
          {data.left.text}
        </motion.p>
        <motion.div
          {...presenceAnim(footerAnim.opacity, isAnimated)}
          custom={0.7}
        >
          <Button
            classes={type === "buy" && "button--green"}
            modalType="contact"
          >
            {data.left.button.text}
          </Button>
        </motion.div>
      </div>
      <div className="right">
        <div className="socials">
          {data.right.socials.map((item, index) => (
            <motion.div
              {...presenceAnim(footerAnim.links, isAnimated)}
              custom={index}
              className="socials__link"
              key={index}
            >
              <Image src={item.icon} alt={item.title} width={30} height={30} />
              <HoverAnim wrapperClass="" href={item.link} target="_blank">
                {item.title}
              </HoverAnim>
            </motion.div>
          ))}
        </div>
        <div className="policy">
          {data.right.policy.map((item, index) => (
            <Link href={item.link} key={index} className="policy__link">
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
