import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyWorker, MyWorkerType } from 'src/app/shared/models/worker.model';
import { WorkersService } from 'src/app/shared/services/workers.service';
import { ActivatedRoute, Router} from '@angular/router';
import { isNullOrUndefined } from 'util';
// import { worker } from 'cluster';

@Component({
  selector: 'app-edit-worker',
  templateUrl: './edit-worker.component.html',
  styleUrls: ['./edit-worker.component.css']
})
export class EditWorkerComponent implements OnInit {

  workerForm: FormGroup;
  worker: MyWorker;
  id: number;
  workerType = MyWorkerType;
  workers:MyWorker[];
  public telephoneMask = ['8',' ','(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/,' ', /\d/, /\d/]
  public dateMask = [/[0-3]/,/\d/,'.',/\d/,/\d/,'.',/\d/,/\d/,/\d/,/\d/]
  

  constructor(
    private workerService:WorkersService,
    private activatedRouter: ActivatedRoute,
    private router:Router
  ) {
      this.activatedRouter.params.subscribe(params => {
        if(!isNullOrUndefined(params.id)){
          this.id = +params.id;
          
        }else{
          this.id = null;
          
        }})
        
   }

  ngOnInit(): void {
    this.getData();
    this.workerForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      patronymic: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      date: new FormControl(null, [Validators.required]),
      type: new FormControl({value:0,disabled:false}, [Validators.required]),
    })
    
  }

  async getData(){
    if(!isNullOrUndefined(this.id)){
      try {
        let worker = this.workerService.getOneById(this.id);
        this.worker = await worker;
      } catch (error) {
        console.error(error);
      }
    }else{
      try {
      this.workers = await this.workerService.getAll();
    } catch (error) {
      console.error(error)
    }
    }
    if(this.id != null){
      this.workerForm.patchValue({
      id:this.id,
      name: this.worker.name,
      surname: this.worker.surname,
      patronymic: this.worker.patronymic,
      phone: this.worker.phone,
      email: this.worker.email,
      date: this.worker.date,
      type:this.worker.type
    })
    }
  }

  async addWorker(){
    if(isNullOrUndefined(this.id)){
      let id = this.workerForm.value.id;
    let worker = this.workers.find(work => work.id === id);
    console.log(worker)
    if(worker == undefined){
      let res = await this.workerService.postOne(this.workerForm.value);
      this.router.navigate([this.router.url, res.id])
    }else{
      alert('Сотрудник с таким id уже существует')
    }
    }else{
      await this.workerService.puOne(this.id,this.workerForm.value)
    }
    
  }

  onBackWorkerTable(){
    this.router.navigate(['/workers'])
  }

  async onDeleteWorker(){
    await this.workerService.deleteOneById(this.id);
    this.onBackWorkerTable();
  }

  onAddProfile(){
    this.router.navigate(['/workers/profile'])
  }
}
