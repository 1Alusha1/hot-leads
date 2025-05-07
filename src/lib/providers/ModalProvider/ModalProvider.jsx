"use client";

import ContactModal from "@/utils/ContactModal/ContactModal";
import { AnimatePresence } from "framer-motion";
import { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isActiveModal, setisActiveModal] = useState({
    active: false,
    type: "",
  });

  return (
    <ModalContext.Provider value={{ isActiveModal, setisActiveModal }}>
      <AnimatePresence mode="wait">
        {isActiveModal.active && isActiveModal.type === "contact" && (  
          <ContactModal setIsActive={setisActiveModal} isActive={isActiveModal} />
        )}
      </AnimatePresence>
      {children}
    </ModalContext.Provider>
  );
};
