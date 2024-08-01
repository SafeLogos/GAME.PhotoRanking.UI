import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TosterService {
  private _message: Subject<any> = new Subject<any>();

  public success(text: string){
    this._message.next({text: text, type: 'success'})
  }

  public error(text: string){
    this._message.next({text: text, type: 'error'})
  }

  public getMessage(): Observable<any>{
    return this._message.asObservable()
  }

  constructor() { }
}
