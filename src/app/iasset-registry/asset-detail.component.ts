

import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from '@angular/forms';
import { ModelAssetType } from "./model/model-asset-type";
import { ModelAssetInstance } from "./model/model-asset-instance";
import { ModelMaintenance } from "./model/model-maintenance";
import { AssetRegistryService } from "./iasset-registry.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AppComponent } from "../app.component";
import { CookieService } from "ng2-cookies";
import { selectDescriptionFromObject } from "../common/utils";
import { DomSanitizer } from "@angular/platform-browser";

class NewMaintenance {
constructor(
        public maintenanceDate: string,
        public maintenanceDuration: string,
        public maintenanceReason: string,
        public maintenanceCostPlan: string,
        public descriptionPyhsicalChanges: string,
        public descriptionSoftwareChanges: string,
        public listOfInvolvedSuppliers: string,
        public additionalText: string
    ) {}
}

//-------------------------------------------------------------------------------------
// Component
//-------------------------------------------------------------------------------------
@Component({
selector: "asset-detail",
templateUrl: "./asset-detail.component.html",
styleUrls: ["./asset-detail.component.css"]
})

export class AssetDetail implements OnInit {

    // essential view members
    @Input() public instance: ModelAssetInstance;
    public type : ModelAssetType = new ModelAssetType("", "", "", "", "", null);

    // property display members
    public propertyNames : string[] = [];
    public selectedPropertyStream: string = "";

    // maintenance members
    public editMaintenance: boolean = false;
    public newMaintenance: NewMaintenance = new NewMaintenance(null, null, null, null, null, null, null, null);

    public publishForm: FormGroup = new FormGroup({});

    public streamingDataSrc = "http://iasset.salzburgresearch.at:30001/d/iasset-demo-dashboard-analytics/dashboard-for-system-at-srfg-analytics-machineanalytics?orgId=1&refresh=10s&from=now-5m&to=now&var-system=All&var-thing=All&var-client_app=All&var-quantity=All";
    public assetUri = null;
    public assetAAS = null;
    public isLoading = false;
    // ToDo: Retrieve actual number of instances
    availableInstances = "6";
    getMultilingualLabel = selectDescriptionFromObject;

    //-------------------------------------------------------------------------------------
    // Init Functions
    //-------------------------------------------------------------------------------------
    ngOnInit()
    {
        this.route.queryParams.subscribe(params => {
            this.assetUri = params['uri'];
            if (this.assetUri) {
              this.isLoading = true;
              this.registryService.getRepositoryElement(decodeURIComponent(this.assetUri))
              .then(res => {
                this.assetAAS = res;
                if (res.submodels && res.submodels.length > 0) {
                  var count = res.submodels.length;
                  this.assetAAS["submodelsRef"] = [];
                  for (var i=0; i<res.submodels.length; i++) {
                    this.registryService.getRepositoryElement(res.asset.identification.id+"#"+res.submodels[i].idShort)
                    .then(resRef => {
                      this.assetAAS["submodelsRef"].push(resRef);
                      count--;
                      if (count == 0)
                        this.isLoading = false;
                    })
                    .catch(error => {
                      count--;
                      if (count == 0)
                        this.isLoading = false;
                    });
                  }
                }
                else {
                  this.isLoading = false;
                }
              })
              .catch(error => {
                  this.isLoading = false;
              });
            }
        });

        /*
        if(this.instance && this.instance.assetType != null)
        {
            this.registryService.getAssociatedTypeByName(this.instance.assetType)
            .then(assoctype => {
                this.type = assoctype;
                this.propertyNames = this.type.properties.map( item => item.name ).sort();
                this.selectedPropertyStream = this.propertyNames[0];
            });
        }
        */
    }

    constructor(private registryService: AssetRegistryService,
                private router: Router,
                private cookieService: CookieService,
                public route: ActivatedRoute,
                private sanitizer: DomSanitizer,
                public appComponent: AppComponent) {

    }

    //-------------------------------------------------------------------------------------
    // handleSelectedPropertyChange
    //-------------------------------------------------------------------------------------
    handleSelectedPropertyChange(event): void {
        // TODO
    }

    //-------------------------------------------------------------------------------------
    // Delete Asset
    //-------------------------------------------------------------------------------------
    deleteAsset(): void {

        this.registryService.unregisterAssetInstance("12345", this.instance)
            .then(() => {
                this.router.navigate(['dashboard']);
            })
            .catch(() => {
                alert("Error while removing AssetInstance.");
            });
    }

    //-------------------------------------------------------------------------------------
    // Edit Asset
    //-------------------------------------------------------------------------------------
    editAsset(): void {
        alert("not yet implemented")
    }

    //-------------------------------------------------------------------------------------
    // show Maintenance entr field
    //-------------------------------------------------------------------------------------
    showMaintenance(): void {
        this.editMaintenance = !this.editMaintenance;
    }

    //-------------------------------------------------------------------------------------
    // register a maintenance
    //-------------------------------------------------------------------------------------
    addMaintenance(): void {

        var maintenance = new ModelMaintenance(this.newMaintenance.maintenanceDate,
                                              this.newMaintenance.maintenanceDuration,
                                              this.newMaintenance.maintenanceReason,
                                              this.newMaintenance.maintenanceCostPlan,
                                              this.newMaintenance.descriptionPyhsicalChanges,
                                              this.newMaintenance.descriptionSoftwareChanges,
                                              this.newMaintenance.listOfInvolvedSuppliers,
                                              this.newMaintenance.additionalText)

        this.registryService.registerMaintenance(this.instance.name, maintenance)
            .then(newAssetInstance => {
                this.instance = newAssetInstance;
                this.router.navigate(['dashboard']);
            })
            .catch(() => {
                alert("Error while adding maintenance.");
            });

        this.editMaintenance = false;
    }
    //-------------------------------------------------------------------------------------
    // start asset
    //-------------------------------------------------------------------------------------
    startAsset(): void {
        alert("not yet implemented")
    }

    //-------------------------------------------------------------------------------------
    // stop asset
    //-------------------------------------------------------------------------------------
    stopAsset(): void {
        alert("not yet implemented")
    }

    //-------------------------------------------------------------------------------------
    // return to search entries
    //-------------------------------------------------------------------------------------
    returnToSearch(): void {
        this.instance = null;
        window.location.reload();
    }
}
