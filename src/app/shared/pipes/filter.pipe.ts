import { Pipe, PipeTransform } from '@angular/core';
import { MyWorker } from '../models/worker.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(workers: MyWorker[], filtrStr: string): MyWorker[] {
    if (filtrStr == '') {
      return workers;
    } else {
      let arrStr = filtrStr.split(' ');
      let surname = arrStr[0];
      let name = arrStr[1];
    
      if(name == undefined || name == ''){
        let newWorkers = workers.filter(
          worker => worker.surname.toLowerCase().indexOf(surname.toLowerCase()) !== -1
        );
        return newWorkers;
      }else{
        let newWorkers = workers.filter(
        worker => worker.surname.toLowerCase().indexOf(surname.toLowerCase()) !== -1
      );
      let newWorkersNext = newWorkers.filter(
        worker => worker.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
      );

      console.log(arrStr)
      
      return newWorkersNext;
      }
      
    }

  }

}
