import React, { memo } from "react";
import classNames from "classnames";
import Image from "next/image";
import "./Card.scss";

const CardComponent = ({ data }) => {
  const top = data?.top;
  return (
    <div className={classNames("result-card", {
      "result-card--buy": data.type === "buy",
      "result-card--sell": data.type === "sell",
    })}
    style={{ backgroundImage: top.type === "titleImage" ? `url(${top.title?.image})` : "url(/images/results/red-bg.svg)" }}
    >
      <div className="blur-bg"></div>
      <div
        className="result-card-wrapper"
      >
        <div className="result-card__title fz--30 fz--mobile-30 bold uppercase">
          {data.type}
        </div>
        <div className="card-wrapper">
          <div className="result-card__top">
            <div className="left">
              {top.title?.topTitle && (
                <p
                  className="top-title fz--15 fz--mobile-12 uppercase"
                  dangerouslySetInnerHTML={{ __html: top.title?.topTitle }}
                />
              )}
              {top.title?.mainTitle && (
                <p
                  className="main-title fz--30 fz--mobile-20 bold"
                  dangerouslySetInnerHTML={{ __html: top.title?.mainTitle }}
                />
              )}
            </div>
            <div className="right">
              {/* {top.type === "titleImage" && top.title?.image && (
                <Image
                  src={top.title?.image}
                  alt=""
                  width={144}
                  height={144}
                  className="right__image"
                />
              )} */}
              {top.type === "doubleTitle" && (
                <p className="right__text bold fz--40 fz--mobile-22">
                  {top.title?.secondTitle}
                </p>
              )}
            </div>
          </div>
          <div className="content">
            {data.text?.map((item, index) => {
              if (item.type === "textFull") {
                return (
                  <div key={index} className="content__section">
                    {item.title && (
                      <p
                        className="fz--15 fz--mobile-12 content__title"
                        dangerouslySetInnerHTML={{ __html: item.title }}
                      />
                    )}
                    {item.content && (
                      <p
                        className="fz--15 fz--mobile-12 shadow light"
                        dangerouslySetInnerHTML={{ __html: item.content }}
                      />
                    )}
                  </div>
                );
              }
              if (item.type === "list") {
                return (
                  <div key={index} className="content__section">
                    {item.title && (
                      <p
                        className="fz--15 fz--mobile-12 content__title"
                        dangerouslySetInnerHTML={{ __html: item.title }}
                      />
                    )}
                    <ul className="list">
                      {item.list?.map((listItem, listIndex) => (
                        <li
                          key={listIndex}
                          className="fz--15 fz--mobile-12 shadow light item"
                          dangerouslySetInnerHTML={{ __html: listItem }}
                        />
                      ))}
                    </ul>
                  </div>
                );
              }
              if (item.type === "doubleText") {
                const firstText = item.first;
                const secondText = item.second;
                return (
                  <div key={index} className="content__section double-section">
                    <div className="double-section__text">
                      {firstText.title && (
                        <p
                          className="fz--15 fz--mobile-12 content__title"
                          dangerouslySetInnerHTML={{ __html: firstText.title }}
                        />
                      )}
                      {firstText.content && (
                        <p
                          className="fz--15 fz--mobile-12 shadow light"
                          dangerouslySetInnerHTML={{ __html: firstText.content }}
                        />
                      )}
                    </div>
                    <div className="double-section__text">
                      {secondText.title && (
                        <p
                          className="fz--15 fz--mobile-12 content__title"
                          dangerouslySetInnerHTML={{ __html: secondText.title }}
                        />
                      )}
                      {secondText.content && (
                        <p
                          className="fz--15 fz--mobile-12 shadow light"
                          dangerouslySetInnerHTML={{ __html: secondText.content }}
                        />
                      )}
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Card = memo(CardComponent);
