import { Component, OnInit } from '@angular/core';
import { WorkersService } from 'src/app/shared/services/workers.service';
import { MyWorker, MyWorkerType } from 'src/app/shared/models/worker.model';
import { isNullOrUndefined } from 'util';
import {Tablesort}   from 'src/app/shared/models//tablesort';

import { Router } from '@angular/router';
// import { Route } from '@angular/compiler/src/core';
// import { worker } from 'cluster';

@Component({
  selector: 'app-list-workers',
  templateUrl: './list-workers.component.html',
  styleUrls: ['./list-workers.component.css']
})
export class ListWorkersComponent implements OnInit {

  workers: MyWorker[];
  workerType: MyWorkerType;
  myTypes = [
    'It отдел',
    'Отдел продаж',
    'Отдел доставки',
    'Юридический отдел'
  ];
  filterNameSurname ='';

  constructor(
    private workersService: WorkersService,
    private router:Router,
    ) { }

  ngOnInit(): void {
    this.getData();
    new Tablesort(document.getElementById('table-id'));
  }

  async getData(){
    try {
      let workers = this.workersService.getAll();
      this.workers = isNullOrUndefined(await workers) ? [] : await workers;
    } catch (error) {
      console.error(error);
    }
    
  }

  onEditProfile(id:number){
    this.router.navigate([this.router.url, 'profile', id]);
    
  }

  onAddProfile(){
    this.router.navigate([this.router.url, 'profile'])
  }

  onMain(){
    this.router.navigate([''])
  }

  async onDeleteWorker(id:number){
    try {
      await this.workersService.deleteOneById(id);  
    } catch (error) {
      console.error(error)
    }finally{
      this.getData();
    }
    
  }
  
  getDateWorker(date){
    let bDay = new Date();
    let day = date.toString().slice(8,10);
    let month = date.toString().slice(5,7);
    let year = date.toString().slice(0,4);
    // let b = new Date(year,month,day);
  
    let b = (day+'.'+month+'.'+year).toString();
    return b;
  }
    
}
