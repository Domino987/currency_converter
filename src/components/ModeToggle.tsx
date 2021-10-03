import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { IconButton } from "@mui/material";
import { useRecoilState } from "recoil";
import { darkModeAtom } from "../atoms/theme";

function ModeToggle() {
  const [darkMode, setMode] = useRecoilState(darkModeAtom);
  const toggleMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };
  return (
    <IconButton onClick={toggleMode}>
      {darkMode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
}

export { ModeToggle };
