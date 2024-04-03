import React from "react";
import { TextField } from "@mui/material";

interface PhoneNumberInputProps {
  index: number;
  register: any;
  errors: any;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  index,
  register,
  errors,
}) => {
  return (
    <TextField
      id={`phoneNumber_${index}`}
      label={`Phone Number ${index + 1}`}
      placeholder={`Enter phone number ${index + 1}`}
      fullWidth
      {...register(`phoneNumbers[${index}].phoneNumber`)}
      error={!!errors?.phoneNumbers?.[index]?.phoneNumber}
      helperText={errors?.phoneNumbers?.[index]?.phoneNumber?.message}
    />
  );
};

export default PhoneNumberInput;