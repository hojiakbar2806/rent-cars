import { CarType } from "./cars";

export interface FilterData {
  car_types: CarType[];
  max_price: number;
  min_price: number;
  capacities: number[];
}
