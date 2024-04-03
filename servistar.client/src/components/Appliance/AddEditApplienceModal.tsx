import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { ModalTransition } from "../../styles";
import LoadingButton from "@mui/lab/LoadingButton";
import { LABELS } from "../../constants";
import useError from "../../hooks/useError";
import useAlert from "../../hooks/useAlert";

import { useMutation } from "@tanstack/react-query";
import { postApplianteService } from "../../services/catalogues/appliance.service";
import { useFormContextCreateAppliance } from "../../utils";

export type AddEditApplianceModalProps = {
  openModal: boolean;
  setOpenModal: Function;
  refetch: () => void;
};

export default function AddEditApplianceModal({
  openModal,
  setOpenModal,
  refetch,
}: AddEditApplianceModalProps) {
  const { ErrorAlert, setError } = useError();
  const { AlertComponent, setAlert, isActive } = useAlert();
  const handleClose = () => {
    setOpenModal(false);
    reset();
    setError("");
    setAlert("");
  };

  const { mutate: addApplianceMutation, isLoading } = useMutation({
    mutationFn: postApplianteService,
    onSuccess: () => {
      refetch();
      setAlert(`${LABELS.APPLIANCE} agregado.`, false);
    },
    onError: (error) => setError(error),
  });
  const {
    register,
    formState: { errors },

    handleSubmit,
  } = useFormContextCreateAppliance();

  const { reset } = useFormContextCreateAppliance();

  return (
    <Dialog
      open={openModal}
      TransitionComponent={ModalTransition}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      maxWidth="md"
      fullWidth={true}
    >
      <form
        onSubmit={handleSubmit((data) => {
          addApplianceMutation(data);
        })}
      >
        <DialogTitle>{`${LABELS.ADD} ${LABELS.APPLIANCE}`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Grid container spacing={2} sx={{ marginTop: "15px" }}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <TextField
                  id="name"
                  label={LABELS.APPLIANCE}
                  placeholder={LABELS.APPLIANCE}
                  aria-readonly
                  fullWidth
                  autoFocus
                  {...register("appliance")}
                  error={!!errors.appliance}
                  helperText={errors.appliance?.message}
                  disabled={isLoading || !!isActive}
                />
              </Grid>
            </Grid>

            <ErrorAlert />
            <AlertComponent />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant={!!isActive ? "contained" : "outlined"}
            onClick={handleClose}
            fullWidth
            disabled={isLoading}
          >
            {!isActive ? "Cancelar" : "Cerrar"}
          </Button>

          <LoadingButton
            type="submit"
            variant="contained"
            fullWidth
            loading={isLoading}
            disabled={isLoading || !!isActive}
          >
            Guardar
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
}
