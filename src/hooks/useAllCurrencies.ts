import { useQuery } from "react-query";
import { API_KEY } from "./useCurrency";

function useAllCurrencies() {
  const { data: currencies = {}, isLoading } = useQuery(
    "allCurrencies",
    fetchCurrencies
  );
  return { isLoading, currencies };
}

function useCurrencyState(id: string) {
  const { currencies } = useAllCurrencies();

  return currencies[id];
}

async function fetchCurrencies() {
  const response = await fetch(
    `https://free.currconv.com/api/v7/currencies?apiKey=${API_KEY}`
  );
  const body = (await response.json()) as {
    results: Record<
      string,
      { currencyName: string; currencySymbol: string; id: string }
    >;
  };
  return body.results;
}

export { useAllCurrencies, useCurrencyState };
