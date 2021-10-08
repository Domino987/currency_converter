import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { useQueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useRecoilValue } from "recoil";
import { darkModeAtom, devModeAtom } from "../atoms/theme";
import { worker } from "../mocks/browser";
import { darkVariant, lightVariant } from "../utils/colors";
/**
 * The global app frame to render the app content with a theme provider and the dev mode with msw.
 *
 * Listens to the dark mode to update the theme on toggle.
 *
 * If the dev mode is on, the queries are reset to call the new endpoints
 *
 * @param {({ children: JSX.Element[] | JSX.Element })} { children } The app content
 * @return {JSX.Element} The app content passed within the theme provider and msw
 */
function AppFrame({ children }: { children: JSX.Element[] | JSX.Element }) {
  const queryClient = useQueryClient();
  const devMode = useRecoilValue(devModeAtom);
  const darkMode = useRecoilValue(darkModeAtom);
  const theme = React.useMemo(
    () => createTheme(darkMode === "dark" ? darkVariant : lightVariant),
    [darkMode]
  );
  React.useEffect(() => {
    const startMode = async () => {
      if (devMode) {
        await worker.start();
      }
      queryClient.refetchQueries({ inactive: false });
    };
    startMode();
    return () => {
      if (devMode) {
        worker.stop();
      }
    };
  }, [devMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
      <ReactQueryDevtools />
    </ThemeProvider>
  );
}

export { AppFrame };
