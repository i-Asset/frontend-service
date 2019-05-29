import { Component, OnInit } from "@angular/core";
import { AppComponent } from "../app.component";
import { CookieService } from "ng2-cookies";
import { BPEService } from "../bpe/bpe.service";
import { UserService } from '../user-mgmt/user.service';
import { ActivatedRoute, Router, Params } from "@angular/router";
import { TABS, PAGE_SIZE } from "./constants";
import { ProcessInstanceGroupFilter } from "../bpe/model/process-instance-group-filter";
import { CallStatus } from "../common/call-status";
import { DashboardOrdersQuery } from "./model/dashboard-orders-query";
import { DashboardOrdersQueryResults } from "./model/dashboard-orders-query-results";
import { DashboardQueryParameters } from "./model/dashboard-query-parameters";
import { DashboardUser } from "./model/dashboard-user";
import * as myGlobals from '../globals';
import {CollaborationGroup} from '../bpe/model/collaboration-group';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as d3timelines from 'd3-timelines';
import * as d3 from 'd3';
import * as d3time from 'd3-time';
import * as d3timeformat from 'd3-time-format';
import { id } from "@swimlane/ngx-charts/release/utils";


// import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';

@Component({
    selector: "dashboard-threaded",
    templateUrl: "./dashboard-threaded.component.html",
    styleUrls: ["./dashboard-threaded.component.css"]
})
export class DashboardThreadedComponent implements OnInit{

    user: DashboardUser;

    filterSet: ProcessInstanceGroupFilter;
    modifiedFilterSet: ProcessInstanceGroupFilter = new ProcessInstanceGroupFilter();
    filterQueryStatus: CallStatus = new CallStatus();

    queryParameters: DashboardQueryParameters = new DashboardQueryParameters();

    query: DashboardOrdersQuery = new DashboardOrdersQuery();
    querypopup: DashboardOrdersQuery = new DashboardOrdersQuery();

    results: DashboardOrdersQueryResults = new DashboardOrdersQueryResults();
    queryStatus: CallStatus = new CallStatus();

    TABS = TABS;

    selectedId = "";
    selectedNegotiations = [];
    selectedNegotiation:any;
    selectedNegotiationLists = [];
    selectedNegotiationIndex = -1;
    isDivVisible = false;
    buyerCounter = 0;
    sellerCounter = 0;
    isProject = false;
    expanded = false;
    private data: any = [
        // {times: [{"color":"green", "label":"Weeee", "starting_time": 1355752800000, "ending_time": 1355759900000}, {"color":"blue", "label":"Weeee", "starting_time": 1355767900000, "ending_time": 1355774400000}]},
      ];
    private chart: any;

    
    // this contains status-name-defaultName information of collaboration groups
    // if status is true, that means we are changing collaboration group name
    // defaultName is used if the collaboration group does not have any name assigned.
    updatingCollaborationGroupName = [];

    public config = myGlobals.config;

    constructor(
        private cookieService: CookieService,
        private modalService: NgbModal,
        private bpeService: BPEService,
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute,
        public appComponent: AppComponent
    ) {}

   

    ngOnInit() {
        this.computeUserFromCookies();
        this.getTabCounters();
        this.route.queryParams.subscribe(params => this.updateStateFromQueryParameters(params));
    }

