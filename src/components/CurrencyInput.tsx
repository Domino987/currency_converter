import {
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Box,
  TextFieldProps,
} from "@mui/material";
import { useRecoilValue } from "recoil";
import { currencyValues, useSetCurrencies } from "../atoms/inputs";
import { useAllCurrencies, useCurrencyState } from "../hooks/useAllCurrencies";

type IProps = TextFieldProps & {
  valueKey: "from" | "to";
};

function CurrencyInput({ valueKey, ...props }: IProps) {
  const state = useRecoilValue(currencyValues);
  const currencyState = useCurrencyState(state[valueKey]);
  const { currencies, isLoading } = useAllCurrencies();
  const setCurrencies = useSetCurrencies();
  return (
    <Box>
      <TextField
        type="number"
        {...props}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {currencyState?.currencySymbol}
            </InputAdornment>
          ),
        }}
      />
      <Select
        onChange={(e) => {
          setCurrencies({ [valueKey]: e.target.value });
        }}
        value={isLoading ? "" : state[valueKey]}
      >
        <MenuItem key="" value="">
          {""}
        </MenuItem>
        {Object.values(currencies).map((curr) => (
          <MenuItem key={curr.id} value={curr.id}>
            {curr.currencyName}{" "}
            {curr.currencySymbol ? `(${curr.currencySymbol})` : ""}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}

export { CurrencyInput };
