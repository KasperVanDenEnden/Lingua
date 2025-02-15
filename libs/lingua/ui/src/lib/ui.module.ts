import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CardComponent } from "./cards/card/card.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CardComponent
    ],
    declarations: [
        
    ],
    providers: [
    ],
    exports: [
        CardComponent,
    ]
})
export class UiMoodule {}