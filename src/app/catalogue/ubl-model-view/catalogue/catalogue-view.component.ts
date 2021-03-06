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

import { Component, OnInit, ViewChild } from "@angular/core";
import { CookieService } from 'ng2-cookies';
import { CatalogueService } from "../../catalogue.service";
import { CallStatus } from "../../../common/call-status";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { PublishService } from "../../publish-and-aip.service";
import { CategoryService } from "../../category/category.service";
import { isLogisticsService, isTransportService } from '../../../common/utils';
import { BPDataService } from "../../../bpe/bp-view/bp-data-service";
import { UserService } from "../../../user-mgmt/user.service";
import { CompanySettings } from "../../../user-mgmt/model/company-settings";
import { CataloguePaginationResponse } from '../../model/publish/catalogue-pagination-response';
import { Item } from '../../model/publish/item';
import { selectDescription, selectName } from '../../../common/utils';
import { ItemProperty } from '../../model/publish/item-property';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { CATALOGUE_LINE_SORT_OPTIONS } from '../../model/constants';
import { Catalogue } from '../../model/publish/catalogue';
import { CatalogueLine } from "../../model/publish/catalogue-line";
import { TranslateService } from '@ngx-translate/core';
import { DeleteExportCatalogueModalComponent } from "./delete-export-catalogue-modal.component";

@Component({
    selector: 'catalogue-view',
    templateUrl: './catalogue-view.component.html',
    styles: ['.dropdown-toggle:after{content: initial}'],
    providers: [CookieService]
})

export class CatalogueViewComponent implements OnInit {

    catalogueResponse: CataloguePaginationResponse;
    settings: CompanySettings;

    // available catalogue lines with respect to the selected category
    catalogueLinesWRTTypes: any = [];
    // catalogue lines which are available to the user after search operation
    catalogueLinesArray: any = [];

    // categories
    categoryNames: any = [];
    selectedCategory = "All";

    // necessary info for pagination
    collectionSize = 0;
    page = 1;
    // default
    pageSize = 10;
    addCatalogue = false;

    // check whether catalogue-line-panel should be displayed for a specific catalogue line
    catalogueLineView = {};

    selectedCatalogue: string = "all";
    catlogueId: string = "all";
    cataloguesIds: any = [];
    catalogueIdsUUids: any = [];

    sortOption = null;
    catalogueText: string = "";
    getCatalogueStatus = new CallStatus();
    productCatalogueRetrievalStatus: CallStatus = new CallStatus();

    callStatus = new CallStatus();
    deleteStatuses: CallStatus[] = [];

    @ViewChild(DeleteExportCatalogueModalComponent)
    private deleteCatalogueModal: DeleteExportCatalogueModalComponent;

    CATALOGUE_LINE_SORT_OPTIONS = CATALOGUE_LINE_SORT_OPTIONS;

    private searchText: string = "";

    constructor(private cookieService: CookieService,
        private publishService: PublishService,
        private catalogueService: CatalogueService,
        private categoryService: CategoryService,
        private translate: TranslateService,
        private userService: UserService,
        private router: Router) {
    }

    ngOnInit() {
        this.searchText = "";
        this.deleteStatuses = [];
        this.catalogueText = "";
        this.sortOption = null;
        this.cataloguesIds = [];
        this.catlogueId = "all";
        this.selectedCatalogue = "all";
        this.catalogueLinesWRTTypes = [];
        this.catalogueLinesArray = [];
        this.categoryNames = [];
        this.selectedCategory = "All";
        this.collectionSize = 0;
        this.page = 1;
        this.pageSize = 10;
        this.addCatalogue = false;
        this.catalogueLineView = {};
        this.getCatagloueIdsForParty();
        this.catalogueService.setEditMode(false);
        this.sortOption = this.sortOption == null ? CATALOGUE_LINE_SORT_OPTIONS[0].name : this.sortOption;
        this.requestCatalogue();
        for (let i = 0; i < this.pageSize; i++) {
            this.deleteStatuses.push(new CallStatus());
        }
    }

