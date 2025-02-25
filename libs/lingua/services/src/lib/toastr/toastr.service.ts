import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private toastr = inject(ToastrService);

  success(message: string) {
    this.toastr.success(message, 'Success');
  }

  error(message: string) {
    this.toastr.error(message, 'Error!');
  }

  info(message: string) {
    this.toastr.info(message, 'Info');
  }

  warning(message: string) {
    this.toastr.warning(message, 'Warning');
  }

  custom(message: string, title: string) {
    this.toastr.show(message, title);
  }
}
