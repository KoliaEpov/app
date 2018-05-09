import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'localhost:8001', options: {} };

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { OrderDetailComponent } from './order-detail-component/order-detail-component.component';

const appRoutes: Routes = [
  { path: '', component: TableComponent },
  { path: ':id', component: OrderDetailComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    OrderDetailComponent
  ],
  imports: [
    BrowserModule,
    NgxDatatableModule,
    FormsModule,
    SocketIoModule.forRoot(config),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