    async clickexpand(data){
        if(this.selectedId != ""){
            this.data = [];
            this.chart = null;
            var idDiv = ".cls"+this.selectedId + " > svg";
            d3.select(idDiv).remove();
        }
        this.expanded = !this.expanded;
        this.isDivVisible = !this.isDivVisible;
        this.selectedId = data.id;
        var t_arr = [];
        await data.associatedProcessInstanceGroups.forEach(element => {
            var lastActivityTime = (new Date(element.lastActivityTime)).getTime();
            var firstActivityTime = (new Date(element.firstActivityTime)).getTime();
            if((new Date(element.lastActivityTime).getTime()) -(new Date(element.firstActivityTime).getTime()) < 86400){
                firstActivityTime = new Date(element.firstActivityTime).getTime()-(86400000*1);
                lastActivityTime = (new Date(element.lastActivityTime)).getTime();
            }
            var obj =  { times: [{"color":"red", "label":element.name, "starting_time": firstActivityTime, "ending_time": lastActivityTime}]}
            t_arr.push((new Date(element.firstActivityTime)).getTime()/1000);
            t_arr.push((new Date(element.lastActivityTime)).getTime()/1000);
            this.data.push(obj);
        });

        var specifier = "%S";
        var parsedData = await t_arr.map(function(d) {
          return d3.timeParse(specifier)(d)
        });

        var scale = d3.scaleTime()
                .domain(d3.extent(parsedData));
        
        this.chart = d3timelines.timelines()
        .stack() // toggles graph stacking
        .tickFormat({
            format: d3timeformat.timeFormat("%Y-%m-%d")
        })
        .showTimeAxisTick()
        .margin({left:70, right:30, top:0, bottom:0})
       ;
        var idDiv = ".cls"+data.id;
        d3.select(idDiv).append('svg').attr('width', 1000)
        .datum(this.data).call(this.chart);
    }

    clickantiExampand(data){
        this.expanded = !this.expanded;
        this.isDivVisible = !this.isDivVisible;
        if(this.selectedId == data.id){
            this.selectedId = "";
            this.data = [];
            this.chart = null;
            var idDiv = ".cls"+data.id + " > svg";
            d3.select(idDiv).remove();
        }
        //d3.selectAll('svg > *').remove();
    }

    onChangeTab(event: any): void {
        event.preventDefault();
        this.updateQueryParameters({ tab: event.target.id });
    }

    onCloseWelcomeTab(event: any): void {
        event.preventDefault();
        event.stopImmediatePropagation();
        this.user.showWelcomeTab = false;
        this.userService.setWelcomeFlag(false)
        .then(res => {
          this.cookieService.set("show_welcome","false");
        });
        if(this.queryParameters.tab === TABS.WELCOME) {
            if (this.appComponent.checkRoles('purchases'))
              this.updateQueryParameters({ tab: TABS.PURCHASES });
            else if (this.appComponent.checkRoles('sales'))
              this.updateQueryParameters({ tab: TABS.SALES });
            else
              this.updateQueryParameters({ tab: TABS.CATALOGUE });  
        }
    }

    onToggleArchived(): void {
        this.updateQueryParameters({ arch: !this.queryParameters.arch });
    }

    onPageChange(): void {
        this.updateQueryParameters({ pg: this.query.page });
    }

    onPopUpPageChange(): void {
        this.getOrdersQuery(this.querypopup);
        // this.updateQueryParameters({ pg: this.query.page });
    }

    onFilterChange(): void {
        this.updateQueryParameters({
            prd: this.toString(this.modifiedFilterSet.relatedProducts),
            cat: this.toString(this.modifiedFilterSet.relatedProductCategories),
            sts: this.toString(this.modifiedFilterSet.status),
            prt: this.getSelectedPartners(this.modifiedFilterSet),
         })
    }

    onOrderRemovedFromView(): void {
        this.filterSet = null;
        if(this.results.resultCount === 1 && this.query.page > 1) {
            this.updateQueryParameters({ pg: this.queryParameters.pg - 1 });
        } else {
            this.updateStateFromQueryParameters(this.queryParameters);
        }
        this.getTabCounters();
    }

    /*
     * Getters for the template
     */

    isToggleArchivedButtonEnabled(): boolean {
        return this.query.archived || this.results.hasArchivedOrders
    }

    getToggleArchivedButtonText(): string {
        if(!this.isToggleArchivedButtonEnabled()) {
            return "No Archived Orders"
        }
        return this.query.archived ? "Back" : "Show Archived"
    }

    /*
     * Internal methods.
     */

    private toString(filters: string[]): string {
        return filters.join("_SEP_")
    }

    private getSelectedPartners(filter: ProcessInstanceGroupFilter): string {
        return filter.tradingPartnerNames.map(name => {
            // get the index in the original filter set
            const index = this.filterSet.tradingPartnerNames.indexOf(name)
            // get the ID corresponding to the index
            return this.filterSet.tradingPartnerIDs[index]
        }).join("_SEP_")
    }

