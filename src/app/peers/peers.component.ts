import { Component, OnInit } from '@angular/core';
import { IdentityService } from '../services/identity.service';
import { Peer } from '../peer';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-peers',
  templateUrl: './peers.component.html',
  styleUrls: ['./peers.component.scss']
})
export class PeersComponent implements OnInit {
  peers: Peer[];

  constructor(
    private identityService: IdentityService,
    public dialogRef: MatDialogRef<PeersComponent>) { }

  ngOnInit() {
    this.peers = new Array<Peer>();
    this.identityService.getPeers().then(response => this.peers = new Peer().deserialize(response.json()).peers);
  }

  setPeer(name: string) {
    this.identityService.peer = name;
    this.dialogRef.close();
  }
}
