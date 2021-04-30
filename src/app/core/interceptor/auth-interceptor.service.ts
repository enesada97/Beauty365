import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from '../service/system-service/auth.service';
import { Router } from '@angular/router';
import { SweetalertService } from '../service/sweetalert.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private _router:Router,private sweetAlert:SweetalertService,private translate:TranslateService) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    var lang = localStorage.getItem("lang") || "tr-TR"

    if (!req.url.endsWith("api/Auth/login")) {
      req = req.clone({
        setHeaders: {
          'Accept-Language': lang,
          'Authorization': `Bearer ${localStorage.getItem('token')}`

        },
        responseType: req.method == "DELETE" ? "text" : req.responseType
      });

    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status===401){
          let timerInterval
          Swal.fire({
            title: this.translate.instant('SecureSessionExpired'),
            html: this.translate.instant('RedirectsToLoginPage')+' <b></b>.',
            timer: 1000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading()
              timerInterval = setInterval(() => {
                const content = Swal.getContent()
                if (content) {
                  const b = content.querySelector('b')
                  if (b) {
                    b.textContent = Swal.getTimerLeft().toString()
                  }
                }
              }, 100)
            },
            willClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              this._router.navigateByUrl('/authentication/signin');
            }
          })
        }
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = this.translate.instant('Error')+":"+`${error.error.message}`;
        } else {
          // server-side error
          errorMessage = error.error;
        }
        this.sweetAlert.error(errorMessage);
        return throwError(errorMessage);
      })
    )
  }
}
