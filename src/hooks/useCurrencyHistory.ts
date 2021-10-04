import { format, subWeeks } from "date-fns";
import { UserSerie } from "react-charts";
import { useQuery } from "react-query";
import { API_KEY } from "./useCurrency";

type HistoryResponse = Record<string, Record<string, number>>;

type CurrencyValue = {
  date: Date;
  value: number;
};

type Series = {
  label: string;
  data: CurrencyValue[];
};

const historyKey = (ids: string[]) => ["currency_history"].concat(ids.sort());

function useCurrencyHistory(ids: string[]) {
  const { data: history = [], isLoading } = useQuery(
    historyKey(ids),
    () => fetchCurrencyHistory(ids),
    { enabled: ids.filter((x) => x !== "").length !== 0 }
  );

  return { isLoading, history };
}

async function fetchCurrencyHistory(ids: string[]) {
  const query = ids.map((id) => `USD_${id}`).join(",");
  const startDate = format(subWeeks(new Date(), 1), "yyyy-MM-dd");
  const endDate = format(new Date(), "yyyy-MM-dd");
  const response = await fetch(
    `https://free.currconv.com/api/v7/convert?apiKey=${API_KEY}&q=${query}&compact=ultra&date=${startDate}&endDate=${endDate}`
  );
  const body = (await response.json()) as HistoryResponse;
  const data: UserSerie<CurrencyValue>[] = Object.entries(body).map(
    ([key, val]) => ({
      label: key.split("_").join(" => "),
      data: Object.entries(val).map(([k, v]) => ({
        date: new Date(k),
        value: v,
      })),
    })
  );
  return data;
}

export { useCurrencyHistory };
export type { Series, CurrencyValue, HistoryResponse };
