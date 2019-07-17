import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import {Storage} from '@ionic/storage';
import {catchError, map} from 'rxjs/internal/operators';
import {Observable, throwError} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  constructor(public http: HttpClient,
              private storage: Storage) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.storage.get('age').then((token) => {
      const clonedReq = request.clone({
        setHeaders: {
          Accept: `application/json`,
          'Content-Type': `application/json`,
          Authorization: `Bearer ${token}`
        }
      });
      console.log(clonedReq);
      return next.handle(clonedReq).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            console.log('event--->>>', event);
          }
          console.log(event);
          return event;
        }),
        catchError(error => {
          // Perhaps display an error for specific status codes here already?
          const errorMsg = error.message;

          if (error.status === 401) {
            // this.navCtrl.setRoot(LoginPage, {}, {animate: true, direction: 'forward'});
          }

          // Pass the error to the caller of the function
          return throwError(error);
        })
      );
    });

    return throwError('error');

  }

  //   this.storage.get('token').then((token) => {
  //     console.log('Your token is ', token);
  //
  //     if (token) {
  //       console.log(token);
  //       request = request.clone({
  //         setHeaders: {
  //           'Authorization': `Bearer ${token}`
  //         }
  //       });
  //     }
  //
  //     if (!request.headers.has('Content-Type')) {
  //       request = request.clone({
  //         setHeaders: {
  //           'content-type': 'application/json'
  //         }
  //       });
  //     }
  //
  //     request = request.clone({
  //       headers: request.headers.set('Accept', 'application/json')
  //     });
  //
  //     return next.handle(request).pipe(
  //       // map((event: HttpEvent<any>) => {
  //       //   if (event instanceof HttpResponse) {
  //       //     console.log('event--->>>', event);
  //       //   }
  //       //   console.log(event);
  //       //   return event;
  //       // }),
  //       catchError((error: HttpErrorResponse) => {
  //         if (error.status === 401) {
  //           // if (error.error.success === false) {
  //           //   this.presentToast('Login failed');
  //           // } else {
  //           //   this.router.navigate(['login']);
  //           // }
  //         }
  //         return throwError(error);
  //       }));
  //   });
  //
  //   return throwError('Error');
  // }
}
