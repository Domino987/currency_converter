import { Alert } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";

/**
 * Renders the app alert bar.
 *
 * If the queries throw an error due to the api being offline
 *
 * @return {JSX.Element} The Alertbar element, if an error was thrown
 */
function Alertbar() {
  const { t } = useTranslation();

  const queryCache = useQueryClient().getQueryCache();
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    // Searches all queries if an error happened to display the error bar
    const callback = () => {
      const queries = queryCache.findAll();
      const hasQueryError = queries.some(
        (query) => query.state.status === "error"
      );
      setHasError(hasQueryError);
    };

    return queryCache.subscribe(callback);
  }, [queryCache]);
  return hasError ? (
    <Alert severity="error" sx={{ m: 4, mt: 0 }}>
      {t("api_full")}
    </Alert>
  ) : null;
}

export { Alertbar };
