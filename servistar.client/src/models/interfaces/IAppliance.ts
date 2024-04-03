export interface IApplianceRequest {
  appliance: string;
}
export interface IApplianceResponse {
  id: number;
  appliance: string;
}
export interface IAppliancesAdapter {
  appliances: IApplianceResponse[];
}
