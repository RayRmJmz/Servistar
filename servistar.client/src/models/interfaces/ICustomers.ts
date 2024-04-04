import { IAddress } from "./IAddress";
import { IPhoneBookRequest, IPhoneBookResponse } from "./IPhoneBook";

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
  phoneNumbers: IPhoneBookResponse[];
  address: IAddress[];
}

export interface ICustomerResponseSingle {
  id: number;
  name: string;
  lastName: string;
  secondLastName: string;
  birthDate: string;
  userId: string;
  registrationDate: string;
  isActive: boolean;
  status?: string;
  phoneNumbers: IPhoneBookResponse[];
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
  phoneNumbers: Array<IPhoneBookRequest>;
}
