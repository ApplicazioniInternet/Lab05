import { Component, OnInit } from '@angular/core';
import { Position } from '../../position';
import { PositionService } from '../../position.service';

@Component({
  selector: 'app-positions-bought',
  templateUrl: './positions-bought.component.html',
  styleUrls: ['./positions-bought.component.css']
})
export class PositionsBoughtComponent implements OnInit {
  positions: Position[] = new Array<Position>();

  constructor(private positionService: PositionService) { }

  ngOnInit() {
    this.positionService.newPositionsBought.subscribe(positionBought => {
      this.positions = []; // Lo reinizializzo onde evitare problemi
      positionBought.forEach(element => {
        const pos = new Position(element.id, element.longitude, element.latitude, element.timestamp * 1000, element.userId);
        this.positions.push(pos);
      });
    });

    this.positionService.getPositionsBought().subscribe(positions => { // Questo viene chiamato solo alla creazione
      positions.forEach(element => {
        const pos = new Position(element.id, element.longitude, element.latitude, element.timestamp * 1000, element.userId);
        this.positions.push(pos);
      });
    });
  }

  getDate(timestamp: number): string {
    return new Date(timestamp).toLocaleString();
  }
}
