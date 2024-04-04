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
import { postBrandService } from "../../services";
import { useFormContextCreateBrand } from "../../utils/validationsSchemas/brand.validation";

export type AddEditBrandModalProps = {
  openModal: boolean;
  setOpenModal: Function;
  refetch: () => void;
};

export default function AddEditBrandModal({
  openModal,
  setOpenModal,
  refetch,
}: AddEditBrandModalProps) {
  const { ErrorAlert, setError } = useError();
  const { AlertComponent, setAlert, isActive } = useAlert();
  const handleClose = () => {
    setOpenModal(false);
    reset();
    setError("");
    setAlert("");
  };

  const { mutate: addBrandMutation, isLoading } = useMutation({
    mutationFn: postBrandService,
    onSuccess: () => {
      refetch();
      setAlert(`${LABELS.BRAND} agregado.`, false);
    },
    onError: (error) => setError(error),
  });
  const {
    register,
    formState: { errors },

    handleSubmit,
  } = useFormContextCreateBrand();

  const { reset } = useFormContextCreateBrand();

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
          addBrandMutation(data);
        })}
      >
        <DialogTitle>{`${LABELS.ADD} ${LABELS.APPLIANCE}`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Grid container spacing={2} sx={{ marginTop: "15px" }}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <TextField
                  id="name"
                  label={LABELS.BRAND}
                  placeholder={LABELS.BRAND}
                  aria-readonly
                  fullWidth
                  autoFocus
                  {...register("brand")}
                  error={!!errors.brand}
                  helperText={errors.brand?.message}
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
