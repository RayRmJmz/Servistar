import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

import { ModalTransition } from "../../styles";
import { useMutation } from "@tanstack/react-query";
import { deactivateCustomerService } from "../../services";

import useError from "../../hooks/useError";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import useAlert from "../../hooks/useAlert";
import { ICustomerResponse } from "../../models";
import { LABELS } from "../../constants";
export type DeActivateCustomerModalProps = {
  openModal: boolean;
  setOpenModal: Function;
  customer: ICustomerResponse;
  refetch: () => void;
};

export default function DeActivateCustomerModal({
  openModal,
  setOpenModal,
  refetch,
  customer,
}: DeActivateCustomerModalProps) {
  const handleClose = () => {
    setOpenModal(false);
    setError("");
    setAlert("");
  };

  const { AlertComponent, setAlert, isActive } = useAlert();
  const { ErrorAlert, setError } = useError();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { mutate: deletePdfMutation } = useMutation({
    mutationFn: deactivateCustomerService,
    onSuccess: () => {
      refetch();
      setIsLoading(false);
      setAlert(`Proceso correctamente termidado.`);
    },
    onError: (error) => {
      setError(error);
    },
  });

  const handleDelete = async () => {
    if (customer.id <= 0) {
      setError("Ha ocurrido un error al seleccionar cliente.");
    } else {
      setIsLoading(true);
      deletePdfMutation(customer.id);
    }
  };
  return (
    <Dialog
      open={openModal}
      TransitionComponent={ModalTransition}
      keepMounted={true}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle>
        {customer.isActive ? LABELS.DEACTIVATE : LABELS.ACTIVATE}{" "}
        {LABELS.CUSTOMER}
      </DialogTitle>
      <DialogContent>
        <Typography gutterBottom>
          Por favor, confirma para realizar acción.
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          {customer.isActive
            ? "Esta acción no afecta al historial de servicios ni elimina al cliente; simplemente lo desactiva para la generación de servicios."
            : "Al reactivar cliente, podrás generar servicios."}
        </Typography>
        <ErrorAlert />
        <AlertComponent />
      </DialogContent>
      <DialogActions>
        <Button
          variant={!!isActive ? "contained" : "outlined"}
          onClick={handleClose}
        >
          {!isActive ? "Cancelar" : "Cerrar"}
        </Button>
        <LoadingButton
          variant="contained"
          onClick={handleDelete}
          disabled={isLoading || !!isActive}
          loading={isLoading}
        >
          Aceptar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
