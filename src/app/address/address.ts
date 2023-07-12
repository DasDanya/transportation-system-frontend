export class Address{
    id:number;
    state:string;
    city:string;
    street:string;
    house:string;

    constructor(state:string, city:string, street:string, house:string, id?: number){
        this.state = state;
        this.city = city;
        this.street = street;
        this.house = house;

        if(id != null){
            this.id = id;
        }
    }
}