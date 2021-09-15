/*
* Copyright 2020
* SRDC - Software Research & Development Consultancy; Ankara; Turkey
In collaboration with
* SRFG - Salzburg Research Forschungsgesellschaft mbH; Salzburg; Austria
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { PublishMode } from "../catalogue/model/publish/publish-mode";
import { ModelAssetType } from "./model/model-asset-type";
import { ModelProperty } from "./model/model-property";
import { AssetRegistryService } from "./iasset-registry.service";
import { Router } from "@angular/router";
import { CallStatus } from "../common/call-status";
import { CookieService } from "ng2-cookies";

class NewAssetType {
constructor(
        public name: string,
        public shortID: string,
        public semanticID: string,
        public description: string,
        public certificate: string,
        public properties: ModelProperty[]
    )
    {
        this.properties = [];
    }
}

class NewProperty {
constructor(
        public name: string,
        public shortID: string,
        public semanticID: string,
        public description: string,
        public dataSpecification: string,
        public properties: string
    ) {}
}

//-------------------------------------------------------------------------------------
// Component
//-------------------------------------------------------------------------------------
@Component({
selector: "type-registry",
templateUrl: "./type-registry.component.html",
styleUrls: ["./type-registry.component.css"]
})

export class AssetTypeRegistry implements OnInit {

    public aasUpload = "";
    public companyID = null;
    public publishMode: PublishMode;
    public publishingGranularity: "manually" | "automatically" = "manually";
    public newAssetType: NewAssetType = new NewAssetType(null, null, null, null, null, null);
    public newProperty: NewProperty = new NewProperty(null, null, null, null, null, null);
    aasCallStatus: CallStatus = new CallStatus();

    uploadAAS() {
      this.aasCallStatus.submit();
      this.registryService.registerAAS(this.aasUpload)
      .then(res => {
        this.aasCallStatus.callback("Registration done.", true);
        this.aasUpload = "";
      })
      .catch(error => {
        this.aasCallStatus.error("Error while registering asset type.", error);
      });
    }

    //-------------------------------------------------------------------------------------
    // canDeactivate
    //-------------------------------------------------------------------------------------
    canDeactivate(): boolean {
            return true;
    }

    //-------------------------------------------------------------------------------------
    // onSelectTab
    //-------------------------------------------------------------------------------------
    onSelectTab(event: any, id: any) {
        event.preventDefault();
        if (id === "singleUpload") {
            this.publishingGranularity = "manually";
        } else {
            this.publishingGranularity = "automatically";
        }
    }

    //-------------------------------------------------------------------------------------
    // add a property
    //-------------------------------------------------------------------------------------
    addProperty(): void {

        this.newAssetType.properties.push(new ModelProperty(this.newProperty.name,
                                                            this.newProperty.shortID,
                                                            this.newProperty.semanticID,
                                                            this.newProperty.description,
                                                            this.newProperty.dataSpecification,
                                                            this.newProperty.properties));
    }

    //-------------------------------------------------------------------------------------
    // remove a property
    //-------------------------------------------------------------------------------------
    removeProperty(property: ModelProperty): void {

        const index = this.newAssetType.properties.indexOf(property, 0);
        if (index > -1) {
            this.newAssetType.properties.splice(index, 1);
        }
    }

    //-------------------------------------------------------------------------------------
    // add asset type
    //-------------------------------------------------------------------------------------
    addAssetType(): void {

        var type = new ModelAssetType(this.newAssetType.name,
                                      this.newAssetType.shortID,
                                      this.newAssetType.semanticID,
                                      this.newAssetType.description,
                                      this.newAssetType.certificate,
                                      this.newAssetType.properties)

        // add to backend
        this.registryService.registerAssetType("12345", type)
            .then(addedAssetType => {
                this.router.navigate(['dashboard']);
            })
            .catch(() => {
                alert("Error while adding AssetType.");
            });
    }

    //-------------------------------------------------------------------------------------
    // Init Functions
    //-------------------------------------------------------------------------------------
    ngOnInit() {
        this.companyID = this.cookieService.get("company_id");
    }

    constructor(private registryService: AssetRegistryService,
                private cookieService: CookieService,
                private router: Router)
    {

    }
}
