import { Component, OnInit } from '@angular/core';
import { ResponsibleService } from '../responsible.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-excel-responsible',
  templateUrl: './excel-responsible.component.html',
  styleUrls: ['./excel-responsible.component.css']
})
export class ExcelResponsibleComponent implements OnInit {

  message = '';
  error = false;

  constructor(private responsibleService:ResponsibleService, private route:ActivatedRoute, private router: Router){}
 
  ngOnInit(): void {
    this.route.params.subscribe(params=> this.getReportExcel(params['id']))
  }

  getReportExcel(id:number){
    this.responsibleService.getReportExcel(id).subscribe(
      (response:Blob) => {
        var file = new Blob([response], {type:'application/vnd.ms-excel'});
        let url = window.URL.createObjectURL(file);
        let pwa = window.open(url);
        
        if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
          alert('Пожалуйста, отключите блокировщик всплывающих окон и попробуйте еще раз');
        }else{
          this.message = "Файл с данными о складах отвественного успешно получен!";
          this.error = false;
        }
      },
      (error: HttpErrorResponse) => {
        this.message = "Ошибка получения файла с данными о складах ответственного";
        this.error = true;
      }
    )
  }
}