    /**
     * Sets the parameters in the URL, this in turns triggers `this.updateStateFromQueryParameters(params)`.
     *
     * @param params the updated parameters
     */
    private updateQueryParameters(params: Partial<DashboardQueryParameters>): void {
        const queryParams = { ...this.queryParameters, ...params }
        this.router.navigate(["dashboard"], { queryParams: queryParams });
    }

    private computeUserFromCookies(): void {
        this.user = new DashboardUser(
            this.cookieService.get("user_fullname") || ""
        )

        if (this.cookieService.get("user_id") && this.cookieService.get("company_id")) {
            this.user.hasCompany = this.cookieService.get("company_id") !== "null"
        } else {
            this.appComponent.checkLogin("/user-mgmt/login");
        }

        if (this.cookieService.get("bearer_token")) {
            const at = this.cookieService.get("bearer_token");
            if (at.split(".").length == 3) {
                const at_payload = at.split(".")[1];
                try {
                    const at_payload_json = JSON.parse(atob(at_payload));
                    const at_payload_json_roles = at_payload_json["realm_access"]["roles"];
                    this.user.roles = at_payload_json_roles;
                } catch (e) {}
            }
        }

        this.user.showWelcomeTab = this.cookieService.get("show_welcome") === "true";

    }

    private getTabCounters() {
      this.buyerCounter = 0;
      this.sellerCounter = 0;
      this.bpeService
      .getActionRequiredCounter(this.cookieService.get("company_id"))
      .then(response => {
          this.buyerCounter = parseInt(response.buyer);
          this.sellerCounter = parseInt(response.seller);
      });
    }

    private updateStateFromQueryParameters(params: Params | DashboardQueryParameters): void {
        this.queryParameters = new DashboardQueryParameters(
            this.sanitizeTab(params["tab"]),                        // tab
            params["arch"] === "true" || params["arch"] === true,   // archived
            this.sanitizePage(params["pg"]),                        // page
            params["prd"],                                          // products
            params["cat"],                                          // categories
            params["prt"],                                          // partners
            params["sts"]                                           // status
        )

        switch(this.queryParameters.tab) {
            case TABS.PURCHASES:
            case TABS.FAVOURITE:
            case TABS.COMPARE:
            case TABS.PROJECTS:
            case TABS.PERFORMANCE:
            case TABS.SALES:
                this.queryOrdersIfNeeded();
                return;
            default:
                // nothing
        }

    }

    private sanitizeTab(tab: string): string {
        if (!tab) {
            if (this.queryParameters.tab) {
                return this.queryParameters.tab;
            }
            if(this.user.showWelcomeTab) {
                return TABS.WELCOME;
            }
        } else {
            const upped = tab.toUpperCase()
            if(upped === TABS.CATALOGUE || upped === TABS.SALES || upped === TABS.WELCOME || upped === TABS.FAVOURITE || upped == TABS.COMPARE || upped == TABS.PROJECTS || upped == TABS.PERFORMANCE) {
                return upped;
            }
        }
        return TABS.PURCHASES;
    }

    private sanitizePage(page: string): number {
        if (page == null) {
            return (this.queryParameters.pg) || 1;
        }
        try {
            return Number.parseInt(page);
        } catch (e) {
            return 1;
        }

    }

    async queryOrdersIfNeeded() {
        const query = this.computeOrderQueryFromQueryParams();

        if(await this.isOrdersFiltersQueryNeeded(query)) {
            this.executeOrdersFiltersQuery(query);
        }

        if(this.isOrdersQueryNeeded(query)) {
            this.executeOrdersQuery(query);
        }
       
        this.query = query
    }

    private executeOrdersQuery(query: DashboardOrdersQuery): void {
        this.queryStatus.submit();
        this.getOrdersQuery(query)
        .then(() =>{
            this.queryStatus.callback("Successfully fetched orders", true);
        })
        .catch(error => {
            this.queryStatus.error("Error while fetching orders.", error);
        });
    }

