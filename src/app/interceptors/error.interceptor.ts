import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { TosterService } from '../services/toster.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toster: TosterService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    

    return next.handle(req)
           .pipe(
                 catchError((error: HttpErrorResponse) => {
                    this.toster.error("Произошла непредвиденная ошибка")
                    return throwError(error.message);
                 })
           )
  }
}