    selectName(ip: ItemProperty | Item) {
        return selectName(ip);
    }

    selectDescription(item: Item) {
        return selectDescription(item);
    }

    changeCat() {
        this.catlogueId = this.selectedCatalogue;
        this.requestCatalogue();
    }

    search = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            switchMap(term => {
                this.requestCatalogue();
                return [];
            })
        );

    requestCatalogue(): void {
        this.getCatalogueStatus.submit();
        const userId = this.cookieService.get("user_id");
        // check whether the user chose a category to filter the catalogue lines
        let categoryName = this.selectedCategory == "All" ? null : this.selectedCategory;
        Promise.all([
            this.catalogueService.getCatalogueResponse(userId, categoryName, this.searchText, this.pageSize, (this.page - 1) * this.pageSize, this.sortOption, this.catlogueId),
            this.getCompanySettings(userId)
        ])
            .then(([catalogueResponse, settings]) => {
                this.catalogueResponse = catalogueResponse;
                this.settings = settings;
                this.init();
                this.getCatalogueStatus.callback(null, true);
            },
                error => {
                    this.getCatalogueStatus.error("Failed to get catalogue", error);
                }
            )
    }

    private getCompanySettings(userId: string): Promise<CompanySettings> {
        if (this.settings) {
            return Promise.resolve(this.settings);
        }

        return this.userService.getSettingsForUser(userId);
    }

    private init(): void {
        let len = this.catalogueResponse.catalogueLines.length;
        this.categoryNames = this.catalogueResponse.categoryNames;
        this.collectionSize = this.catalogueResponse.size;
        this.catalogueLinesArray = [...this.catalogueResponse.catalogueLines];
        this.catalogueLinesWRTTypes = this.catalogueLinesArray;
        let i = 0;
        // Initialize catalogueLineView
        for (; i < len; i++) {
            this.catalogueLineView[this.catalogueResponse.catalogueLines[i].id] = false;
        }
    }

    onDeleteCatalogue(deleteCatalogueModal): void {
        this.deleteCatalogueModal.open('delete');
    }

    onDeleteCatalogueImages(): void {
        this.deleteCatalogueModal.open('delete-images');
    }

    onAddCatalogue() {
        const userId = this.cookieService.get("user_id");
        this.userService.getUserParty(userId).then(userParty => {

            let catalogue: Catalogue = new Catalogue(this.catalogueText, null, userParty, "", "", []);
            // add catalogue line to the end of catalogue
            this.catalogueService.postCatalogue(catalogue)
                .then(() => {
                    this.catalogueText = "";
                    this.cancelAddingCatalogue();
                    this.ngOnInit();

                })
                .catch(err => {
                })
        }).catch(err => {
        });
    }

    cancelAddingCatalogue() {
        this.addCatalogue = false;
    }

    onAddingCatalogue() {
        this.addCatalogue = true;
    }

    onOpenCatalogueLine(e: Event) {
        e.stopImmediatePropagation();
    }

    redirectToEdit(catalogueLine) {
        this.catalogueService.editCatalogueLine(catalogueLine);
        this.publishService.publishMode = 'edit';
        this.publishService.publishingStarted = false;
        this.categoryService.resetSelectedCategories();
        // if(this.catlogueId == "all"){
        this.catalogueService.getCatalogueFromUuid(catalogueLine.goodsItem.item.catalogueDocumentReference.id)
            .then(res => {
                if (isLogisticsService(catalogueLine))
                    this.router.navigate(['catalogue/publish-logistic'], { queryParams: { cat: res.id, pg: "single" } });
                else
                    this.router.navigate(['catalogue/publish'], { queryParams: { cat: res.id, pg: "single" } });
            })
            .catch(error => {
                if (isLogisticsService(catalogueLine))
                    this.router.navigate(['catalogue/publish-logistic'], { queryParams: { cat: 'default', pg: "single" } });
                else
                    this.router.navigate(['catalogue/publish'], { queryParams: { cat: 'default', pg: "single" } });
            });;

        // }else{
        //     if(isLogisticsService(catalogueLine))
        //         this.router.navigate(['catalogue/publish-logistic'], {queryParams: {cat:this.catlogueId, pg: "single"}});
        //     else
        //         this.router.navigate(['catalogue/publish'], {queryParams: {cat:this.catlogueId, pg: "single"}});
        // }
    }

    redirectToCopy(catalogueLine) {
        this.catalogueService.editCatalogueLine(catalogueLine);
        this.publishService.publishMode = 'copy';
        this.publishService.publishingStarted = false;
        this.categoryService.resetSelectedCategories();
        if (this.catlogueId == "all") {
            this.catalogueService.getCatalogueFromUuid(catalogueLine.goodsItem.item.catalogueDocumentReference.id)
                .then(res => {
                    if (isLogisticsService(catalogueLine))
                        this.router.navigate(['catalogue/publish-logistic'], { queryParams: { cat: res.id, pg: "single" } });
                    else
                        this.router.navigate(['catalogue/publish'], { queryParams: { cat: res.id, pg: "single" } });
                })
                .catch(error => {
                    if (isLogisticsService(catalogueLine))
                        this.router.navigate(['catalogue/publish-logistic'], { queryParams: { cat: 'default', pg: "single" } });
                    else
                        this.router.navigate(['catalogue/publish'], { queryParams: { cat: 'default', pg: "single" } });
                });;
        } else {
            if (isLogisticsService(catalogueLine))
                this.router.navigate(['catalogue/publish-logistic'], { queryParams: { cat: this.catlogueId, pg: "single" } });
            else
                this.router.navigate(['catalogue/publish'], { queryParams: { cat: this.catlogueId, pg: "single" } });
        }

    }

    deleteCatalogueLine(catalogueLine: CatalogueLine, i: number): void {
        if (confirm("Are you sure that you want to delete this catalogue item?")) {
            const status = this.getDeleteStatus(i);
            status.submit();
            let catalogue_uuid = "";

            if (this.catalogueService.catalogueResponse.catalogueUuid === "" || this.catalogueService.catalogueResponse.catalogueUuid == null) {
                catalogue_uuid = catalogueLine.goodsItem.item.catalogueDocumentReference.id;
            } else {
                catalogue_uuid = this.catalogueService.catalogueResponse.catalogueUuid;
            }

            this.catalogueService.deleteCatalogueLine(catalogue_uuid, catalogueLine.id)
                .then(res => {
                    this.requestCatalogue();
                    status.callback("Catalogue line deleted", true);
                })
                .catch(error => {
                    status.error("Error while deleting catalogue line");
                });
        }
    }

    getDeleteStatus(index: number): CallStatus {
        return this.deleteStatuses[index % this.pageSize];
    }

    onExportCatalogue(): void {
        this.deleteCatalogueModal.open('export');
    }

    onUploadImage(): void {
        this.deleteCatalogueModal.open('upload-image');
    }

    navigateToThePublishPage() {
        this.router.navigate(['/catalogue/categorysearch']);
    }

    navigateToBulkUploadPage() {
        this.router.navigate(["/catalogue/publish"], { queryParams: { pg: 'bulk', productType: 'product' } });
    }

    getCatagloueIdsForParty() {
        this.productCatalogueRetrievalStatus.submit();
        this.catalogueService.getCatalogueIdsUUidsForParty().then((catalogueIds) => {
            var idList = [];
            var uuidList = [];

            for (var obj in catalogueIds) {
                idList.push(catalogueIds[obj][0]);
                uuidList.push(catalogueIds[obj][1]);
            }

            this.cataloguesIds = idList;
            this.catalogueIdsUUids = uuidList;
            this.productCatalogueRetrievalStatus.callback("Successfully loaded catalogueId list", true);
        }).catch((error) => {
            this.productCatalogueRetrievalStatus.error('Failed to get product catalogues');
        });
    }
}
