import HomePage from "@/components/HomePage/HomePage";
import { getFetchData } from "@/lib/helpers/DataFetch";
import { URL_BUY_PAGE } from "@/lib/helpers/DataUrls";
import { generatePagesMetadata } from "@/lib/helpers/generatePagesMetadata";
import { useLanguageContent } from "@/lib/helpers/useLanguageContent";
import { DataProvider } from "@/lib/providers/DataProvider/DataProvider";

export const generateMetadata = async () => generatePagesMetadata(URL_BUY_PAGE);

export default async function Home() {
  const preparedData = await getFetchData(URL_BUY_PAGE);
  const data = useLanguageContent(preparedData, "ua");
  
  return data && (
    <DataProvider data={data}>
      <HomePage lang="ua" type="buy"/>
    </DataProvider>
  );
}
