import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { IconButton, Tooltip } from "@mui/material";
import { useRecoilState } from "recoil";
import { darkModeAtom } from "../atoms/theme";
import { useTranslation } from "react-i18next";

function ModeToggle() {
  const { t } = useTranslation();
  const [darkMode, setMode] = useRecoilState(darkModeAtom);
  const toggleMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };
  return (
    <Tooltip
      title={t(darkMode === "dark" ? "toggle_light" : "toggle_dark") ?? ""}
    >
      <IconButton onClick={toggleMode}>
        {darkMode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Tooltip>
  );
}

export { ModeToggle };
