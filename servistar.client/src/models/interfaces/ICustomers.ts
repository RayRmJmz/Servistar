export interface ICustomer {
  id: number;
  name: string;
  lastName: string;
  secondLastName: string;
  birthDate: string;
  userId: string;
  registrationDate: string;
}

export interface ICustomersPaginationResponse {
  results: ICustomer[];
  total: number;
}

export interface ICustomersPaginationGrid {
  customers: ICustomer[];
  total?: number;
}
