"use client";
import React, { useContext, useRef, useState } from "react";
import "./AboutService.scss";
import { DataContext } from "@/lib/providers/DataProvider/context";
import Image from "next/image";
import classNames from "classnames";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { aboutAnim, anim, buySellAnim, presenceAnim } from "@/lib/helpers/anim";
import { ModalContext } from "@/lib/providers/ModalProvider/ModalProvider";
import { Button } from "@/utils/Button/Button";

export default function AboutService({ type = "buy" }) {
  const { isActiveModal, setisActiveModal } = useContext(ModalContext);
  const { data: fullData } = useContext(DataContext);

  // Get the right data based on section type
  const { aboutService: data } = fullData;
  const isBuy = type === "buy";

  const [isAnimated, setIsAnimated] = useState(false);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["10% 100%", "20% 100%"],
    layoutEffect: false,
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isAnimated && latest === 1) {
      setIsAnimated(latest === 1);
    }
  });

  return (
    <motion.section
      {...presenceAnim(aboutAnim, isAnimated)}
      className={`service-section-wrapper service-section--${type}`}
      ref={sectionRef}
      id="aboutService"
    >
      <div className={`service-section`}>
        <motion.div
          className="service-section__doll"
          {...presenceAnim(aboutAnim, isAnimated)}
          custom={1}
        >
          <Image src={`/images/${type}Section/doll.webp`} alt="" fill />
        </motion.div>
        <div
          className={classNames("top-titles uppercase", {
            "top-titles--right": !isBuy,
          })}
        >
          <span className={`fz--180 fz--mobile-60 ${isBuy ? "green" : "red"}`}>
            {type}
          </span>
          <span className="fz--180 fz--mobile-60">{type}</span>
          <span className="fz--180 fz--mobile-60">{type}</span>
          <span className="fz--180 fz--mobile-60">{type}</span>
          <span className="fz--180 fz--mobile-60">{type}</span>
        </div>
        <div className={classNames("list", { "list--right": !isBuy })}>
          {data.list.map((item, index) => (
            <motion.div
              key={`aboutService-list-${index}`}
              {...presenceAnim(aboutAnim, isAnimated)}
              custom={index + 2}
              className={classNames("item", {
                "item--long": item?.big,
              })}
            >
              <div className="item__title">{item.title}</div>
              <p
                className="item__text"
                dangerouslySetInnerHTML={{ __html: item.text }}
              />
            </motion.div>
          ))}
          <Button
            classes={`list-button ${isBuy ? "button--green" : ""}`}
            modalType="contact"
          >
            {data.button?.text}
          </Button>
        </div>
      </div>
    </motion.section>
  );
}
