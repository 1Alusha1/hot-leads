import React, { useContext } from "react";

import "./HoverAnim.scss";
import Link from "next/link";
import { ModalContext } from "@/lib/providers/ModalProvider/ModalProvider";

export const HoverAnim = ({
  children,
  wrapperClass = "",
  modalType = false,
  line = true,
  href = "",
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
      href={href}
      onClick={handleModalClick}
      className={`hover-anim ${wrapperClass}`}
      {...rest}
    >
      <div className="flip">
        <a>{children}</a>
        <a>{children}</a>
      </div>
      {line && <span className="hover-anim__text-line" />}
    </Link>
  );
};
