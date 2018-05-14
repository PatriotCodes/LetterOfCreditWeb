import { Component, AfterViewChecked, AfterViewInit, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { IdentityService } from '../services/identity.service';
import { PeerWithPort } from '../peer-with-port';
import { MatDialog } from '@angular/material';
import { PeersWithPortComponent } from '../peers-with-port/peers-with-port.component';

@Component({
  selector: 'app-dashboard-setup',
  templateUrl: './dashboard-setup.component.html',
  styleUrls: ['./dashboard-setup.component.scss']
})
export class DashboardSetupComponent implements AfterViewInit, OnInit {

  angleStart = -360;
  peerMapping = new Array<any>();
  scannedPeers: PeerWithPort[];
  launchText = 'Begin';

  constructor(public identityService: IdentityService, private dialog: MatDialog) { }

  ngOnInit() {
    this.identityService.scanForPeers();
    this.scannedPeers = this.identityService.scannedPeers;
  }

  ngAfterViewInit() {
    var angleStart = -360;

    // jquery rotate animation
    function rotate(li, d) {
      $({ d: angleStart }).animate({ d: d }, {
        step: function (now) {
          $(li)
            .css({ transform: 'rotate(' + now + 'deg)' })
            .find('label')
            .css({ transform: 'rotate(' + (-now) + 'deg)' });
        }, duration: 0
      });
    }

    // show / hide the options
    function toggleOptions(s) {
      $(s).toggleClass('open');
      var li = $(s).find('li');
      var deg = $(s).hasClass('half') ? 180 / (li.length - 1) : 360 / li.length;
      for (var i = 0; i < li.length; i++) {
        var d = $(s).hasClass('half') ? (i * deg) - 90 : i * deg;
        $(s).hasClass('open') ? rotate(li[i], d) : rotate(li[i], angleStart);
      }
    }

    $('.selector button').click(function (e) {
      toggleOptions($(this).parent());
    });

    //setTimeout(function () { toggleOptions('.selector'); }, 100);
  }

  lookupPeer(role: string) {
    let dialogRef = this.dialog.open(PeersWithPortComponent)
    dialogRef.afterClosed().subscribe(result => {
      if (!this.peerMapping.find(peer => peer.role == role)) {
        this.peerMapping.push({ role: role, port: this.identityService.peer.port, name: this.identityService.peer.name });
      }
      if(this.peerMapping.length == 5) {
        this.launchText = 'Launch';
      }
    })
  }

  launchPage(role: string, port: string, event: any) {
    let path: string;

    switch (role) {
      case 'Seller':
        path = '/web/loc/seller';
        break;
      case 'Buyer':
        path = '/web/loc/buyer';
        break;
      case 'Advising Bank':
        path = '/web/loc/advising';
        break;
      case 'Issuing Bank':
        path = '/web/loc/issuing';
        break;
      case 'Central Bank':
        path = '/web/central';
        break;
    }
    let url = "http://localhost:" + port + path;
    window.open(url, "_blank")
    let target = event.target as Element;
    target.innerHTML = "Launched";
    target.setAttribute("class", "disabled");
  }

  launch(event:any) {
    let target = event.target as Element;
    if(target.innerHTML == "Launch") {
      $('.wrap').toggleClass('active');
      $('.wrapper').toggleClass('hidden');
    }
  }
}
