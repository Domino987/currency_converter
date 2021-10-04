import {
  AppBar,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import GitHubIcon from "@mui/icons-material/GitHub";
import { LanguageSwapper } from "./LanguageSwapper";
import { ModeToggle } from "./ModeToggle";
import { DevModeSwapper } from "./DevModeSwapper";

const MY_GITHUB_PAGE = "https://github.com/Domino987";

function Header() {
  const { t } = useTranslation();
  return (
    <AppBar position="sticky" elevation={0} sx={{ mb: 2 }}>
      <Toolbar sx={{ justifyContent: "end" }}>
        <Typography
          variant="h4"
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translate(-50%)",
          }}
        >
          {t("app_title")}
        </Typography>
        <DevModeSwapper />
        <LanguageSwapper />
        <ModeToggle />
        <Tooltip title={t("go_to_github") ?? ""}>
          <IconButton
            onClick={() => {
              window.location.href = MY_GITHUB_PAGE;
            }}
          >
            <GitHubIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}

export { Header };
