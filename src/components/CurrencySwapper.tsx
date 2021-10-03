import SwapHorizIcon from "@mui/icons-material/SwapHorizontalCircle";
import { IconButton } from "@mui/material";
import React from "react";
import { useRecoilState } from "recoil";
import { fromCurrency, leftInput, toCurrency } from "../atoms/inputs";
import { useCurrency } from "../hooks/useCurrency";

const rotationStyles = {
  MozTransition: "all .2s linear;",
  WebkitTransition: "all .2s linear;",
  transition: "all .2s linear;",
  MozTransform: "rotate(180deg);",
  WebkitTransform: "rotate(180deg);",
  transform: "rotate(180deg);",
};

function CurrencySwapper() {
  const [rotated, setRotated] = React.useState(false);
  const [text, setText] = useRecoilState(leftInput);
  const [from, setFrom] = useRecoilState(fromCurrency);
  const [to, setTo] = useRecoilState(toCurrency);
  const { convertedValue } = useCurrency(from, to, text);
  const swapCurrencies = () => {
    setFrom(to);
    setTo(from);
    setText(String(convertedValue));
    setRotated(true);
    setTimeout(() => {
      setRotated(false);
    }, 200);
  };
  return (
    <IconButton
      onClick={swapCurrencies}
      sx={rotated ? rotationStyles : undefined}
    >
      <SwapHorizIcon />
    </IconButton>
  );
}

export { CurrencySwapper };
