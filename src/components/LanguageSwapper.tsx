import Flag from "react-world-flags";
import { useTranslation } from "react-i18next";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import Cookies from "js-cookie";
import { styled } from "@mui/material/styles";

const StyledFlag = styled(Flag)({ height: 15 });

function LanguageSwapper() {
  const { i18n } = useTranslation();

  const setLanguage = (e: SelectChangeEvent<string>) => {
    i18n.changeLanguage(e.target.value);
    Cookies.set("lang", e.target.value);
  };

  return (
    <Select onChange={setLanguage} value={i18n.language} sx={{ p: 0 }}>
      {i18n.languages.map((lang) => (
        <MenuItem key={lang} value={lang}>
          <StyledFlag code={lang} />
        </MenuItem>
      ))}
    </Select>
  );
}

export { LanguageSwapper };
