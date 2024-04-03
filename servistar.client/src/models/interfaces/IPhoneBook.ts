export interface IPhoneBookResponse {
  id: number;
  phoneNumber: string;
  principal: boolean;
}

export interface IPhoneBookRequest {
  phoneNumber: string;
}
