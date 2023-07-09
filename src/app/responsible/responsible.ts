import { Warehouse } from "../warehouse/warehouse";

export class Responsible{
    id: number;
    surname: string;
    name: string;
    patronymic: string;
    phone: string;
    photo: Blob;
    warehouses: Warehouse[];

    constructor(surname: string, name:string, patronymic: string, phone: string, id?: number, photo?:Blob){
        if(id != null){
            this.id = id;
        }
        
        if(photo != null){
            this.photo = photo;
        }

        this.surname = surname;
        this.name = name;
        this.patronymic = patronymic;
        this.phone = phone;
    }
}