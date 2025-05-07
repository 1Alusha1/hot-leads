"use client";

import React, { useContext, useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { DataContext } from "@/lib/providers/DataProvider/context";
import { Card } from "../Card";
import "./ResultsNew.scss";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { aboutAnim, presenceAnim } from "@/lib/helpers/anim";

const CustomSwiper = ({ customStyles = {} }) => {
  const { data } = useContext(DataContext);
  const { results } = data;
  const sectionRef = useRef(null);
  const [isSafari, setIsSafari] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [isAnimated, setIsAnimated] = useState(false);

  const { scrollYProgress } = useScroll({
    target: mounted && sectionRef,
    offset: ["10% 100%", "20% 100%"],
    layoutEffect: false,
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isAnimated && latest === 1) {
      setIsAnimated(latest === 1);
    }
  });

  // Проверяем браузер
  useEffect(() => {
    const safariCheck = /^((?!chrome|android).)*safari/i.test(
      navigator.userAgent
    );
    setIsSafari(safariCheck);
  }, []);

  // Устанавливаем mounted в true после монтирования компонента
  useEffect(() => {
    setMounted(true);
  }, []);

  // До монтирования ничего не рендерим, чтобы избежать расхождений между сервером и клиентом
  if (!mounted) return null;

  const swiperParams = {
    modules: [EffectCoverflow, A11y],
    direction: "horizontal",
    slidesPerView: "auto",
    centeredSlides: true,
    initialSlide: 2,
    grabCursor: true,
    slideToClickedSlide: true,
    loop: !isSafari,
    effect: "coverflow",
    speed: isSafari ? 300 : 600,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: isSafari ? 50 : 100,
      modifier: 1,
      slideShadows: false,
      scale: isSafari ? 0.92 : 0.9,
    },
    breakpoints: {
      0: { slidesPerView: "auto" },
    },
    ...customStyles,
  };

  return (
    <motion.section
      className="results"
      ref={sectionRef}
      id="results"
      {...presenceAnim(aboutAnim, isAnimated)}
    >
      <span className="results__title uppercase">{results?.title}</span>

      <motion.div custom={1} className="swiper-container">
        <Swiper {...swiperParams}>
          {[...results.list, ...results.list, ...results.list].map(
            (item, index) => (
              <SwiperSlide
                key={index}
                className="results-slide"
                style={{
                  transform: isSafari ? "translateZ(0)" : "none",
                }}
              >
                <div
                  className="results-slide__bg"
                  style={{
                    backgroundColor: item.type === "buy" ? "green" : "red",
                  }}
                />
                <Card data={item} />
              </SwiperSlide>
            )
          )}
        </Swiper>
      </motion.div>
    </motion.section>
  );
};

export default CustomSwiper;
