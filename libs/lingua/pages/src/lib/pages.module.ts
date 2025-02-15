import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        LoginComponent
    ],
    providers: [
    ],
    exports: [
        LoginComponent,
        RegisterComponent
    ]
})
export class PagesModule {}