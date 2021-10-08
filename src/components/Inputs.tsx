import { Grid, Stack } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { useTranslation } from "react-i18next";
import { useCurrentlyEnteredValues } from "../hooks/useCurrency";
import { CurrencyInput } from "./CurrencyInput";
import { CurrencySwapper } from "./CurrencySwapper";

function Inputs() {
  const { t } = useTranslation();
  const { text, setText, convertedValue, isInvalidInput } =
    useCurrentlyEnteredValues();

  const { dataUpdatedAt } = useCurrentlyEnteredValues();
  const updatedAtText =
    dataUpdatedAt !== 0
      ? `${t("last_updated")} 
  ${formatDistanceToNow(dataUpdatedAt, { addSuffix: true })}`
      : "";

  return (
    <Grid
      spacing={2}
      container={true}
      sx={{ width: "100%", pt: 4 }}
      justifyContent="space-evenly"
      alignItems="center"
    >
      <Grid item={true} container={true} xs={4} justifyContent="right">
        <CurrencyInput
          value={text}
          valueKey="from"
          onChange={(e) => setText(e.target.value.substring(0, 9))}
          error={isInvalidInput}
          helperText={isInvalidInput ? t("invalid_input") : ""}
        />
      </Grid>
      <Grid item={true} container={true} xs={3} justifyContent="center">
        <CurrencySwapper />
      </Grid>
      <Grid item={true} container={true} xs={4} justifyContent="left">
        <CurrencyInput
          helperText={updatedAtText}
          value={convertedValue}
          valueKey="to"
          disabled={true}
        />
      </Grid>
    </Grid>
  );
}

export { Inputs };
