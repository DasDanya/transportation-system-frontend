import { Address } from "../address/address";
import { Responsible } from "../responsible/responsible";

export class Warehouse{
    id: number;
    address: Address;
    responsible:Responsible;

    constructor(address: Address, responsible?: Responsible, id?:number){
        this.address = address;

        if(responsible != null){
            this.responsible = responsible;
        }

        if(id != null){
            this.id = id;
        }
    }
}