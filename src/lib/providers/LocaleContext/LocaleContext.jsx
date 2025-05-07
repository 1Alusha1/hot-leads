"use client"

import { useState, useEffect } from "react";
import { LocaleContext } from "./context";
import { usePathname } from "next/navigation";

export const LocaleProvider = ({ children }) => {
    const path = usePathname();
    const [lang, setLang] = useState("en");

    useEffect(() => {
        const isRuPath = path.startsWith("/ru");
        const isUaPath = path.startsWith("/ua");
        setLang((isRuPath && "ru") || (isUaPath && "ua") || "en");
    }, [path]);

    return (
      <LocaleContext.Provider value={{ lang }}>
        {children}
      </LocaleContext.Provider>
    );
}