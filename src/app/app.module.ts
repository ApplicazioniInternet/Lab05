import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { MapComponent } from './customer/map/map.component';
import { ChooseAreaComponent } from './customer/choose-area/choose-area.component';
import { PositionsBoughtComponent } from './customer/positions-bought/positions-bought.component';
import { DialogOverviewComponent } from './customer/choose-area/choose-area.component';

import { ReactiveFormsModule } from '@angular/forms';
import { CustomerComponent } from './customer/customer.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';

import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const appRoutes: Routes = [
    { path: 'customer', component: CustomerComponent },
    { path: '', redirectTo: '/customer', pathMatch: 'full' },
    { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ChooseAreaComponent,
    PositionsBoughtComponent,
    DialogOverviewComponent,
    CustomerComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    PagenotfoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    LeafletModule.forRoot(),
    LeafletModule,
    LeafletDrawModule.forRoot(),
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes,
        { enableTracing: true }
        )
  ],
  providers: [],
  entryComponents: [DialogOverviewComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
