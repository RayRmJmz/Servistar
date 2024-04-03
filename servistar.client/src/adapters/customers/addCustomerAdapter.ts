import { ICustomerRequest } from "../../models";

export const addCustomerAdapter = ({
  name,
  lastName,
  secondLastName,
  phoneNumbers,
}: ICustomerRequest): ICustomerRequest => ({
  name,
  lastName,
  secondLastName,
  phoneNumbers: phoneNumbers.map((number) => ({
    phoneNumber: number.phoneNumber,
  })),
});
