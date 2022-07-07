import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpSpinnerInterceptor } from './httpSpinner-interceptor';

export const httpInterceptProviders = [{ provide: HTTP_INTERCEPTORS, useClass: HttpSpinnerInterceptor, multi: true }];
