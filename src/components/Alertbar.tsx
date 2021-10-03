import { Alert } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useQueryClient, useQueryErrorResetBoundary } from "react-query";

function Alertbar() {
  const { t } = useTranslation();
  const client = useQueryClient();
  const queries = client.getQueryCache().findAll();
  const hasQueryError = queries.some((query) => query.state.status === "error");
  return hasQueryError ? (
    <Alert severity="error" sx={{ m: 3 }}>
      {t("api_full")}
    </Alert>
  ) : null;
}

export { Alertbar };
