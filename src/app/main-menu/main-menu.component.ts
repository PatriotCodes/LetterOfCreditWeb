import { Component, OnInit } from '@angular/core';
import { ApplyForLocComponent } from './../apply-for-loc/apply-for-loc.component'
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ApplyModalComponent } from './../modals/apply-modal.component';
import { ActivatedRoute, UrlSegment } from '@angular/router';

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

  constructor(private modalService: BsModalService,
              private route: ActivatedRoute) { }

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
  }

}
