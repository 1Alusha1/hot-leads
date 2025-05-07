import HomePage from "@/components/HomePage/HomePage";
import { getFetchData } from "@/lib/helpers/DataFetch";
import { URL_SELL_PAGE } from "@/lib/helpers/DataUrls";
import { generatePagesMetadata } from "@/lib/helpers/generatePagesMetadata";
import { useLanguageContent } from "@/lib/helpers/useLanguageContent";
import { DataProvider } from "@/lib/providers/DataProvider/DataProvider";

export const generateMetadata = async () => generatePagesMetadata(URL_SELL_PAGE);

export default async function Home() {
  const preparedData = await getFetchData(URL_SELL_PAGE);
  const data = useLanguageContent(preparedData, "ua");
  
  return data && (
    <DataProvider data={data}>
      <HomePage lang="ua" type="sell"/>
    </DataProvider>
  );
}
