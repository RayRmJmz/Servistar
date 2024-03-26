import { ILoginAuth } from "../models";

export const requestLoginAdapter = (requestData: ILoginAuth): ILoginAuth => ({
  userName: requestData.userName,
  password: requestData.password,
});
