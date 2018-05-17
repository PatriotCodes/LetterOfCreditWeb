import { Component, Input } from '@angular/core';
import { LocService } from './../loc.service';
import 'rxjs/add/operator/switchMap';
import { ShipModalComponent } from '../modals/ship-modal.component';
import { StatusService } from '../services/status.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.css']
})
export class ShipComponent {
  @Input() id: string;

  constructor(private locService: LocService, private modalComponent: ShipModalComponent, private statusService: StatusService) { }

  confirm() {
    this.locService.shipGoods(this.id);
    this.statusService.shipAnimation = true;
    Observable.interval(1300).subscribe(x => {
      this.statusService.shipAnimation = false;
      this.modalComponent.close();
    });
  }

}
