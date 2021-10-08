import { addDays } from "date-fns";
import { rest } from "msw";
import type { IAllCurrencyResponse } from "../hooks/useAllCurrencies";
import type { IConvertResponse } from "../hooks/useCurrency";
import type { HistoryResponse } from "../hooks/useCurrencyHistory";

const StaticConvertMap: Record<string, number> = {
  USD_EUR: 5,
  AUD_EUR: 2,
  GBP_EUR: 10,
};

export const handlers = [
  rest.get("https://free.currconv.com/api/v7/currencies", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json<IAllCurrencyResponse>({
        results: {
          EUR: { currencyName: "Euro", currencySymbol: "€", id: "EUR" },
          USD: { currencyName: "Dollar", currencySymbol: "$", id: "USD" },
          GBP: {
            currencyName: "British pound",
            currencySymbol: "	£",
            id: "GBP",
          },
          AUD: {
            currencyName: "Australian dollar",
            currencySymbol: "$",
            id: "AUD",
          },
        },
      })
    );
  }),
  rest.get("https://free.currconv.com/api/v7/convert", (req, res, ctx) => {
    const convert = req.url.searchParams.get("q") ?? "";
    const hasTimeFrame = Boolean(req.url.searchParams.get("date"));
    if (hasTimeFrame) {
      return res(
        ctx.status(200),
        ctx.json<HistoryResponse>(
          convert.split(",").reduce<HistoryResponse>((agg, key) => {
            agg[key] = Array.from(Array(10)).reduce<Record<string, number>>(
              (obj, x, i) => {
                obj[addDays(new Date(0), i).toString()] =
                  i + Math.random() * 10;
                return obj;
              },
              {}
            );
            return agg;
          }, {})
        )
      );
    }
    return res(
      ctx.status(200),
      ctx.json<IConvertResponse>({
        [convert]: { val: StaticConvertMap[convert] ?? 1 },
      })
    );
  }),
];
