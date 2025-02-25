import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CardComponent } from "./cards/card/card.component";
import { ModalDeleteComponent } from "./modals/modal-delete/modal-delete.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CardComponent,
        ModalDeleteComponent
    ],
    declarations: [
        
    ],
    providers: [
    ],
    exports: [
        CardComponent,
        ModalDeleteComponent
    ]
})
export class UiModule {}