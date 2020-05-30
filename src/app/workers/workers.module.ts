import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule }   from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
// import {Tablesort} from 'tablesort'
// import { FilterPipe } from './../shared/pipes/filter.pipe';

import { WorkersRoutingModule } from './workers-routing.module';
import { WorkersComponent } from './workers.component';
import { ListWorkersComponent } from './list-workers/list-workers.component';
import { EditWorkerComponent } from './edit-worker/edit-worker.component';
import { FilterPipe } from '../shared/pipes/filter.pipe';


@NgModule({
  declarations: [WorkersComponent, ListWorkersComponent, EditWorkerComponent,FilterPipe],
  imports: [
    CommonModule,
    WorkersRoutingModule,
    ReactiveFormsModule,
    TextMaskModule,
    FormsModule,
    
  ]
})
export class WorkersModule { }
