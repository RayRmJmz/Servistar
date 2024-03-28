import {
  Box,
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
import { LABELS, customerReqDefaultValues } from "../../constants";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { customerValidationSchema } from "../../utils";
import { ICustomerRequest } from "../../models";
import { useMutation } from "@tanstack/react-query";
import { addCustomerAdapter } from "../../adapters";
import { postCustomerService } from "../../services";
import useError from "../../hooks/useError";
import useAlert from "../../hooks/useAlert";

export type AddEditCustomerModalProps = {
  openModal: boolean;
  setOpenModal: Function;
  onSuccess: () => void;
};

export default function AddEditCustomerModal({
  openModal,
  setOpenModal,

  onSuccess,
}: AddEditCustomerModalProps) {
  const { ErrorAlert, setError } = useError();

  const { AlertComponent, setAlert, isActive } = useAlert();
  const handleClose = () => {
    setOpenModal(false);
    registerCustomerForm.reset();
    setError("");
    setAlert("");
    onSuccess;
  };

  const registerCustomerForm = useForm({
    defaultValues: customerReqDefaultValues,
    resolver: yupResolver(customerValidationSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = registerCustomerForm;

  const { mutate: addCustumerMutation, isLoading } = useMutation({
    mutationFn: postCustomerService,
    onSuccess: () => setAlert(`${LABELS.CUSTOMER} agregado.`, false),
    onError: (error) => setError(error),
  });

  const registerCustomer: SubmitHandler<ICustomerRequest> = (
    data: ICustomerRequest
  ) => addCustumerMutation(addCustomerAdapter(data));

  return (
    <Dialog
      open={openModal}
      TransitionComponent={ModalTransition}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      maxWidth="md"
      fullWidth={true}
    >
      <DialogTitle>{`${LABELS.ADD} ${LABELS.CUSTOMER}`}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <FormProvider {...registerCustomerForm}>
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
              onSubmit={handleSubmit(registerCustomer)}
            >
              <Grid container spacing={2} sx={{ marginTop: "15px" }}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <TextField
                    id="name"
                    label={LABELS.NAME}
                    placeholder={LABELS.NAME}
                    aria-readonly
                    fullWidth
                    autoFocus
                    {...register("name")}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    disabled={isLoading || !!isActive}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{ marginTop: "15px" }}>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                  <TextField
                    id="lastName"
                    label={LABELS.LAST_NAME}
                    placeholder={LABELS.LAST_NAME}
                    aria-readonly
                    fullWidth
                    autoFocus
                    {...register("lastName")}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    disabled={isLoading || !!isActive}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                  <TextField
                    id="secondLastName"
                    label={LABELS.SECOND_LAST_NAME}
                    placeholder={LABELS.SECOND_LAST_NAME}
                    aria-readonly
                    fullWidth
                    autoFocus
                    {...register("secondLastName")}
                    error={!!errors.secondLastName}
                    helperText={errors.secondLastName?.message}
                    disabled={isLoading || !!isActive}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginTop: "15px" }}>
                <Grid item container xs={6} sm={6} md={6} lg={6} xl={6}>
                  <Button
                    variant={!!isActive ? "contained" : "outlined"}
                    onClick={handleClose}
                    fullWidth
                    disabled={isLoading}
                  >
                    {!isActive ? "Cancelar" : "Cerrar"}
                  </Button>
                </Grid>
                <Grid item container xs={6} sm={6} md={6} lg={6} xl={6}>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    fullWidth
                    loading={isLoading}
                    disabled={isLoading || !!isActive}
                  >
                    Guardar
                  </LoadingButton>
                </Grid>
              </Grid>
              <ErrorAlert />
              <AlertComponent />
            </Box>
          </FormProvider>
        </DialogContentText>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}
