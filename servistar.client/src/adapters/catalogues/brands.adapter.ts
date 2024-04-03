import { IBrandResponse, IBrandsAdapter } from "../../models";

export const brandsAdapater = ({ brands }: IBrandsAdapter): IBrandResponse[] =>
  brands?.map(({ id, brand }: IBrandResponse) => ({
    id,
    brand,
  }));
