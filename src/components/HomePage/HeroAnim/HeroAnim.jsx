"use client";
import React, { useContext, useRef, useState } from "react";
import Hero from "../Hero/Hero";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import "./HeroAnim.scss";
import BuySell from "../BuySell/BuySell";
import useIsDesktop from "@/lib/helpers/useIsDesktop";
import { ModalContext } from "@/lib/providers/ModalProvider/ModalProvider";
import { anim, heroAnim } from "@/lib/helpers/anim";

export default function HeroAnim() {
  const isDesktop = useIsDesktop();
  const heroAnimRef = useRef(null);
  const [isAnimated, setIsAnimated] = useState(false)
  const [animPlay, setAnimPlay] = useState(false);
  

  const { scrollYProgress } = useScroll({
    target: heroAnimRef,
    offset: ["0% 0%", "80% 100%"],
    layoutEffect: false,
  });

  const springScroll = useSpring(scrollYProgress, {
    stiffness: 1000,
    damping: 90,
  });

  const scale = useTransform(springScroll, [0, 1], [2.8, 1]);
  const y = useTransform(springScroll, [0, 1], ["-100%", "20%"]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // if (latest === 1 && !isAnimated) {
    //   setAnimPlay(true);
    //   setIsAnimated(true);
    // }
    setAnimPlay(latest === 1);
    if (latest !== 1 && isDesktop) {
      setisActiveModal({ active: false, type: "" });
    }
  });

  return (
    <>
      <div className="hero-anim__wrapper" ref={heroAnimRef}>
    
        <Hero />
        <BuySell
          animPlay={animPlay}
          isActiveModal={isActiveModal}
          setisActiveModal={setisActiveModal}
        />
      </div>
    </>
  );
}
