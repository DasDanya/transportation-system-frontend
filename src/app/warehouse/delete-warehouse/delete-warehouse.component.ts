import { Component, OnInit } from '@angular/core';
import { Warehouse } from '../warehouse';
import { WarehouseService } from '../warehouse.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-delete-warehouse',
  templateUrl: './delete-warehouse.component.html',
  styleUrls: ['./delete-warehouse.component.css']
})
export class DeleteWarehouseComponent implements OnInit {

  form:any={};
  errorMessage = '';
  error = false;
  warehouse:Warehouse;

  constructor(private warehouseService: WarehouseService, private route: ActivatedRoute, private router:Router,private tokenStorage: TokenStorageService){}

  ngOnInit(): void {
    this.accessVerification();
    this.route.params.subscribe(params=> this.getWarehouse(params['id']))
  }

  private accessVerification(){
    let userRoles = this.tokenStorage.getAuthorities();

    if(userRoles.indexOf('ROLE_ADMIN') !== -1){
      this.error = false;
      this.errorMessage = '';
    }else{
      this.errorMessage = "Доступ к запрошенному ресурсу запрещен";
      this.error =  true;
    }
  }

  getWarehouse(id:number):void{
    this.warehouseService.deleteWarehouseGet(id).subscribe(
      (response:Warehouse) => {
        this.warehouse = response;
    
        this.resetError();
      },
      (error: HttpErrorResponse) => {
        this.setError(error);
      }
    )
  }

  private setError(error:HttpErrorResponse){
    this.errorMessage = error.error.message;
    this.error = true;
  }

  private resetError(){
    this.error = false;
    this.errorMessage = '';
  }

  onSubmit(){
    this.warehouseService.deleteWarehouse(this.warehouse.id).subscribe(
      (response:any) => {
        this.resetError();

        this.router.navigate(["warehouse/all"]);
      },
      (error: HttpErrorResponse) => {
        this.error = true;
        this.errorMessage = "Ошибка удаления склада. Причиной ошибки может стать удаление склада, который связан с каким-то грузом";
      }
    )
  }

}
