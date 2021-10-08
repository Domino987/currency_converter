import { Stack } from "@mui/material";
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

  const updatedAtText = `${t("last_updated")} 
  ${formatDistanceToNow(dataUpdatedAt, { addSuffix: true })}`;

  return (
    <Stack
      spacing={2}
      direction="row"
      sx={{ width: "100%", pt: 4 }}
      justifyContent="space-evenly"
      alignItems="center"
    >
      <CurrencyInput
        value={text}
        valueKey="from"
        onChange={(e) => setText(e.target.value.substring(0, 9))}
        error={isInvalidInput}
        helperText={isInvalidInput ? t("invalid_input") : ""}
      />
      <CurrencySwapper />
      <CurrencyInput
        helperText={updatedAtText}
        value={convertedValue}
        valueKey="to"
        disabled={true}
      />
    </Stack>
  );
}

export { Inputs };
