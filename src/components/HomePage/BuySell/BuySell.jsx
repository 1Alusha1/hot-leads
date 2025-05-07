"use client";
import React, { useContext, useState, useEffect } from "react";
import "./BuySell.scss";
import { DataContext } from "@/lib/providers/DataProvider/context";
import Image from "next/image";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { anim, animModal, buySellAnim, presenceAnim } from "@/lib/helpers/anim";
import Link from "next/link";
import { HoverAnim } from "@/utils/HoverAnim/HoverAnim";
import { ModalContext } from "@/lib/providers/ModalProvider/ModalProvider";

export default function BuySell() {
  const { isActiveModal, setisActiveModal } = useContext(ModalContext);
  
  const { data: fullData } = useContext(DataContext);
  const { buysell: data } = fullData;
  const { buy } = data;
  const { sell } = data;

  const animPlay = true;

  const handleClick = (type) => {
    if (isActiveModal.active && isActiveModal.type === type) {
      return setisActiveModal({ active: false, type });
    } else {
      return setisActiveModal({ active: true, type });
    }
  };

  return (
    <section className="buy-sell">
      <div
        className={classNames("buy-sell__background buy-sell__background--active", {
        })}
      >
        <Image src="/images/buysell/buysell-bg.webp" alt="" fill />
      </div>

      <div className="buy-sell__mobile-background buy-sell__mobile-background--top">
        <Image src="/images/buysell/mobilebg1.png" alt="" fill />
      </div>
      <div className="buy-sell__mobile-background buy-sell__mobile-background--bottom">
        <Image src="/images/buysell/mobilebg2.png" alt="" fill />
      </div>
      <div className="buy-sell__table buy-sell__table--buy">
        <motion.h1
          {...presenceAnim(buySellAnim.title, animPlay)}
          className="fz--70 fz--mobile-54 uppercase title"
        >
          {buy.title}
        </motion.h1>
        <div className="list">
          {buy.list.map((item, index) => (
            <motion.div
              key={index}
              className="item"
              dangerouslySetInnerHTML={{ __html: item }}
              {...presenceAnim(buySellAnim.cards, animPlay)}
              custom={index}
            />
          ))}
        </div>
        <div
          className={classNames("sell-button sell-button--first", {
            "sell-button--first-active":
              isActiveModal.active && isActiveModal.type === "buy",
          })}
          onClick={() => handleClick("buy")}
        >
          Заказать тестовый пролив
        </div>
      </div>
      <div className="buy-sell__table buy-sell__table--sell">
        <motion.h1
          {...presenceAnim(buySellAnim.title, animPlay)}
          className="fz--70 fz--mobile-54 uppercase title"
        >
          {sell.title}
        </motion.h1>

        <div className="list">
          {sell.list.map((item, index) => (
            <motion.div
              key={index}
              className="item"
              dangerouslySetInnerHTML={{ __html: item }}
              {...presenceAnim(buySellAnim.cards, animPlay)}
              custom={index}
            />
          ))}
        </div>
        <div
          className={classNames("sell-button sell-button--second", {
            "sell-button--second-active":
              isActiveModal.active && isActiveModal.type === "sell",
          })}
          onClick={() => handleClick("sell")}
        >
          начать зарабатывать
        </div>
      </div>
      <div className="buttons-wrapper">
        <div
          className={classNames("sell-button sell-button--first", {
            "sell-button--first-active":
              isActiveModal.active && isActiveModal.type === "buy",
          })}
          onClick={() => handleClick("buy")}
        >
          Заказать тестовый пролив
        </div>
        <div
          className={classNames("sell-button sell-button--second", {
            "sell-button--second-active":
              isActiveModal.active && isActiveModal.type === "sell",
          })}
          onClick={() => handleClick("sell")}
        >
          начать зарабатывать
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isActiveModal.active && isActiveModal.type === "buy" && (
          <ActiveSection data={buy} isActiveModal={isActiveModal} type="buy" handleClick={handleClick} />
          // <motion.section
          //   className="active-section active-section--buy"
          //   {...anim(animModal.wrapperPresence)}
          // >
          //   <div className="active-section__title">
          //     {buy.section.title.map((item, index) => (
          //       <h1 key={index} className="fz--mobile-24">
          //         {item}
          //       </h1>
          //     ))}
          //   </div>

          //   <div className="active-section__list">
          //     {buy.section.list.map((item, index) => (
          //       <div key={index} className="item">
          //         <Image
          //           src={item.image}
          //           alt=""
          //           width={44}
          //           height={44}
          //           className="item__image"
          //         />
          //         <div className="text">
          //           <p className="fz--18 fz--mobile-16 shadow">[{index + 1}]</p>
          //           <p className="fz--18 fz--mobile-14 ">{item.title}</p>
          //         </div>
          //       </div>
          //     ))}
          //   </div>

          //   <div className="active-section__cta">
          //     <Image
          //       src="/images/buysell/tg.png"
          //       alt=""
          //       width={300}
          //       height={300}
          //       className="cta__image"
          //     />
          //     <p className="fz--18 fz--mobile-14 shadow">{buy.cta.title}</p>
          //     <div className="cta__link-wrapper">
          //       <HoverAnim modalType="contact">
          //         {buy.cta.button.title}
          //       </HoverAnim>
          //       <Image
          //         src="/images/arrow.svg"
          //         alt=""
          //         width={13}
          //         height={15}
          //         className="arrow"
          //       />
          //     </div>
          //   </div>

          //   <motion.div className="active-section__background">
          //     <Image src="/images/buysell/buysell-bg.png" alt="" fill />
          //   </motion.div>
          //   <motion.div
          //     className="active-section__doll"
          //     {...anim(animModal.doll)}
          //     custom={isActiveModal.type === "buy" ? 0 : 1}
          //   >
          //     <Image src="/images/hero/hero.png" alt="" fill />
          //   </motion.div>

          //   <div className="buttons-wrapper">
          //     <div
          //       className={classNames("sell-button sell-button--first", {
          //         "sell-button--first-active":
          //           isActiveModal.active && isActiveModal.type === "buy",
          //       })}
          //       onClick={() => handleClick("buy")}
          //     >
          //       Заказать тестовый пролив
          //     </div>
          //     <div
          //       className={classNames("sell-button sell-button--second", {
          //         "sell-button--second-active":
          //           isActiveModal.active && isActiveModal.type === "sell",
          //       })}
          //       onClick={() => handleClick("sell")}
          //     >
          //       начать зарабатывать
          //     </div>
          //   </div>
          // </motion.section>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {isActiveModal.active && isActiveModal.type === "sell" && (
          <ActiveSection data={sell} isActiveModal={isActiveModal} type="sell" handleClick={handleClick} />
          // <motion.section
          //   className="active-section active-section--sell"
          //   {...anim(animModal.wrapperPresence)}
          // >
          //   <div className="active-section__title">
          //     {sell.section.title.map((item, index) => (
          //       <motion.h1
          //         key={index}
          //         {...anim(animModal.title)}
          //         custom={index}
          //         className="fz--mobile-24"
          //       >
          //         {item}
          //       </motion.h1>
          //     ))}
          //   </div>

          //   <div className="active-section__list">
          //     {sell.section.list.map((item, index) => (
          //       <div key={index} className="item">
          //         <Image
          //           src={item.image}
          //           alt=""
          //           width={44}
          //           height={44}
          //           className="item__image"
          //         />
          //         <div className="text">
          //           <p className="fz--18 fz--mobile-16 shadow">[{index + 1}]</p>
          //           <p className="fz--18 fz--mobile-14 ">{item.title}</p>
          //         </div>
          //       </div>
          //     ))}
          //   </div>

          //   <div className="active-section__cta">
          //     <Image
          //       src="/images/buysell/tgsell.png"
          //       alt=""
          //       width={300}
          //       height={300}
          //       className="cta__image"
          //     />
          //     <p className="fz--18 fz--mobile-14 shadow">{sell.cta.title}</p>
          //     <div className="cta__link-wrapper">
          //       <HoverAnim modalType="contact">
          //         {sell.cta.button.title}
          //       </HoverAnim>
          //       <Image
          //         src="/images/arrow.svg"
          //         alt=""
          //         width={13}
          //         height={15}
          //         className="arrow"
          //       />
          //     </div>
          //   </div>

          //   <motion.div className="active-section__background">
          //     <Image src="/images/buysell/buysell-bg.png" alt="" fill />
          //   </motion.div>
          //   <motion.div
          //     className="active-section__doll"
          //     {...anim(animModal.doll)}
          //     custom={isActiveModal.type === "buy" ? 0 : 1}
          //   >
          //     <Image src="/images/hero/hero.png" alt="" fill />
          //   </motion.div>

          //   <div className="buttons-wrapper">
          //     <div
          //       className={classNames("sell-button sell-button--first", {
          //         "sell-button--first-active":
          //           isActiveModal.active && isActiveModal.type === "buy",
          //       })}
          //       onClick={() => handleClick("buy")}
          //     >
          //       Заказать тестовый пролив
          //     </div>
          //     <div
          //       className={classNames("sell-button sell-button--second", {
          //         "sell-button--second-active":
          //           isActiveModal.active && isActiveModal.type === "sell",
          //       })}
          //       onClick={() => handleClick("sell")}
          //     >
          //       начать зарабатывать
          //     </div>
          //   </div>
          // </motion.section>
        )}
      </AnimatePresence>
    </section>
  );
}

