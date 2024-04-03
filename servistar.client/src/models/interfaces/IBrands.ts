export interface IBrandRequest {
  brand: string;
}
export interface IBrandResponse {
  id: number;
  brand: string;
}
export interface IBrandsAdapter {
  brands: IBrandResponse[];
}
