import {
  ICustomerResponse,
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
      isActive,
    }: ICustomerResponse) => ({
      id,
      name,
      lastName,
      secondLastName,
      registrationDate,
      userId,
      birthDate,
      isActive: isActive,
      status: isActive ? "Activo" : "Inactivo",
    })
  ),
  total: total || 100,
});
