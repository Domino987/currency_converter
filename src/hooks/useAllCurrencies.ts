import { useQuery } from "react-query";
import { API_KEY } from "./useCurrency";

interface IAllCurrencyResponse {
  results: Record<
    string,
    { currencyName: string; currencySymbol: string; id: string }
  >;
}
function useAllCurrencies() {
  const {
    data: currencies = {},
    isLoading,
    isError,
    isSuccess,
  } = useQuery("allCurrencies", fetchCurrencies);
  return { isLoading, currencies, isError, isSuccess };
}

function useCurrencyState(id: string) {
  const { currencies } = useAllCurrencies();

  return currencies[id];
}

async function fetchCurrencies() {
  const response = await fetch(
    `https://free.currconv.com/api/v7/currencies?apiKey=${API_KEY}`
  );
  const body = (await response.json()) as IAllCurrencyResponse;
  return body.results;
}

export { useAllCurrencies, useCurrencyState };
export type { IAllCurrencyResponse };
