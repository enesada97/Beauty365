import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

constructor(private httpClient: HttpClient, public translateService: TranslateService) { }
success(message: string){
  this.translateService.get(message).subscribe((mes: string) => {
    let Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'success',
      title: message + '',
      background:'#99FFFF',
    })
  });
}
error(message: string) {
  this.translateService.get(message).subscribe((mes: string) => {
    let Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'error',
      title: message + '',
      background:'#fff',
    })
  });


}
info(message: string) {

  this.translateService.get(message).subscribe((mes: string) => {
    this.translateService.get(message).subscribe((mes: string) => {
      let Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'info',
        title: message +'',
        background:'#fff',
      })
    });
  });

}
warning(message: string) {

  this.translateService.get(message).subscribe((mes: string) => {
    this.translateService.get(message).subscribe((mes: string) => {
      let Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'warning',
        title: message +'',
        background:'#fff',
      })
    });
  });

}
delete(message: string){
  this.translateService.get(message).subscribe((mes: string) => {
    let Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'success',
      title: message + '',
      background:'#FFCC33',
    })
  });
}
}
