import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AssetAdministrationShellDirectoryInterfaceForConnectorService } from './api/assetAdministrationShellDirectoryInterfaceForConnector.service';
import { AssetAdministrationShellEnvironmentAPIService } from './api/assetAdministrationShellEnvironmentAPI.service';
import { AssetAdministrationShellEnvironmentSerializationAPIService } from './api/assetAdministrationShellEnvironmentSerializationAPI.service';
import { AssetAdministrationShellRepositoryInterfaceForConnectorService } from './api/assetAdministrationShellRepositoryInterfaceForConnector.service';
import { AssetAdministrationShellRepositoryInterfaceSPECService } from './api/assetAdministrationShellRepositoryInterfaceSPEC.service';
import { LookupDependencyControllerService } from './api/lookupDependencyController.service';
import { SubmodelRepositoryInterfaceConnectorService } from './api/submodelRepositoryInterfaceConnector.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    AssetAdministrationShellDirectoryInterfaceForConnectorService,
    AssetAdministrationShellEnvironmentAPIService,
    AssetAdministrationShellEnvironmentSerializationAPIService,
    AssetAdministrationShellRepositoryInterfaceForConnectorService,
    AssetAdministrationShellRepositoryInterfaceSPECService,
    LookupDependencyControllerService,
    SubmodelRepositoryInterfaceConnectorService ]
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
