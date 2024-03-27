import {
  ICustomer,
  ICustomersPaginationGrid,
  ICustomersPaginationResponse,
} from "../../models";

export const customersPaginationAdapter = ({
  results,
  total,
}: ICustomersPaginationResponse): ICustomersPaginationGrid => ({
  customers: results?.map(
    ({
      id,
      name,
      lastName,
      secondLastName,
      registrationDate,
      userId,
      birthDate,
    }: ICustomer) => ({
      id,
      name,
      lastName,
      secondLastName,
      registrationDate,
      userId,
      birthDate,
    })
  ),
  total: total || 100,
});
