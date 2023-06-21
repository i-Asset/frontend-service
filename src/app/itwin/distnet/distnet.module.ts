import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonModule } from "../../common/common.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ItwinRoutingModule } from '../itwin-routing.module';
import { DistnetComponent } from './distnet.component';
import { DistnetDashboardComponent } from './distnet.dashboard.component';


@NgModule({
  declarations: [
    DistnetComponent,
    DistnetDashboardComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    FormsModule,
    ReactiveFormsModule,
    ItwinRoutingModule,
    NgbModule
]
})
export class DistnetModule { }
