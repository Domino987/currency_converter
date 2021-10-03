import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useRecoilValue } from "recoil";
import { darkModeAtom } from "../atoms/theme";
import { darkVariant, lightVariant } from "../utils/colors";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: Infinity,
    },
  },
});

function AppFrame({ children }: { children: JSX.Element[] | JSX.Element }) {
  const darkMode = useRecoilValue(darkModeAtom);
  const theme = React.useMemo(
    () => createTheme(darkMode === "dark" ? darkVariant : lightVariant),
    [darkMode]
  );
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
        <ReactQueryDevtools />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export { AppFrame };
