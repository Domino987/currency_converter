import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Tooltip,
} from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import DeleteIcon from "@mui/icons-material/Delete";
import { currencyHistory, useSetCurrencies } from "../atoms/inputs";
import { useTranslation } from "react-i18next";

function History() {
  const { t } = useTranslation();
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
  );
}

export { History };
