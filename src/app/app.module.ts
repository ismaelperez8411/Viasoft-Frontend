import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastrModule } from "ngx-toastr";

import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";

import { AppComponent } from "./app.component";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { InvoiceComponent } from "./invoice/invoice.component";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { InputTextModule } from "primeng/inputtext";
import { MultiSelectModule } from "primeng/multiselect";
import { AutoCompleteModule } from "primeng/autocomplete";
import { DateformatPipe } from './pipes/dateformat.pipe';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    TableModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    MultiSelectModule,
    AutoCompleteModule,
    ToastrModule.forRoot(),
  ],
  declarations: [AppComponent, AdminLayoutComponent, InvoiceComponent, DateformatPipe],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
