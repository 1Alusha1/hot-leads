"use client";
import React from "react";

import "./LinkPage.scss";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { anim, PageAnim } from "@/lib/helpers/anim";
import classNames from "classnames";

export default function LinkPage({ lang, data }) {
  return (
    <motion.section {...anim(PageAnim)} className="link-page">
      <Link
        href={data?.buyLink.url}
        className="link-page__link link-page__link--buy"
      >
        {data?.buyLink.title}
      </Link>
      <Link
        href={data?.sellLink.url}
        className="link-page__link link-page__link--sell"
      >
        {data?.sellLink.title}
      </Link>
      <div className="hero">
        <div className="hero__img">
          <Image src="/images/hero/hero.png" alt="hero" fill />
        </div>
        <h1
          className={classNames("hero__title", {
            "fz--100 fz--mobile-30": lang === "ru" || lang === "ua",
            "fz--80 fz--mobile-30": lang === "en",
          })}
        >
          {data?.title}
        </h1>
      </div>
    </motion.section>
  );
}
