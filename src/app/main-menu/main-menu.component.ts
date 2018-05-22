import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ActivatedRoute } from '@angular/router';
import { LocService } from '../loc.service';

@Component({
  selector: 'main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  bsModalRef: BsModalRef;
  buyer: string;
  issuing: string;
  advising: string;
  seller: string;
  dashboard: string;
  me: string;
  port: number;
  nodes: string[];

  constructor(private modalService: BsModalService,
              private route: ActivatedRoute,
              private locService: LocService) { }

  getMe(): void {
    this.locService.getMe().then(me => this.me = me.name)
  }

  ngOnInit() {
    let current = this.route.snapshot.url[0].toString();
    switch (current) {
      case 'buyer': this.buyer = 'btn-info';
        break;
      case 'issuing': this.issuing = 'btn-info';
        break;
      case 'advising': this.advising = 'btn-info';
        break;
      case 'seller': this.seller = 'btn-info';
        break;
      case 'dashboard': this.dashboard = 'btn-info';
        break;
    }
    this.getMe();

    this.nodes = new Array<string>(4);
    this.nodes[0] = 'buyer';
    this.nodes[1] = 'issuing';
    this.nodes[2] = 'advising';
    this.nodes[3] = 'seller';
  }
}
