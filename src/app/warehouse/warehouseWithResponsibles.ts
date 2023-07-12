import { Warehouse } from "./warehouse";
import { Responsible } from 'src/app/responsible/responsible';

export class WarehouseWithResponsibles{
    responsibleId: number;
    warehouse:Warehouse;
    responsibles:Responsible[];
}