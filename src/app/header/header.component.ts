import { Component, OnInit } from '@angular/core';
import { Party } from './../party'
import { LocService } from './../loc.service'
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { ShepherdService } from '../services/shepherd.service';
import { IShepherdTourOptions, IShepherdTourStep } from '../interfaces';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  me: string;
  port: number;
  options: IShepherdTourOptions;
  step: IShepherdTourStep;

  constructor(private locService: LocService, private route: ActivatedRoute,
              private shepherdService: ShepherdService, private titleService: Title) {
   }

  getMe(): void {
    let id = this.route.snapshot.url[0].toString();
    this.locService.getMe(id).then(me => this.setup(me.name))
  }

  setup(me: string) {
    this.me = me;
    this.titleService.setTitle(me);
  }

  ngOnInit() {
    this.getMe();
  }
}