    private getOrdersQuery(query: DashboardOrdersQuery): Promise<void> {
        

        if(this.queryParameters.tab == "PROJECTS"){
            this.isProject = true;
        }else{
            this.isProject = false;
        }

        if(query.archived) {
            // only one query needed
            return this.bpeService
            .getCollaborationGroups(this.cookieService.get("company_id"),
                query.collaborationRole, query.page - 1, query.pageSize, query.archived,
                query.products, query.categories, query.partners,query.status)
            .then(response => {
                this.results = new DashboardOrdersQueryResults(
                    response.collaborationGroups,
                    response.collaborationGroups.length > 0,
                    response.size
                )
                this.createUpdatingCollaborationGroupNameArray()
            });
        } else {
            // Needs to query for archived orders to know if the "Show Archived" button should be enabled
            return Promise.all([
                // regular query
                this.bpeService.getCollaborationGroups(this.cookieService.get("company_id"),
                    query.collaborationRole, query.page - 1, query.pageSize, query.archived,
                    query.products, query.categories, query.partners,query.status,this.isProject
                ),
                // query for archived orders
                this.bpeService.getCollaborationGroups(this.cookieService.get("company_id"),
                    query.collaborationRole, 0, 1, true, [], [], [],[]
                ),
            ]).then(([response, archived]) => {
                this.isProject = false;
                this.results = new DashboardOrdersQueryResults(
                    response.collaborationGroups,
                    archived.collaborationGroups.length > 0,
                    response.size
                )
                this.createUpdatingCollaborationGroupNameArray()
            });
        }
    }

    private createUpdatingCollaborationGroupNameArray(){
        this.updatingCollaborationGroupName = [];
        for(let order of this.results.orders){
            this.updatingCollaborationGroupName.push({status:false,name:order.name,defaultName:this.getDefaultCollaborationNames(order)})
        }
    }

    private getDefaultCollaborationNames(collaborationGroup:CollaborationGroup):string{
        let defaultName = "Activities on ";
        for(let i = 0 ; i < collaborationGroup.associatedProcessInstanceGroups.length ; i++){
            if(i == collaborationGroup.associatedProcessInstanceGroups.length-1){
                defaultName += collaborationGroup.associatedProcessInstanceGroups[i].name;
            }
            else {
                defaultName += collaborationGroup.associatedProcessInstanceGroups[i].name+", ";
            }
        }
        return defaultName;
    }

    areOrdersLoading(): boolean {
        return this.queryStatus.fb_submitted;
    }

    private executeOrdersFiltersQuery(query: DashboardOrdersQuery): void {
        this.filterQueryStatus.submit();
        if(this.queryParameters.tab == "PROJECTS"){
            this.isProject = true;
        }else{
            this.isProject = false;
        }

        this.bpeService
        .getProcessInstanceGroupFilters(this.cookieService.get("company_id"), query.collaborationRole, query.archived, query.products, query.categories, query.partners, query.status,this.isProject)
        .then(response => {
            // populate the modified filter set with the passed parameters that are also included in the results
            // so that the selected criteria would have a checkbox along with
            this.modifiedFilterSet = new ProcessInstanceGroupFilter();
            // products
            if (query.products.length > 0) {
                for (let product of response.relatedProducts) {
                    this.modifiedFilterSet.relatedProducts.push(product);
                }
            }
            // status
            if (query.status.length > 0 ){
                for(let status of response.status){
                    this.modifiedFilterSet.status.push(status);
                }
            }
            // categories
            if (query.categories.length > 0) {
                for (let product of response.relatedProductCategories) {
                    this.modifiedFilterSet.relatedProductCategories.push(product);
                }
            }
            // partners
            if (query.partners.length > 0) {
                for (let i = 0; i < response.tradingPartnerIDs.length; i++) {
                    this.modifiedFilterSet.tradingPartnerIDs.push(response.tradingPartnerIDs[i]);
                    this.modifiedFilterSet.tradingPartnerNames.push(response.tradingPartnerNames[i]);
                }
            }
            this.filterSet = response;
            this.filterQueryStatus.callback("Successfully fetched filters", true);
        })
        .catch(error => {
            this.filterQueryStatus.error("Failed to get filters", error);
        });
    }

    areFiltersLoading(): boolean {
        return this.filterQueryStatus.fb_submitted;
    }

