import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import {
  catchError,
  concatMap,
  retryWhen,
  throwError,
  of,
  Observable,
} from 'rxjs';
import { AlertifyService } from './alertify.service';
import { ErrorCode } from '../Enums/enums';

// ✅ Move function above interceptor to prevent hoisting issues
function retryRequest(
  errors: Observable<HttpErrorResponse>,
  retryCount: number
): Observable<unknown> {
  return errors.pipe(
    concatMap((checkErr: HttpErrorResponse, count: number) => {
      if (count <= retryCount) {
        switch (checkErr.status) {
          case ErrorCode.serverDown:
            return of(checkErr);
          case ErrorCode.unauthorised:
            return of(checkErr);
        }
      }
      return throwError(() => checkErr); // Do not retry for other errors
    })
  );
}

export const HttpErrorInterceptorService: HttpInterceptorFn = (
  request: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const alertify = inject(AlertifyService); // Inject service manually
  console.log('HTTP Request started');

  return next(request).pipe(
    retryWhen((errors) => retryRequest(errors, 5)), // ✅ Call function correctly
    catchError((error: HttpErrorResponse) => {
      console.log(error);
      const errorMessage = setError(error);
      alertify.error(errorMessage);
      return throwError(() => new Error(errorMessage));
    })
  );
};

function setError(error: HttpErrorResponse): string {
  let errorMessage = 'Unknown error occurred';

  if (error.error instanceof ErrorEvent) {
    // Client-side error
    errorMessage = error.error.message;
  } else {
    // Server-side error
    errorMessage = error.message || 'Server error occurred';
  }

  return errorMessage;
}
