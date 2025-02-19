import { NgModule } from "@angular/core";
import { FooterComponent, HeaderComponent, NavComponent } from "@lingua/common";
import { CardComponent } from "@lingua/ui";

@NgModule({
    imports: [
        NavComponent,
        FooterComponent,
        HeaderComponent,
        CardComponent,
    ],
    declarations: [],
    providers: [],
    exports: [
        NavComponent,
        FooterComponent,
        HeaderComponent,
        CardComponent
    ]
})
export class LinguaCommonModule {}