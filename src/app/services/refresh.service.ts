import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class RefreshService {

  // Observable sources
  private confirmedSource = new Subject<boolean>();

  // Observable string streams
  missionConfirmed$ = this.confirmedSource.asObservable();

  confirmMission() {
    this.confirmedSource.next(true);
  }

constructor() { }

}
