import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { WarehouseService } from '../warehouse.service';

@Component({
  selector: 'app-excel-warehouse',
  templateUrl: './excel-warehouse.component.html',
  styleUrls: ['./excel-warehouse.component.css']
})
export class ExcelWarehouseComponent implements OnInit {

  message = '';
  error = false;

  constructor(private warehouseService: WarehouseService, private route:ActivatedRoute, private tokenStorage:TokenStorageService){}

  ngOnInit(): void {
    if(this.accessVerification()){
      this.route.params.subscribe(params=> this.getReportExcel(params['id']))
    }else{
      this.error = true;
    }
  }

  accessVerification():boolean{
    let userRoles = this.tokenStorage.getAuthorities();

    if(userRoles.indexOf('ROLE_ADMIN') !== -1 || userRoles.indexOf('ROLE_MODERATOR') !== -1){
      this.message = '';
      return true;
    }else{
      this.message = "Доступ к запрошенному ресурсу запрещен";
      return false;
    }
  }

  getReportExcel(id:number){
    this.warehouseService.getReportExcel(id).subscribe(
      (response:Blob) => {
        var file = new Blob([response], {type:'application/vnd.ms-excel'});
        let url = window.URL.createObjectURL(file);
        let pwa = window.open(url);
        
        if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
          alert('Пожалуйста, отключите блокировщик всплывающих окон и попробуйте еще раз');
        }else{
          this.message = `Файл с данными о грузах склада №${id} успешно получен!`;
          this.error = false;
        }
      },
      (error: HttpErrorResponse) => {
        this.message = `Ошибка получения файла с данными о грузах склада №${id}`;
        this.error = true;
      }
    )
  }

}