const ActiveSection = ({ data, isActiveModal, setisActiveModal, type, handleClick }) => {
  return (
    <motion.section
      className={`active-section active-section--${type}`}
      {...anim(animModal.wrapperPresence)}
    >
      <div className="active-section__title">
        {data.section.title.map((item, index) => (
          <motion.h1
            key={index}
            {...anim(animModal.title)}
            custom={index}
            className="fz--mobile-24"
          >
            {item}
          </motion.h1>
        ))}
      </div>

      <div className="active-section__list">
        {data.section.list.map((item, index) => (
          <motion.div {...anim(animModal.listItems)} custom={index} key={index} className="item">
            <Image
              src={item.image}
              alt=""
              width={144}
              height={144}
              className="item__image"
            />
            <div className="text">
              <p className="fz--18 fz--mobile-16 shadow">[{index + 1}]</p>
              <p className="fz--18 fz--mobile-14 ">{item.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div {...anim(animModal.card)} custom={type==="sell"} className="active-section__cta">
        <Image
          src={type === "sell" ? "/images/buysell/tgsell.png" : "/images/buysell/tg.png"}
          alt=""
          width={300}
          height={300}
          className="cta__image"
        />
        <p className="fz--18 fz--mobile-14 shadow">{data.cta.title}</p>
        <div className="cta__link-wrapper">
          <HoverAnim modalType="contact">{data.cta.button.title}</HoverAnim>
          <Image
            src="/images/arrow.svg"
            alt=""
            width={13}
            height={15}
            className="arrow"
          />
        </div>
      </motion.div>

      <motion.div className="active-section__background">
        <Image src="/images/buysell/buysell-bg.png" alt="" fill />
      </motion.div>
      <motion.div
        className="active-section__doll"
        {...anim(animModal.doll)}
        custom={isActiveModal.type === "buy" ? 0 : 1}
      >
        <Image src="/images/hero/hero.png" alt="" fill />
      </motion.div>

      <div className="buttons-wrapper">
        <div
          className={classNames("sell-button sell-button--first", {
            "sell-button--first-active":
              isActiveModal.active && isActiveModal.type === "buy",
          })}
          onClick={() => handleClick("buy")}
        >
          Заказать тестовый пролив
        </div>
        <div
          className={classNames("sell-button sell-button--second", {
            "sell-button--second-active":
              isActiveModal.active && isActiveModal.type === "sell",
          })}
          onClick={() => handleClick("sell")}
        >
          начать зарабатывать
        </div>
      </div>
    </motion.section>
  );
};
