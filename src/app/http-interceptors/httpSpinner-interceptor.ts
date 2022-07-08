import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';

@Injectable()
export class HttpSpinnerInterceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.requestStarted();
    return this.handler(next, req);
  }

  handler(next: HttpHandler, request: HttpRequest<any>) {
    return next.handle(request).pipe(
      tap({
        next: (event) => {
          // 4 response demekmiş orjinalinde farklı bir şey yazıyordu
          if (event.type === 4) {
            this.spinnerService.requestEnded();
          }
        },
        error: (error: HttpErrorResponse) => {
          this.spinnerService.resetSpinner();
          throw error;
        }
      })
    );
  }
}
