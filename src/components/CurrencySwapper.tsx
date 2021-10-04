import SwapHorizIcon from "@mui/icons-material/SwapHorizontalCircle";
import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { currencyValues, leftInput } from "../atoms/inputs";
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
  const { t } = useTranslation();
  const [rotated, setRotated] = React.useState(false);
  const [text, setText] = useRecoilState(leftInput);
  const [{ from, to }, setValues] = useRecoilState(currencyValues);
  const { convertedValue } = useCurrency(from, to, text);
  const swapCurrencies = () => {
    setValues((prev) => ({ to: prev.from, from: prev.to }));
    setText(String(convertedValue));
    setRotated(true);
    setTimeout(() => {
      setRotated(false);
    }, 200);
  };
  return (
    <Tooltip title={t("swap_currencies") ?? ""}>
      <IconButton
        onClick={swapCurrencies}
        sx={rotated ? rotationStyles : undefined}
      >
        <SwapHorizIcon />
      </IconButton>
    </Tooltip>
  );
}

export { CurrencySwapper };
