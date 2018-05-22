import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LocService } from './../loc.service';
import { ActivatedRoute } from '@angular/router';
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
              private shepherdService: ShepherdService, private titleService: Title,
              @Inject(DOCUMENT) private document: Document) {
   }

  getMe(): void {
    this.locService.getMe().then(me => this.setup(me.name));
  }

  setup(me: string) {
    this.me = me;
    this.titleService.setTitle(me);
  }

  ngOnInit() {
    this.getMe();
  }
}
