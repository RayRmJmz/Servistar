import { ReactElement, useState } from "react";
import { Alert, IconButton, Collapse } from "@mui/material";
import CloseIcon from "@mui/icons-material/close";
import { FieldErrors } from "react-hook-form";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function useError() {
  const [error, setError] = useState<string>("");

  const errorMessage = (): ReactElement | null =>
    error ? (
      <Collapse sx={{ my: 2 }} in={!!error}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setError("")}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {error}
        </Alert>
      </Collapse>
    ) : null;

  const setErrorMessage = (ex: any) => {
    setError(ex?.response?.data?.message ?? ex?.message ?? "");
  };

  const moveToTabError = (
    errors: FieldErrors<any>,
    fieldErrorsInTabs: any,
    setTabIndex: (tab: any) => void
  ) => {
    const [firstKeyError] = Object.keys(errors);
    setTabIndex((value: any) =>
      typeof value === "string"
        ? `${fieldErrorsInTabs[firstKeyError]}`
        : fieldErrorsInTabs[firstKeyError]
    );
  };

  const moveToTabErrorStore = (
    errors: FieldErrors<any>,
    fieldErrorsInTabs: any,
    setTabIndex: (item: number) => void
  ) => {
    const [firstKeyError] = Object.keys(errors);
    setTabIndex(fieldErrorsInTabs[firstKeyError]);
  };

  return {
    ErrorAlert: errorMessage,
    setError: setErrorMessage,
    moveToTabError,
    moveToTabErrorStore,
  };
}
