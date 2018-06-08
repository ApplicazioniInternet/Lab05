import {Component, NgZone, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_TOOLTIP_DEFAULT_OPTIONS, MatSnackBar, MatTooltipDefaultOptions} from '@angular/material';
import {FeatureGroup, latLng, latLngBounds, Map, Marker, marker, Polygon, tileLayer} from 'leaflet';
import {PositionService} from '../../position.service';

export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
    showDelay: 500,
    hideDelay: 100,
    touchendHideDelay: 100,
};

@Component({
  selector: 'app-user-map',
  templateUrl: './user-map.component.html',
  styleUrls: ['./user-map.component.css'],
  providers: [
      { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults }
  ],
  encapsulation: ViewEncapsulation.None,
})
export class UserMapComponent implements OnInit {
    // Coordinate di Torino [45.116177, 7.742615] se ci interessa

    LAYER_OSM = tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 });

    options;
    editableLayers;
    drawOptions;
    map: Map;
    polygon: Polygon = undefined;

    constructor(private positionService: PositionService, public snackBar: MatSnackBar, private zone: NgZone) {
    }

    ngOnInit() {
        // Opzioni per il setup iniziale della mappa: dove è centrata, quanto è lo zoom iniziale, il tema del background
        this.options = {
            layers: [this.LAYER_OSM],
            zoom: 10,
            maxZoom: 19,
            minZoom: 1,
            center: latLng(45.116177, 7.742615),
            maxBounds: latLngBounds(latLng(90, 180), latLng(-90, -180))
        };

        this.drawOptions = {
            position: 'bottomleft',
            draw: {
                marker: false,
                polyline: false,
                polygon: true,
                circle: false,
                rectangle: false,
                circlemarker: false,
            },
            edit: {
                featureGroup: this.editableLayers,
                edit: false,
                remove: true
            }
        };
    }

    // Funzione che mi serve per salvarmi la mappa in una variabile locale quando so che è stato tutto inizializzato
    onMapReady(map: Map): void {
        this.map = map;
        this.editableLayers = new FeatureGroup();
        this.map.addLayer(this.editableLayers);
    }

    // Apri la snack bar e fai vedere un messaggio con un bottoncino di fianco
    openSnackBar(message: string, action: string) {
        this.zone.run(() => {
            this.snackBar.open(message, action, {
                duration: 2000,
            });
        });
    }
}
