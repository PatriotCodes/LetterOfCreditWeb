import { Component, OnInit, DoCheck, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DashboardSellerComponent } from '../dashboard-seller/dashboard-seller.component';
import { PortProviderService } from '../services/port-provider.service';
import { IdentityService } from '../services/identity.service';
import { DashboardBuyerComponent } from '../dashboard-buyer/dashboard-buyer.component';
import { DashboardAdvisingComponent } from '../dashboard-advising/dashboard-advising.component';
import { DashboardIssuerComponent } from '../dashboard-issuer/dashboard-issuer.component';
import { CashIssuanceComponent } from '../cash-issuance/cash-issuance.component';

@Component({
  selector: 'app-static-map',
  templateUrl: './static-map.component.html',
  styleUrls: ['./static-map.component.scss']
})
export class StaticMapComponent implements OnInit, DoCheck {
  expandTxt = '>';
  shrinkTxt = '<';
  buttonTxt = this.expandTxt;
  unfolded = false;

  @ViewChildren('marker') el: QueryList<any>;

  ngDoCheck(): void {
    let body = document.getElementsByTagName('body')[0];
    body.classList.remove('background-image-seller');
    body.classList.remove('background-image-buyer');
    body.classList.remove('background-image-issuing');
    body.classList.remove('background-image-advising');
  }

  constructor(private router: Router, private dialog: MatDialog,
    private portService: PortProviderService, private identityService: IdentityService) { }

  ngOnInit() {

    // Increments the delay on each item.
    $('.rolldown-list li').each(function () {
      let delay = ($(this).index() / 4) + 's';
      $(this).css({
        webkitAnimationDelay: delay,
        mozAnimationDelay: delay,
        animationDelay: delay
      });
    });

    let totalHeight = 0,
      dropDownHeight = $('.dropdown-menu').outerHeight();

    $('.dropdown-menu').children().each(function () {
      totalHeight = totalHeight + $(this).outerHeight(true);
    });
    $('.trig').click(function () {
      if (dropDownHeight === 0) {
        $('.dropdown-menu').css('height', totalHeight + 'px');
        dropDownHeight = totalHeight;

      } else {
        $('.dropdown-menu').css('height', '0');
        dropDownHeight = 0;
      }
    });

    this.expandMenu();
  }

  expandMenu() {
    $(this).toggleClass('change');
    $('.sidenav').toggleClass('sidenav-toggle');
    $('.container').toggleClass('container-toggle');
    if (!this.unfolded) {
      $('#myList').removeClass('rolldown-list');
      setTimeout(function () {
        $('#myList').addClass('rolldown-list');
      }, 1);
      this.unfolded = true;
    }
    if (this.buttonTxt === this.expandTxt) {
      this.buttonTxt = this.shrinkTxt;
    } else {
      this.buttonTxt = this.expandTxt;
    }
  }

  launchSeller() {
    this.portService.current = 10016;
    this.identityService.current = 'seller';
    this.dialog.open(DashboardSellerComponent, { width: '85%', height: '85%' });
  }

  launchBuyer() {
    this.portService.current = 10013;
    this.identityService.current = 'buyer';
    this.dialog.open(DashboardBuyerComponent, { width: '85%', height: '85%' });
  }

  launchAdvising() {
    this.portService.current = 10010;
    this.identityService.current = 'advising';
    this.dialog.open(DashboardAdvisingComponent, { width: '85%', height: '85%' });
  }

  launchIssuing() {
    this.portService.current = 10007;
    this.identityService.current = 'issuing';
    this.dialog.open(DashboardIssuerComponent, { width: '85%', height: '85%' });
  }

  launchCentral() {
    this.portService.current = 10019;
    this.dialog.open(CashIssuanceComponent, { width: '85%', height: '85%' });
  }

  launchAdvisingCash() {
    this.portService.current = 10010;
    this.dialog.open(CashIssuanceComponent, { width: '85%', height: '85%' });
  }

  launchIssuingCash() {
    this.portService.current = 10007;
    this.dialog.open(CashIssuanceComponent, { width: '85%', height: '85%' });
  }

  launchNotary() {
    this.portService.current = 10019;
  }
}