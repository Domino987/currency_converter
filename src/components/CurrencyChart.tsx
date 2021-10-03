import { Skeleton } from "@mui/material";
import { Box } from "@mui/system";
import { format } from "date-fns";
import React from "react";
import { AxisOptions, Chart } from "react-charts";
import { useRecoilValue } from "recoil";
import { fromCurrency, toCurrency } from "../atoms/inputs";
import { darkModeAtom } from "../atoms/theme";
import { CurrencyValue, useCurrencyHistory } from "../hooks/useCurrencyHistory";

function CurrencyChart() {
  const darkMode = useRecoilValue(darkModeAtom);
  const from = useRecoilValue(fromCurrency);
  const to = useRecoilValue(toCurrency);
  const { history } = useCurrencyHistory([from, to]);
  const primaryAxis = React.useMemo(
    (): AxisOptions<CurrencyValue> => ({
      getValue: (datum) => datum.date,
      formatters: {
        tooltip: (value: Date | null) => value?.toDateString(),
        scale: (value: Date) => (value ? format(value, "d LLL") : ""),
      },
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    (): AxisOptions<CurrencyValue>[] => [
      {
        getValue: (datum) => datum.value,
      },
    ],
    []
  );
  return (
    <Box sx={{ height: 300, width: 700, m: "auto" }}>
      {history.length === 0 ? (
        <Skeleton variant="rectangular" height="300px" width="700px" />
      ) : (
        <Chart
          options={{
            dark: darkMode === "dark",
            data: history,
            primaryAxis,
            secondaryAxes,
          }}
        />
      )}
    </Box>
  );
}

export { CurrencyChart };
