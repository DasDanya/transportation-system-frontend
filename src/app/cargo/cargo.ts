import { Address } from "../address/address";
import { Warehouse } from "../warehouse/warehouse";
import { CargoPhoto } from "./cargoPhoto";

export class Cargo{
    id:number | undefined;
    name:string;
    category:string;
    cost:number;
    count:number;
    startWarehouse:Warehouse | undefined;
    actualWarehouse:Warehouse | undefined;
    endWarehouse:Warehouse | undefined;
    photos: CargoPhoto[];

    constructor(name:string,category:string,cost:number,count:number,startWarehouse?:Warehouse, endWarehouse?:Warehouse,actualWarehouse?:Warehouse,id?: number,photos?:CargoPhoto[]){
        this.name = name;
        this.category = category;
        this.cost = cost;
        this.count = count;
        this.startWarehouse = startWarehouse;
        this.endWarehouse = endWarehouse;
        this.actualWarehouse = actualWarehouse;
        this.id = id;
        
        if(photos != null){
            this.photos = photos;
        }
    }
}