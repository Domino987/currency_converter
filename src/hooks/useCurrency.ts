import { useQuery } from "react-query";

const currencyKey = (from: string, to: string) => ["currency", from, to];

function useCurrency(from: string, to: string, amount: string) {
  const { data: factor = 0, isLoading } = useQuery(currencyKey(from, to), () =>
    fetchCurrency(from, to)
  );
  const convertedValue =
    Math.round(((Number(amount) || 0) * factor + Number.EPSILON) * 100) / 100;
  return { isLoading, convertedValue };
}
const API_KEY = "80605419e514eeb2008b";

async function fetchCurrency(from: string, to: string) {
  const converterKey = `${from}_${to}`;

  const response = await fetch(
    `https://free.currconv.com/api/v7/convert?q=${converterKey}&compact=y&apiKey=${API_KEY}`
  );
  const body = (await response.json()) as Record<string, { val: number }>;
  return body[converterKey].val;
}

export { useCurrency, API_KEY };
