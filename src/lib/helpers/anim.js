import { delay } from "framer-motion";
import { ease } from "./ease";

export const anim = (variants) => {
  return {
    initial: "initial",
    animate: "animate",
    exit: "exit",
    variants,
  };
};

export const presenceAnim = (variants, state) => {
  return {
    initial: "initial",
    animate: state ? "animate" : "initial",
    variants,
  };
};

export const headerAnim = {
  initial: {
    opacity: 0,
    y: "-20%",
  },
  animate: {
    opacity: 1,
    y: "0%",
    transition: {
      duration: 1,
      ease: [0.88, 0.05, 0.1, 0.97],
    },
  },
};

export const heroAnim = {
  doll: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 1,
        delay: 0.2,
        ease: [0.88, 0.05, 0.1, 0.97],
      },
    },
  },
  background: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 1,
        delay: 0.5,
        ease: [0.88, 0.05, 0.1, 0.97],
      },
    },
  },
  title: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.88, 0.05, 0.1, 0.97],
      },
    },
  },
  cards: {
    initial: {
      opacity: 0,
      y: "20%",
    },
    animate: (i) => ({
      opacity: 1,
      y: "0%",
      transition: {
        duration: 1,
        delay: i * 0.2,
        ease: [0.88, 0.05, 0.1, 0.97],
      },
    }),
  },
};

export const buySellAnim = {
  title: {
    initial: {
      clipPath: "inset(0% -20% 100% -20%)",
      y: "70%",
    },
    animate: {
      clipPath: "inset(-20% -20% -20% -20%)",
      y: "0%",
      transition: {
        duration: 1,
        ease: ease.outExpo,
      },
      transitionEnd: {
        clipPath: "none",
        y: "auto",
      },
    },
    exit: {
      clipPath: "inset(-20% -20% -20% -20%)",
      y: "0%",
    },
  },
  cards: {
    initial: {
      opacity: 0,
      y: "20%",
    },
    animate: (i) => ({
      opacity: 1,
      y: "0%",
      transition: {
        duration: 1,
        delay: i * 0.2,
        ease: [0.88, 0.05, 0.1, 0.97],
      },
    }),
  },
};

export const footerAnim = {
  doll: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.88, 0.05, 0.1, 0.97],
      },
    },
  },
  links: {
    initial: {
      opacity: 0,
      y: "20%",
    },
    animate: (i) => ({
      opacity: 1,
      y: "0%",
      transition: {
        duration: 1,
        delay: i * 0.2,
        ease: [0.88, 0.05, 0.1, 0.97],
      },
    }),
  },
  title: {
    initial: {
      clipPath: "inset(0% -20% 100% -20%)",
      y: "70%",
    },
    animate: (id) => ({
      clipPath: "inset(-20% -20% -20% -20%)",
      y: "0%",
      transition: {
        duration: 1,
        ease: ease.outExpo,
        delay: id * 0.1,
      },
      transitionEnd: {
        clipPath: "none",
        y: "auto",
      },
    }),
    exit: {
      clipPath: "inset(0% 0% 100% 0%)",
      y: "100%",
    },
  },
  borders: {
    initial: (pos) => ({
      opacity: 0,
      x: pos === "left" ? "100%" : "-100%",
    }),
    animate: {
      opacity: 1,
      x: "0%",
      transition: {
        duration: 1,
        ease: [0.88, 0.05, 0.1, 0.97],
      },
    },
  },
  opacity: {
    initial: {
      opacity: 0,
    },
    animate: (delay = 0) => ({
      opacity: 1,
      transition: {
        duration: 1,
        delay,
        ease: [0.88, 0.05, 0.1, 0.97],
      },
    }),
  },
};

export const ModalAnim = {
  wrapperPresence: {
    initial: {
      clipPath: "inset(0% 0% 100%)",
    },
    animate: {
      clipPath: "inset(0% 0% 0%)",
      transition: {
        duration: 1,
        ease: [0.88, 0.05, 0.1, 0.97],
      },
      transitionEnd: {
        clipPath: "none",
      },
    },
    exit: {
      clipPath: "inset(0% 0% 100%)",
      transition: {
        duration: 1,
        ease: [0.88, 0.05, 0.1, 0.97],
      },
    },
  },
  menuItemsPresence: {
    initial: {
      y: "80%",
      clipPath: "inset(0% -10% 100%)",
    },
    animate: (i) => ({
      y: "0%",
      clipPath: "inset(0% -10% 0%)",
      transition: {
        duration: 1,
        delay: i * 0.2,
        ease: [0.88, 0.05, 0.1, 0.97],
      },
      transitionEnd: {
        clipPath: "none",
      },
    }),
    exit: {
      y: "0%",
      clipPath: "none",
    },
  },
  bgPresence: {
    initial: {
      filter: "blur(6vw)",
      scale: 1.3,
    },
    animate: {
      filter: "blur(0vw)",
      scale: 1,
      transition: {
        delay: 0.5,
        duration: 1.5,
        scale: {
          duration: 3.4,
          ease: [0.51, -0.01, 0.17, 1],
          delay: 0.2,
        },
      },
    },
  },
};

export const animModal = {
  wrapperPresence: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.88, 0.05, 0.1, 0.97],
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 1,
        ease: [0.88, 0.05, 0.1, 0.97],
      },
    },
  },
  doll: {
    initial: (direction) => ({
      x: direction === 1 ? "20%" : "-20%",
    }),
    animate: {
      x: "0%",
      transition: {
        duration: 1,
        ease: [0.88, 0.05, 0.1, 0.97],
      },
    },
    exit: (direction) => ({
      x: direction === 1 ? "20%" : "-20%",
      transition: {
        duration: 1,
        ease: [0.88, 0.05, 0.1, 0.97],
      },
    }),
  },
  title: {
    initial: {
      y: "80%",
      clipPath: "inset(0% -10% 100%)",
    },
    animate: (i) => ({
      y: "0%",
      clipPath: "inset(0% -10% 0%)",
      transition: {
        duration: 1,
        delay: i * 0.2,
        ease: [0.88, 0.05, 0.1, 0.97],
      },
      transitionEnd: {
        clipPath: "none",
      },
    }),
    exit: {
      y: "0%",
      clipPath: "none",
    },
  },
  card: {
    initial: (direction) => ({
      opacity: 0,
      x: !direction ? "20%" : "-20%",
    }),
    animate: {
      opacity: 1,
      x: "0%",
      transition: {
        duration: 1,
        ease: [0.88, 0.05, 0.1, 0.97],
      },
    },
    exit: (direction) => ({
      opacity: 0,
      x: !direction ? "20%" : "-20%",
      transition: {
        duration: 1,
        ease: [0.88, 0.05, 0.1, 0.97],
      },
    }),
  },
  listItems: {
    initial: {
      opacity: 0,
    },
    animate: (i) => ({
      opacity: 1,
      transition: {
        duration: 1,
        delay: (i * 0.2) + 0.5,
      },
    }),
    exit: {
      opacity: 0,
      transition: {
        duration: 1,
      },
    }
  }
};

export const PageAnim = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.88, 0.05, 0.1, 0.97],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 1,
      ease: [0.88, 0.05, 0.1, 0.97],
    },
  },
}

export const aboutAnim = {
  initial: {
    opacity: 0,
  },
  animate: (i) => ({
    opacity: 1,
    transition: {
      duration: 1,
      delay: i * 0.2,
      ease: [0.88, 0.05, 0.1, 0.97],
    },
  }),
  exit: {
    opacity: 0,
    transition: {
      duration: 1,
      ease: [0.88, 0.05, 0.1, 0.97],
    },
  },
}
