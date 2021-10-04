import { Alert } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient, useQueryErrorResetBoundary } from "react-query";

function Alertbar() {
  const { t } = useTranslation();
  const queryCache = useQueryClient().getQueryCache();
  const [hasError, setHasError] = React.useState(false);
  React.useEffect(() => {
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
    <Alert severity="error" sx={{ m: 4 }}>
      {t("api_full")}
    </Alert>
  ) : null;
}

export { Alertbar };
