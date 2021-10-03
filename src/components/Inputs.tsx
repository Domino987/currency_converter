import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useRecoilState, useRecoilValue } from "recoil";
import { currencyValues, leftInput } from "../atoms/inputs";
import { useCurrency } from "../hooks/useCurrency";
import { CurrencyInput } from "./CurrencyInput";
import { CurrencySwapper } from "./CurrencySwapper";

function Inputs() {
  const { t } = useTranslation();
  const { from, to } = useRecoilValue(currencyValues);
  const [text, setText] = useRecoilState(leftInput);
  const { convertedValue } = useCurrency(from, to, text);

  const isInvalidInput = isNaN(Number(text));
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
        onChange={(e) => setText(e.target.value)}
        error={isInvalidInput}
        helperText={isInvalidInput ? t("invalid_input") : ""}
      />
      <CurrencySwapper />
      <CurrencyInput value={convertedValue} valueKey="to" disabled={true} />
    </Stack>
  );
}

export { Inputs };
