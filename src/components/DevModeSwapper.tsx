import { useTranslation } from "react-i18next";
import { Stack, Tooltip, Typography } from "@mui/material";
import Switch from "@mui/material/Switch";
import { useRecoilState } from "recoil";
import { devModeAtom } from "../atoms/theme";

function DevModeSwapper() {
  const { t } = useTranslation();
  const [devMode, setDevMode] = useRecoilState(devModeAtom);
  const toggleDevMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDevMode(e.target.checked);
  };
  return (
    <Tooltip title={t("toggle_dev_mode") ?? ""}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mx: 2 }}>
        <Typography>{t("prod_mode")}</Typography>
        <Switch
          checked={devMode}
          onChange={toggleDevMode}
          inputProps={{ "aria-label": "toggle dev mode" }}
        />
        <Typography>{t("dev_mode")}</Typography>
      </Stack>
    </Tooltip>
  );
}

export { DevModeSwapper };
