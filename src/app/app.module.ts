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
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { ReactiveFormsModule } from '@angular/forms';
import { CustomerComponent } from './customer/customer.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';

import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ChoosePositionComponent } from './user/choose-position/choose-position.component';
import { DialogOverviewComponent } from './shared-components/dialog-overview/dialog-overview.component';
import { ToolbarComponent } from './shared-components/toolbar/toolbar.component';
import { UserMapComponent } from './user/user-map/user-map.component';
import { UpdateFileComponent } from './shared-components/update-file/update-file.component';
import { AuthGuardService } from './authorization/auth-guard.service';

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'user', component: UserComponent, canActivate: [AuthGuardService] },
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuardService] },
    { path: 'customer', component: CustomerComponent},
    { path: 'login', component: LoginComponent},
    { path: '**', component: PagenotfoundComponent }
];

export function tokenGetter() {
    return localStorage.getItem('access_token');
}

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
    ChoosePositionComponent,
    DialogOverviewComponent,
    ToolbarComponent,
    UserMapComponent,
    UpdateFileComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    LeafletModule.forRoot(),
    LeafletModule,
    HttpClientModule,
    JwtModule.forRoot({
        config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: ['localhost:8080'],
            blacklistedRoutes: ['localhost:8080/oauth/']
        }
    }),
    FormsModule,
    LeafletDrawModule.forRoot(),
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  entryComponents: [DialogOverviewComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
