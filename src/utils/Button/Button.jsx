"use client"
import { useContext } from "react";
// import { Link } from "react-router-dom";

import "./Button.scss";
import Link from "next/link";
import Image from "next/image";
import { ModalContext } from "@/lib/providers/ModalProvider/ModalProvider";

export const Button = ({
  to,
  children,
  classes = "",
  modalType = false,
  ...rest
}) => {
  const { isActiveModal, setisActiveModal } = useContext(ModalContext);

  const handleModalClick = (e) => {
    
    if (modalType) {
      e.preventDefault();
      setisActiveModal({ active: true, type: modalType });
    }
  };

  return (
    <Link
      href={to || ""}
      onClick={handleModalClick}
      className={`button fz--20 fz--tablet-24 fz--mobile-16 ${classes}`}
      {...rest}
    >
      <div className="button__text">
        <div className="text-wrapper">
          <div className="flip">
            <p data-cursor-active>{children}</p>
            <p data-cursor-active>{children}</p>
          </div>
        </div>
      </div>
      <div className="arrow__wrapper">
        <div className="arrow">
          <Image
            src="/images/arrow.svg"
            className="arrow__icon"
            width={45}
            height={38}
            alt=""
          />
          <Image
            src="/images/arrow.svg"
            className="arrow__icon"
            width={45}
            height={38}
            alt=""
          />
        </div>
      </div>
    </Link>
  );
};

export const SecondaryButton = ({
  to,
  children,
  classes = "",
  modalType = false,
  ...rest
}) => {
  const { setIsActiveModal } = useContext(ActiveModalContext);

  const handleModalClick = (e) => {
    e.preventDefault();
    setIsActiveModal({ isActive: true, modalType });
  };

  return (
    <Link
      href={to || ""}
      onClick={handleModalClick}
      className={`button button_secondary fz--20 fz--tablet-24 fz--mobile-20 ${classes}`}
      {...rest}
    >
      <div className="button__text">
        <div className="text-wrapper">
          <div className="flip">
            <p data-cursor-active>{children}</p>
            <p data-cursor-active>{children}</p>
          </div>
        </div>
      </div>
      <div className="arrow__wrapper">
        <div className="arrow">
          <svg
            className="arrow__icon"
            viewBox="0 0 45 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24.2678 3.33301L40.4583 19.1063L24.2678 34.8797"
              stroke-width="6"
              stroke-linecap="round"
            />
            <path
              d="M3.86877 19.1064H37.3113"
              stroke-width="6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <svg
            className="arrow__icon"
            viewBox="0 0 45 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24.2678 3.33301L40.4583 19.1063L24.2678 34.8797"
              stroke-width="6"
              stroke-linecap="round"
            />
            <path
              d="M3.86877 19.1064H37.3113"
              stroke-width="6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};
