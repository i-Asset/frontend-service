import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CookieService } from 'ng2-cookies';
import { TranslateService } from '@ngx-translate/core';
//import { DistributionNetworkService } from 'openapi3-gen/api/distributionNetwork';

@Component({
  selector: 'distnet-dashboard',
  templateUrl: './distnet.dashboard.component.html',
  styleUrls: ['./distnet.dashboard.component.css']
})
export class DistnetDashboardComponent {

  public companies = [];

  
  constructor(
  //  private distributionService: DistributionNetworkService,
    public translate: TranslateService,
    private cookieService: CookieService) {
// empty constructor
}
}
