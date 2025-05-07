"use client";
import { DataContext } from "@/lib/providers/DataProvider/context";
import React, { useContext } from "react";

import "./Hero.scss";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/utils/Button/Button";
import { anim, heroAnim, heroAnin } from "@/lib/helpers/anim";
import useIsDesktop from "@/lib/helpers/useIsDesktop";
import classNames from "classnames";

export default function Hero({ type }) {
  const { data } = useContext(DataContext);
  const { hero } = data;
  const isDesktop = useIsDesktop();

  return (
    <section className="hero" id="hero">
      <motion.div className="hero-anim" {...anim(heroAnim.doll)}>
        <Image src="/images/hero/hero.png" alt="" fill />
      </motion.div>
      <motion.div {...anim(heroAnim.background)} className="flames">
        <Image
          src="/images/hero/flame-1.png"
          alt=""
          className="hero__flame-1"
          width={568}
          height={558}
        />
        <Image
          src="/images/hero/flame-2.png"
          alt=""
          className="hero__flame-2"
          width={753}
          height={380}
        />
      </motion.div>
      <motion.div {...anim(heroAnim.title)} className="title-wrapper">
        <Image
          src={
            type === "buy"
              ? "/images/hero/title-buy.svg"
              : "/images/hero/title-sell.svg"
          }
          alt="Hot-leads"
          fill
          className="title"
          data-hide-for-mobile
        />
        <Image
          src={
            type === "buy"
              ? "/images/hero/title-buy-mobile.svg"
              : "/images/hero/title-sell-mobile.svg"
          }
          alt="Hot-leads"
          fill
          className="title"
          data-only-mobile
        />
        <div className="title__bottom">
          <motion.div
            className="button-wrapper"
            {...anim(heroAnim.cards)}
            custom={0}
          >
            <Button
              classes={type === "buy" && "button--green"}
              modalType="contact"
            >
              {hero.title.button}
            </Button>
          </motion.div>
          <motion.p
            {...anim(heroAnim.cards)}
            custom={0}
            className="description fz--mobile-14"
          >
            {hero.title.description}
          </motion.p>
        </div>
      </motion.div>
      <div className="cards">
        {hero.list.map((card, index) => (
          <motion.div
            {...anim(heroAnim.cards)}
            custom={index}
            key={`hero-card-${index}`}
            className="card uppercase"
            style={{
              backgroundImage:
                type === "buy"
                  ? isDesktop
                    ? `url(/images/hero/CR${index}.png)`
                    : `url(/images/hero/mobile-CR${index}.png)`
                  : isDesktop
                  ? `url(/images/hero/CR${index}-sell.png)`
                  : `url(/images/hero/mobile-CR${index}-sell.png)`,
            }}
          >
            <div className="card__text">
              <p className="fz--16 fz--mobile-14">{card.top}</p>
              <p
                className={classNames("fz--20 fz--mobile-18", {
                  "col-red": type === "sell",
                  "col-green": type === "buy",
                })}
              >
                {card.title}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
