import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { IdentityService } from '../services/identity.service';
import { MatDialog } from '@angular/material';
import { PeersComponent } from '../peers/peers.component';
import { PeerWithPort } from '../peer-with-port';
import { PeersWithPortComponent } from '../peers-with-port/peers-with-port.component';

@Component({
  selector: 'app-dashboard-launch',
  templateUrl: './dashboard-launch.component.html',
  styleUrls: ['./dashboard-launch.component.scss']
})
export class DashboardLaunchComponent implements OnInit {

  currentStep: number = 0;
  peerMapping: object[] = new Array<object>();
  scannedPeers: PeerWithPort[];

  constructor(public identityService: IdentityService, private dialog: MatDialog) { }

  ngOnInit() {
    this.identityService.scanForPeers();
    this.scannedPeers = this.identityService.scannedPeers;
  }

  moveForward() {
    this.currentStep++;
  }

  moveBack() {
    if(this.currentStep > 0)
    {
      this.currentStep--;
    }
  }

  lookupPeer(role: string) {
    let dialogRef = this.dialog.open(PeersWithPortComponent)
    dialogRef.afterClosed().subscribe(result => {
      this.peerMapping.push({role: role, port: this.identityService.peer.port});
      this.moveForward();
    })
  }
}
