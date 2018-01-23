import { Component, OnInit } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { Stats } from './../stats'
import { LocService } from './../loc.service'

@Component({
  selector: 'finances',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.css']
})

export class FinancesComponent implements OnInit {
  stats: Stats = new Stats();
  // Pie
  public pieChartLabels: string[] = ['Awaiting Approval', 'Active', 'Awaiting Payment'];
  public pieChartData: number[] = [1, 1, 1];
  public pieChartType = 'pie';

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['2015', '2016', '2017'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Expired'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Rejected'}
  ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }
  public chartHovered(e: any): void {
    console.log(e);
  }

  constructor(private locService: LocService) { }

  ngOnInit() {
    this.locService.getStats().then(stats => this.stats = stats);
  }

}
