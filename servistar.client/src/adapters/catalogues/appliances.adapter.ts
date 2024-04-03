import { IApplianceResponse, IAppliancesAdapter } from "../../models";

export const appliancesAdapater = ({
  appliances,
}: IAppliancesAdapter): IApplianceResponse[] =>
  appliances?.map(({ id, appliance }: IApplianceResponse) => ({
    id: id,
    appliance: appliance,
  }));
