import { Alert } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { devModeAtom } from "../atoms/theme";

function DevModeNotification() {
  const devMode = useRecoilValue(devModeAtom);
  const { t } = useTranslation();
  if (!devMode) return null;
  return (
    <Alert severity="warning" sx={{ m: 4 }}>
      {t("alert_mode_notification")}
    </Alert>
  );
}

export { DevModeNotification };
