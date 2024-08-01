import { Injectable } from '@angular/core';
import { TosterService } from './toster.service';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private toster: TosterService) { }

  public handle<T>(request: Observable<ApiResponse<T>>, 
      success: (d: ApiResponse<T>) => void,
      showSuccess: boolean = false){

    request.subscribe(data => {
      if(data.code == 0){
        success(data)
        if(showSuccess)
          this.toster.success('Операция выполнена успешно')
      }
      else
        this.toster.error("Произошла ошибка: " + data.message)
    })
  }
  
}
