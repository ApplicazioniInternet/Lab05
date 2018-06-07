import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { MapComponent } from './map/map.component';
import { ChooseAreaComponent } from './choose-area/choose-area.component';
import { PositionsBoughtComponent } from './positions-bought/positions-bought.component';
import { DialogOverviewComponent } from './choose-area/choose-area.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ChooseAreaComponent,
    PositionsBoughtComponent,
    DialogOverviewComponent,
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
  ],
  providers: [],
  entryComponents: [DialogOverviewComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