    private isOrdersQueryNeeded(query: DashboardOrdersQuery): boolean {
        return true;
    }

    private isOrdersFiltersQueryNeeded(query: DashboardOrdersQuery): boolean {
        // filterSet may be set to null to request a recompute of the filter sets.
        if(!this.filterSet) {
            return true;
        }

        if(this.queryParameters.tab == "PROJECTS" && this.isProject == false){
            return true;
            
        }else if(this.queryParameters.tab != "PROJECTS" && this.isProject == true){
            return true;
        }
        // Do not recompute the filters on filter changes.
        return this.query.archived !== query.archived
            || this.query.collaborationRole !== query.collaborationRole;
    }

    private computeOrderQueryFromQueryParams(): DashboardOrdersQuery {
        return new DashboardOrdersQuery(
            this.queryParameters.arch,
            this.queryParameters.tab === TABS.PURCHASES || this.queryParameters.tab == TABS.PROJECTS ? "BUYER" : "SELLER",
            this.queryParameters.pg,
            this.parseArray(this.queryParameters.prd),
            this.parseArray(this.queryParameters.cat),
            this.parseArray(this.queryParameters.prt),
            this.parseArray(this.queryParameters.sts),
            PAGE_SIZE,
        )
    }

    private parseArray(param: string): string[] {
        return param ? param.split("_SEP_") : []
    }

    changeCollaborationGroupNameStatus(index:number,status:boolean){
        // if status is true,then we will change the name of the group.
        if(status){
            this.updatingCollaborationGroupName[index].name = this.results.orders[index].name;
        }
        this.updatingCollaborationGroupName[index].status = status;
    }

    updateCollaborationGroupName(id:string,name:string){
        this.bpeService.updateCollaborationGroupName(id,name)
            .then(() => {
                this.onOrderRemovedFromView();
            })
            .catch(err => {
                console.error("Failed to update collaboration group name",err);
            });
    }

    archiveGroup(id: string): void {
        this.bpeService.archiveCollaborationGroup(id)
            .then(() => {
               this.onOrderRemovedFromView();
            })
            .catch(err => {
                console.error("Failed to archive collaboration group",err);
            });
    }

    restoreGroup(id: string): void {
        this.bpeService.restoreCollaborationGroup(id)
            .then(() => {
                this.onOrderRemovedFromView();
            })
            .catch(err => {
                console.error("Failed to restore collaboration group",err);
            });
    }

    deleteGroup(id: string): void {
        if (confirm("Are you sure that you want to delete this collaboration group?")) {
            this.bpeService.deleteCollaborationGroup(id)
                .then(() => {
                    this.onOrderRemovedFromView();
                })
                .catch(err => {
                    console.error("Failed to delete the collaboration group",err);
                });
        }
    }

    open(content,index,order) {
        this.selectedNegotiation = order;
        this.selectedNegotiationIndex = index + (this.query.page -1)*this.query.pageSize;
        this.onPopUpPageChange();
        this.modalService.open(content, {backdropClass: 'light-blue-backdrop'}).result.then((result) => {
            this.selectedNegotiations = [];
            this.ngOnInit();
        }, (reason) => {
            this.selectedNegotiations = [];
            this.ngOnInit();
        });
    }

    changeNegotation(index,order){
        let lastindex = index + (this.querypopup.page -1)*this.querypopup.pageSize;
        if(this.selectedNegotiations.indexOf(lastindex) > -1){
            let indexOfNegotation = this.selectedNegotiations.indexOf(lastindex);
            this.selectedNegotiations.splice(indexOfNegotation,1);
            delete this.selectedNegotiationLists[lastindex];
        }else{
            this.selectedNegotiations.push(lastindex);
            this.selectedNegotiationLists[lastindex] = order;
        }
    }

    async mergeNegotations(){
        let selectedNegotation = this.selectedNegotiation.id;
        let mergeIdList = [];


        await this.selectedNegotiationLists.forEach(item => {
            mergeIdList.push(item.id);
        })

        this.bpeService.mergeNegotations(selectedNegotation,mergeIdList)
        .then(() => {
            this.ngOnInit();
        })
        .catch(err => {
        });
    }
  
}
