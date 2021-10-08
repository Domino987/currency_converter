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
  const { currencies, isLoading, isError } = useAllCurrencies();
  const setCurrencies = useSetCurrencies();
  console.log(state, isLoading);
  return (
    <Box>
      <TextField
        {...props}
        type="number"
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
        {(isLoading && state !== undefined) || isError
          ? [
              <MenuItem key={state[valueKey]} value={state[valueKey]}>
                {state[valueKey]}
              </MenuItem>,
              <MenuItem key="" value={""} />,
            ]
          : null}
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
