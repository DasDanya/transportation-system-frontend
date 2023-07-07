import { Warehouse } from "../warehouse/warehouse";

export class Responsible{
    id: number;
    surname: string;
    name: string;
    patronymic: string;
    phone: string;
    photo: File;
    warehouses: Warehouse[];

    constructor(surname: string, name:string, patronymic: string, phone: string){
        this.surname = surname;
        this.name = name;
        this.patronymic = patronymic;
        this.phone = phone;
    }
}