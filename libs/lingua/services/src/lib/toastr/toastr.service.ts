import { Injectable, inject  } from "@angular/core"; 
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private toastr = inject(ToastrService)
}