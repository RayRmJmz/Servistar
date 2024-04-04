import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import { ModalTransition } from "../../styles";
import { ICustomerResponse } from "../../models";
import { LABELS } from "../../constants";
import MuiListItemText from "../ListItem/MuiListItemText";
import { phoneNumberFormatter } from "../../utils";
import MuiDivider from "../Basics/MuiDivider";
import MuiNoData from "../Basics/MuiNoData";
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
      maxWidth="xl"
      fullWidth={true}
    >
      <DialogTitle>{LABELS.CUSTOMER}</DialogTitle>
      <DialogContent>
        <Grid container spacing={1} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <MuiListItemText label={LABELS.NAME} information={customer.name} />
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
            <MuiListItemText
              label={LABELS.LAST_NAME}
              information={customer.lastName}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
            <MuiListItemText
              label={LABELS.SECOND_LAST_NAME}
              information={customer.secondLastName}
            />
          </Grid>
        </Grid>

        <MuiDivider title={LABELS.PHONE_NUMBERS} />
        <Grid container spacing={1} sx={{}}>
          {customer?.phoneNumbers?.map((phoneNumber, index) => (
            <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
              <MuiListItemText
                label={`${LABELS.PHONE_NUMBER} ${index + 1}`}
                information={phoneNumberFormatter(phoneNumber.phoneNumber)}
              />
            </Grid>
          ))}
        </Grid>

        {!!!customer.phoneNumbers.length && (
          <MuiNoData title={"No hay números telefónicos agregados"} />
        )}
        <MuiDivider title={LABELS.ADDRESSES} />
        {!!!customer.address.length && (
          <MuiNoData title={"No hay direcciones agregados"} />
        )}
        {customer?.address?.map((direction) => (
          <Grid container spacing={1} sx={{}}>
            <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
              <MuiListItemText
                label={`${LABELS.STREET} `}
                information={direction.street}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
              <MuiListItemText
                label={`${LABELS.HOUSE_NUMBER} `}
                information={direction.number.toString()}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
              <MuiListItemText
                label={`${LABELS.COLONY} `}
                information={direction.colony}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
              <MuiListItemText
                label={`${LABELS.MUNICIPALITY} `}
                information={direction.minicipality}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
              <MuiListItemText
                label={`${LABELS.STATE} `}
                information={direction.state}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
              <MuiListItemText
                label={`${LABELS.POSTAL_CODE} `}
                information={direction.postalCode.toString()}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
              <MuiListItemText
                label={`${LABELS.REFERENCES} `}
                information={direction.references}
              />
            </Grid>
          </Grid>
        ))}
      </DialogContent>
      <DialogActions>
        <Button variant={"contained"} onClick={handleClose}>
          {LABELS.CLOSE}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
