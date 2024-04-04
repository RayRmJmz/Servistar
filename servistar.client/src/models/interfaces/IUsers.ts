export interface IUserRequest {
  appliance: string;
}
export interface IUsersResponse {
  id: string;
  userName: string;
  email: string;
  name: string;
  lastName: string;
  secondLastName: string;
  nns: string;
  birthDate: string;
  startedDate: string;
  terminationDate: string;
  active: boolean;
  roles?: Role[];
}

export interface IUsersAdapter {
  users: IUsersResponse[];
}

export interface Role {
  id: string;
  name: string;
  selected: boolean;
}
