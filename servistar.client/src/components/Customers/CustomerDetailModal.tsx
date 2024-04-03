import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { ModalTransition } from "../../styles";
import { ICustomerResponse } from "../../models";
import { LABELS } from "../../constants";
import MuiListItemText from "../ListItem/MuiListItemText";
export type CustomerDetailModalProps = {
  openModal: boolean;
  setOpenModal: Function;
  customer: ICustomerResponse;
};

export default function CustomerDetailModal({
  openModal,
  setOpenModal,

  customer,
}: CustomerDetailModalProps) {
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
      <DialogTitle>{LABELS.CUSTOMER}</DialogTitle>
      <DialogContent>
        <MuiListItemText label={LABELS.NAME} information={customer.name} />
        <MuiListItemText
          label={LABELS.LAST_NAME}
          information={customer.lastName}
        />
        <MuiListItemText
          label={LABELS.SECOND_LAST_NAME}
          information={customer.secondLastName}
        />
      </DialogContent>
      <DialogActions>
        <Button variant={"contained"} onClick={handleClose}>
          {LABELS.CLOSE}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
