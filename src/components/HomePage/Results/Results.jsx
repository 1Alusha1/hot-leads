"use client";
import React, { useContext } from "react";

import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/core";

import "./Results.scss";
import { DataContext } from "@/lib/providers/DataProvider/context";
import { Card } from "./Card";

export default function Results() {
  const { data } = useContext(DataContext);
  const { results } = data;

  return (
    <section className="results">
      <span className="results__title uppercase">{results.title}</span>
      <Splide
        options={{
          type: "loop",
          width: "100%",
          perPage: 3,
          perMove: 1,
          pagination: false,
          slideFocus: true,
          focus: "center",
          rewind: true,
          keyboard: true,
          updateOnMove: true,
          padding: "10vw",
          classes: {
            arrows: "results__arrows",
            arrow: "results__arrow",
            prev: "results__arrow--prev",
            next: "results__arrow--next",
          },
          breakpoints: {
            800: {
              perPage: 1,
              padding: "10vw",
            },
          },
        }}
        hasTrack={false}
      >
        <SplideTrack className="slider">
          {results.list.map((item, index) => (
            <SplideSlide className="slide" key={index}>
              <Card data={item} />
            </SplideSlide>
          ))}
        </SplideTrack>
      </Splide>
    </section>
  );
}
