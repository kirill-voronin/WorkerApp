import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListWorkersComponent } from './list-workers/list-workers.component';
import { EditWorkerComponent } from './edit-worker/edit-worker.component';


const routes: Routes = [
  {
    path:'',
    component:ListWorkersComponent
  },
  {
    path:'profile',
    component:EditWorkerComponent
  },
  {
    path:'profile/:id',
    component:EditWorkerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkersRoutingModule { }
