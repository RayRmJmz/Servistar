import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormContextCreateCustomer } from "./testConfig";
import { useFieldArray } from "react-hook-form";
import { LABELS } from "../../constants";
import { useEffect } from "react";
import { postCustomerService } from "../../services";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import DeleteIcon from "@mui/icons-material/Delete";
import HomeIcon from "@mui/icons-material/Home";
export const NewCourse = () => {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useFormContextCreateCustomer();
  const formData = watch();
  console.log("formData", formData);
  console.log("errors", errors);

  return (
    <div>
      <div className="p-6 bg-gray-300 shadow-sm rounded-lg">
        <div className="text-xl mb-2 font-bold">Add client</div>
        <form
          className="space-y-3"
          onSubmit={handleSubmit(async (data) => {
            console.log(data);
            await postCustomerService(data);
          })}
        >
          <TextField
            sx={{ mt: 1 }}
            id="name"
            label={LABELS.NAME}
            placeholder={LABELS.NAME}
            aria-readonly
            fullWidth
            autoFocus
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            //disabled={isLoading || !!isActive}
          />

          <TextField
            sx={{ mt: 1 }}
            id="lastName"
            label={LABELS.LAST_NAME}
            placeholder={LABELS.LAST_NAME}
            aria-readonly
            fullWidth
            {...register("lastName")}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            //disabled={isLoading || !!isActive}
          />
          <TextField
            sx={{ mt: 1 }}
            id="secondLastName"
            label={LABELS.SECOND_LAST_NAME}
            placeholder={LABELS.SECOND_LAST_NAME}
            aria-readonly
            fullWidth
            {...register("secondLastName")}
            error={!!errors.secondLastName}
            helperText={errors.secondLastName?.message}
            //disabled={isLoading || !!isActive}
          />
          <div className="text-red-600 text-sm mt-1">
            {/* Error: Course title */}
            {errors.name?.message}
          </div>

          <ManageCreatePhoneNumbers />
          <div className="text-red-600 text-sm mt-1">
            {/* Error: Course chapters */}
            {errors.phoneNumbers?.message}
          </div>

          <ManageCreateAddress />
          <div className="text-red-600 text-sm mt-1">
            {/* Error: Course chapters */}
            {errors.address?.message}
          </div>
          <button
            className="px-4 py-2 bg-blue-600 rounded-lg text-white"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export const ManageCreatePhoneNumbers = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContextCreateCustomer();

  const { append, remove, fields } = useFieldArray({
    name: "phoneNumbers",
    control,
  });

  useEffect(() => {
    if (fields.length === 0) {
      //    append({ phoneNumber: "" });
    }
    //console.log("current number ", fields.length);
  }, [fields]);
  return (
    <Box>
      {fields.map((phoneNumbers, phoneNumberIndez) => {
        return (
          <Grid
            container
            spacing={2}
            sx={{ marginTop: "10px" }}
            key={phoneNumbers.id}
          >
            <Grid item container xs={10} sm={10} md={10} lg={10} xl={10}>
              <TextField
                id="phoneNumber"
                label={LABELS.PHONE_NUMBER}
                placeholder={LABELS.PHONE_NUMBER}
                aria-readonly
                fullWidth
                {...register(`phoneNumbers.${phoneNumberIndez}.phoneNumber`)}
                error={!!errors.phoneNumbers}
                helperText={
                  errors.phoneNumbers?.[phoneNumberIndez]?.phoneNumber?.message
                }
              />
            </Grid>
            <Grid item container xs={2} sm={2} md={2} lg={2} xl={2}>
              <IconButton
                aria-label="delete"
                onClick={() => {
                  remove(phoneNumberIndez);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        );
      })}

      <Button
        sx={{ mt: "5px" }}
        variant="contained"
        onClick={() => {
          append({ phoneNumber: "" });
        }}
        startIcon={<LocalPhoneIcon />}
      >
        {LABELS.ADD}
      </Button>
    </Box>
  );
};

export const ManageCreateAddress = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContextCreateCustomer();

  const { append, remove, fields } = useFieldArray({
    name: `address`,
    control,
  });
  useEffect(() => {
    /*
    if (fields.length === 0) {
      append({
        number: "",
        street: "",
        colony: "",
        state: "",
        postalCode: "",
        minicipalityId: 0,
      });
    }*/
  }, [fields.length]);
  return (
    <Box>
      {fields.map((address, addressIndex) => {
        return (
          <Grid
            container
            spacing={2}
            sx={{ marginTop: "15px" }}
            key={address.id}
          >
            <Grid container spacing={2} sx={{ marginTop: "15px" }}>
              <Grid item container xs={6} sm={6} md={6} lg={6} xl={6}>
                <button
                  type="button"
                  onClick={() => {
                    remove(addressIndex);
                  }}
                >
                  Remove address
                </button>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item container xs={6} sm={6} md={6} lg={6} xl={6}>
                <TextField
                  id="numer"
                  label={LABELS.NUMBER}
                  placeholder={LABELS.NUMBER}
                  aria-readonly
                  fullWidth
                  {...register(`address.${addressIndex}.number`)}
                  error={!!errors.address?.[addressIndex]?.number}
                  helperText={errors.address?.[addressIndex]?.number?.message}
                />
              </Grid>
              <Grid item container xs={6} sm={6} md={6} lg={6} xl={6}>
                <TextField
                  id="postalCode"
                  label={LABELS.POSTAL_CODE}
                  placeholder={LABELS.POSTAL_CODE}
                  aria-readonly
                  fullWidth
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    inputProps: {
                      inputMode: "numeric",
                    },
                  }}
                  {...register(`address.${addressIndex}.postalCode`)}
                  error={!!errors.address?.[addressIndex]?.postalCode}
                  helperText={
                    errors.address?.[addressIndex]?.postalCode?.message
                  }
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ marginTop: "10px" }}>
              <Grid item container xs={6} sm={6} md={6} lg={6} xl={6}>
                <TextField
                  id="street"
                  label={LABELS.STREET}
                  placeholder={LABELS.STREET}
                  aria-readonly
                  fullWidth
                  {...register(`address.${addressIndex}.street`)}
                  error={!!errors.address?.[addressIndex]?.street}
                  helperText={errors.address?.[addressIndex]?.street?.message}
                />
              </Grid>
              <Grid item container xs={6} sm={6} md={6} lg={6} xl={6}>
                <TextField
                  id="colony"
                  label={LABELS.COLONY}
                  placeholder={LABELS.COLONY}
                  aria-readonly
                  fullWidth
                  {...register(`address.${addressIndex}.colony`)}
                  error={!!errors.address?.[addressIndex]?.colony}
                  helperText={errors.address?.[addressIndex]?.colony?.message}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ marginTop: "10px" }}>
              <Grid item container xs={6} sm={6} md={6} lg={6} xl={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    {LABELS.MUNICIPALITY}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    {...register(`address.${addressIndex}.minicipalityId`)}
                  >
                    <MenuItem value={1}>Armeria</MenuItem>
                    <MenuItem value={2}>Colima</MenuItem>
                    <MenuItem value={3}>VIlla</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item container xs={6} sm={6} md={6} lg={6} xl={6}>
                <TextField
                  id="estado"
                  label={LABELS.STATE}
                  placeholder={LABELS.STATE}
                  aria-readonly
                  fullWidth
                  {...register(`address.${addressIndex}.state`)}
                  error={!!errors.address?.[addressIndex]?.state}
                  helperText={errors.address?.[addressIndex]?.state?.message}
                />
              </Grid>
            </Grid>
          </Grid>
        );
      })}
      <Button
        sx={{ mt: "5px" }}
        variant="contained"
        onClick={() => {
          append({
            number: "",
            street: "",
            colony: "",
            state: "",
            postalCode: "",
            minicipalityId: 0,
          });
        }}
        startIcon={<HomeIcon />}
      >
        {LABELS.ADD}
      </Button>
    </Box>
  );
};
