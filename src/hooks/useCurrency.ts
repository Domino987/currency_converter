import { useQuery } from "react-query";
import { useRecoilValue, useRecoilState } from "recoil";
import { currencyValues, leftInput } from "../atoms/inputs";

type IConvertResponse = Record<string, { val: number }>;

const currencyKey = (from: string, to: string) => ["currency", from, to];

function useCurrency(from: string, to: string, amount: string) {
  const {
    data: factor = 0,
    isLoading,
    dataUpdatedAt,
  } = useQuery(currencyKey(from, to), () => fetchCurrency(from, to), {
    enabled: from !== "" && to !== "",
  });
  const convertedValue =
    Math.round(((Number(amount) || 0) * factor + Number.EPSILON) * 100) / 100;
  return { isLoading, convertedValue, dataUpdatedAt };
}
const API_KEY = "133b9d7eb1e786991e2e";

async function fetchCurrency(from: string, to: string) {
  const converterKey = `${from}_${to}`;

  const response = await fetch(
    `https://free.currconv.com/api/v7/convert?q=${converterKey}&compact=y&apiKey=${API_KEY}`
  );
  const body = (await response.json()) as IConvertResponse;
  return body[converterKey].val;
}

function useCurrentlyEnteredValues() {
  const { from, to } = useRecoilValue(currencyValues);
  const [text, setText] = useRecoilState(leftInput);
  const { convertedValue, dataUpdatedAt } = useCurrency(from, to, text);

  const isInvalidInput = isNaN(Number(text));

  return {
    text,
    setText,
    convertedValue,
    isInvalidInput,
    dataUpdatedAt,
  };
}

export { useCurrency, API_KEY, useCurrentlyEnteredValues };
export type { IConvertResponse };
