import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHttp } from './basehttp.service';

@Injectable({
  providedIn: 'root'
})
export class WorkersService extends BaseHttp{

  constructor(public http:HttpClient) {
    super(http,'Workers');
   }
}
