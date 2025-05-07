import React, { useContext } from "react";
import { Logo } from "../Logo/Logo";

import "./Footer.scss";
import { getFetchData } from "@/lib/helpers/DataFetch";
import { useLanguageContent } from "@/lib/helpers/useLanguageContent";
import { URL_FOOTER } from "@/lib/helpers/DataUrls";
import { DataProvider } from "@/lib/providers/DataProvider/DataProvider";
import FooterContent from "./FooterContent";
import { LocaleContext } from "@/lib/providers/LocaleContext/context";

export default async function Footer({lang, type}) {
  const preparedData = await getFetchData(URL_FOOTER);
  const data = useLanguageContent(preparedData, lang);


  return (
      <DataProvider data={data}>
        <FooterContent type={type}/>
      </DataProvider>
  );
}
