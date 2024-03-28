import { ReactElement, useState } from "react";
import { Alert, IconButton, Collapse } from "@mui/material";
import CloseIcon from "@mui/icons-material/close";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function useAlert() {
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [severity, setSeverity] = useState<"success" | "info" | "warning">(
    "success"
  );

  const [canClose, setCanClose] = useState<boolean>(false);
  const AlertComponent = (): ReactElement | null =>
    alertMessage ? (
      <Collapse sx={{ my: 2 }} in={!!alertMessage}>
        <Alert
          severity={severity}
          action={
            canClose && (
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setAlertMessage("")}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            )
          }
        >
          {alertMessage}
        </Alert>
      </Collapse>
    ) : null;
  const setMessage = (message: string, canClose: boolean = false) => {
    setAlertMessage(message);
    setCanClose(canClose);
  };

  return {
    AlertComponent: AlertComponent,
    setAlert: setMessage,
    severity: setSeverity,
    isActive: alertMessage,
  };
}
