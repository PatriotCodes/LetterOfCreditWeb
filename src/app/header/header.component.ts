import { Component, OnInit } from '@angular/core';
import { Party } from './../party'
import { LocService } from './../loc.service'
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { ShepherdService } from '../services/shepherd.service';
import { IShepherdTourOptions, IShepherdTourStep } from '../interfaces';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  cordaImage: string;
  me: string;
  port: number;
  options: IShepherdTourOptions;
  step: IShepherdTourStep;

  constructor(private locService: LocService, private route: ActivatedRoute,
              private shepherdService: ShepherdService) {
    this.cordaImage = 'assets/corda.png'
   }

  getMe(): void {
    let id = this.route.snapshot.url[0].toString();
    this.locService.getMe(id).then(me => this.me = me.name)
  }

  getPort(): void {
    let id = this.route.snapshot.url[0].toString();
    this.port = this.locService.getPort(id);
  }

  ngOnInit() {
    this.getMe();
    this.getPort();
  }
}
