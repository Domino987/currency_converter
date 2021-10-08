import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRecoilState } from "recoil";
import DeleteIcon from "@mui/icons-material/Delete";
import { currencyHistory, useSetCurrencies } from "../atoms/inputs";
import { useTranslation } from "react-i18next";
import { useCurrentlyEnteredValues } from "../hooks/useCurrency";
import { formatDistanceToNow } from "date-fns";

function History() {
  const { t } = useTranslation();
  const { dataUpdatedAt } = useCurrentlyEnteredValues();
  const [history, setHistory] = useRecoilState(currencyHistory);
  const setCurrencies = useSetCurrencies();

  const removeItemfromList = ({ from, to }: { from: string; to: string }) => {
    setHistory((prev) =>
      prev.filter(
        ({ from: prevFrom, to: prevTo }) =>
          `${prevFrom}_${prevTo}` !== `${from}_${to}`
      )
    );
  };

  return (
    <>
      {dataUpdatedAt ? (
        <Typography sx={{ float: "right", m: 3 }}>
          {t("last_updated")}{" "}
          {formatDistanceToNow(dataUpdatedAt, { addSuffix: true })}
        </Typography>
      ) : null}
      <List
        sx={{
          mt: 8,
        }}
      >
        {history.map(({ from, to }) => (
          <ListItem
            component={Paper}
            key={`${from}_${to}`}
            sx={{ width: 300, m: "auto", my: 1 }}
            disablePadding={true}
            secondaryAction={
              <Tooltip
                title={t("removeRecent", { name: `${from} to ${to}` }) ?? ""}
              >
                <IconButton
                  onClick={() => {
                    removeItemfromList({ from, to });
                  }}
                  edge="end"
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            }
          >
            <ListItemButton onClick={() => setCurrencies({ from, to })}>
              <ListItemText primary={`${from} => ${to}`} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
}

export { History };
