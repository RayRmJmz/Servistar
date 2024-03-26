import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
  } from "@mui/material";
  
  import { ModalTransition } from "../../styles";
  export type LogOutModalProps = {
    openModal: boolean;
    setOpenModal: Function;
    onAccept: Function;
  };
  
  export default function LogOutModal({
    openModal,
    setOpenModal,
    onAccept,
  }: LogOutModalProps) {
    const handleClose = () => {
      setOpenModal(false);
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
        <DialogTitle>{"Cerrar sesión"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Typography>Por favor, confirma para cerrar sesión.</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={() => onAccept()} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  