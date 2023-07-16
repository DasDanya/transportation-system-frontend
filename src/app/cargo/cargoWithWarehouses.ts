import { Warehouse } from "../warehouse/warehouse";
import { Cargo } from "./cargo";

export class CargoWithWarehouses{
    cargo: Cargo;
    warehouses: Warehouse[];
}