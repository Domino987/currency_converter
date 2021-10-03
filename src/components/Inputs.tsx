import { InputAdornment, Stack, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useRecoilState, useRecoilValue } from "recoil";
import { fromCurrency, leftInput, toCurrency } from "../atoms/inputs";
import { useCurrency } from "../hooks/useCurrency";
import { CurrencyInput } from "./CurrencyInput";
import { CurrencySwapper } from "./CurrencySwapper";

function Inputs() {
  const { t } = useTranslation();
  const from = useRecoilValue(fromCurrency);
  const to = useRecoilValue(toCurrency);
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
        inputState={fromCurrency}
        onChange={(e) => setText(e.target.value)}
        error={isInvalidInput}
        helperText={isInvalidInput ? t("invalid_input") : ""}
      />
      <CurrencySwapper />
      <CurrencyInput
        value={convertedValue}
        inputState={toCurrency}
        disabled={true}
      />
    </Stack>
  );
}

export { Inputs };
