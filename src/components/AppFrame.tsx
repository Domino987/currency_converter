import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { useQueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useRecoilValue } from "recoil";
import { darkModeAtom, devModeAtom } from "../atoms/theme";
import { worker } from "../mocks/browser";
import { darkVariant, lightVariant } from "../utils/colors";

function AppFrame({ children }: { children: JSX.Element[] | JSX.Element }) {
  const queryClient = useQueryClient();
  const devMode = useRecoilValue(devModeAtom);
  const darkMode = useRecoilValue(darkModeAtom);
  const theme = React.useMemo(
    () => createTheme(darkMode === "dark" ? darkVariant : lightVariant),
    [darkMode]
  );

  React.useEffect(() => {
    if (devMode) {
      worker.start();
    }
    queryClient.refetchQueries();
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
