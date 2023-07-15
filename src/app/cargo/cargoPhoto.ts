export class CargoPhoto{
    id:number;
    photo:Blob;

    constructor(photo:Blob,id?:number){
        this.photo=photo;
        if(id != null){
            this.id = id;
        }
    }
}