export interface ICustomerResponse {
  id: number;
  name: string;
  lastName: string;
  secondLastName: string;
  birthDate: string;
  userId: string;
  registrationDate: string;
  isActive: boolean;
  status?: string;
}



export interface ICustomersPaginationResponse {
  results: ICustomerResponse[];
  total: number;
}

export interface ICustomersPaginationGrid {
  customers: ICustomerResponse[];
  total?: number;
}

export interface ICustomerRequest {
  name: string;
  lastName: string;
  secondLastName: string;
  // birthDate: string;
}
