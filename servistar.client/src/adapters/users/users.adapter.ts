import { IUsersAdapter, IUsersResponse } from "../../models";

export const usersAdapater = ({ users }: IUsersAdapter): IUsersResponse[] =>
  users?.map(
    ({
      id,
      userName,
      email,
      name,
      lastName,
      secondLastName,
      nns,
      birthDate,
      startedDate,
      terminationDate,
      active,
      roles,
    }: IUsersResponse) => ({
      id,
      userName,
      email,
      name,
      lastName,
      secondLastName,
      nns,
      birthDate,
      startedDate,
      terminationDate,
      active,
      roles,
    })
  );
