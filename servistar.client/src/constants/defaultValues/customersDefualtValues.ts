import { ICustomerRequest, ICustomerResponse } from "../../models";

export const customerReqDefaultValues: ICustomerRequest = {
  name: "",
  lastName: "",
  secondLastName: "",
};
export const customerResponseDefaultValues: ICustomerResponse = {
  id: 0,
  name: "",
  lastName: "",
  secondLastName: "",
  userId: "",
  registrationDate: "",
  birthDate: "",
  isActive: true,
};
