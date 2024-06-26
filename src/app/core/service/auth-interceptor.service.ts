import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';
import { LoadingService } from './loading.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private messageService: MessageService,
    private loadingService: LoadingService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loadingService.show();
    const clonedRequest = request.clone({
      setHeaders: {
        'X-Api-Key': environment.apiKey,
      },
    });

    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.messageService.add({
            severity: 'error',
            detail: 'Email e/ou senha incorretos',
          });
        } else if (error.status === 500) {
          this.messageService.add({
            severity: 'error',
            detail: 'Erro de servidor. Tente novamente mais tarde.',
          });
        } else {
          this.messageService.add({
            severity: 'error',
            detail: 'Ocorreu um erro. Tente novamente.',
          });
        }
        return throwError(() => new Error(error.message));
      }),
      finalize(() => {
        this.loadingService.hide();
      })
    );
  }
}
