import {
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Box,
  TextFieldProps,
} from "@mui/material";
import { RecoilState, useRecoilState } from "recoil";
import { useAllCurrencies, useCurrencyState } from "../hooks/useAllCurrencies";

type IProps = TextFieldProps & {
  inputState: RecoilState<string>;
};

function CurrencyInput({ inputState, ...props }: IProps) {
  const [state, setState] = useRecoilState(inputState);
  const currencyState = useCurrencyState(state);
  const { currencies, isLoading } = useAllCurrencies();

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
          setState(e.target.value);
        }}
        value={isLoading ? "" : state}
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
