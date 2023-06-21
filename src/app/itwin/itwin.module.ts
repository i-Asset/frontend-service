import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItwinRoutingModule } from './itwin-routing.module';
import { RepositoryModule } from './repository/repository.module';
import { DistnetModule } from './distnet/distnet.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RepositoryModule,
    DistnetModule,
    ItwinRoutingModule
  ]
})
export class ItwinModule { }
