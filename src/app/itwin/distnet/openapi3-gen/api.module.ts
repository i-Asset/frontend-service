import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { ClientAppRequestService } from './api/clientAppRequest.service';
import { DatastreamRequestService } from './api/datastreamRequest.service';
import { DatastreamSubscriptionRequestService } from './api/datastreamSubscriptionRequest.service';
import { DistributionNetworkService } from './api/distributionNetwork.service';
import { StreamAppControlRequestService } from './api/streamAppControlRequest.service';
import { StreamAppRequestService } from './api/streamAppRequest.service';
import { SystemRequestService } from './api/systemRequest.service';
import { ThingRequestService } from './api/thingRequest.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    ClientAppRequestService,
    DatastreamRequestService,
    DatastreamSubscriptionRequestService,
    DistributionNetworkService,
    StreamAppControlRequestService,
    StreamAppRequestService,
    SystemRequestService,
    ThingRequestService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
