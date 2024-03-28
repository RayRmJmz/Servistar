import { ICustomerRequest } from "../../models";

export const addCustomerAdapter = ({
  name,
  lastName,
  secondLastName,
}: // birthDate,
ICustomerRequest): ICustomerRequest => ({
  name,
  lastName,
  secondLastName,
  // birthDate,
});
