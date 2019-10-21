import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { Location } from "@angular/common";
import { CatalogueLine } from "../../../catalogue/model/publish/catalogue-line";
import { RequestForQuotation } from "../../../catalogue/model/publish/request-for-quotation";
import { BPDataService } from "../bp-data-service";
import { BPEService } from "../../bpe.service";
import { Router } from "@angular/router";
import { Quotation } from "../../../catalogue/model/publish/quotation";
import { NegotiationModelWrapper } from "./negotiation-model-wrapper";
import { CURRENCIES } from "../../../catalogue/model/constants";
import { CallStatus } from "../../../common/call-status";
import { Quantity } from "../../../catalogue/model/publish/quantity";
import { BpUserRole } from "../../model/bp-user-role";
import {CookieService} from 'ng2-cookies';
import {DiscountModalComponent} from '../../../product-details/discount-modal.component';
import {ThreadEventMetadata} from '../../../catalogue/model/publish/thread-event-metadata';
import {UBLModelUtils} from '../../../catalogue/model/ubl-model-utils';
import * as myGlobals from '../../../globals';
import {DigitalAgreement} from "../../../catalogue/model/publish/digital-agreement";
import * as moment from "moment";
import {Moment, unitOfTime} from "moment";
import {Clause} from '../../../catalogue/model/publish/clause';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: "negotiation-response-item",
    templateUrl: "./negotiation-response-item.component.html",
    styleUrls: ["./negotiation-response-item.component.css"],
})
export class NegotiationResponseItemComponent implements OnInit {

    dateFormat = "YYYY-MM-DD";

    line: CatalogueLine;
    @Input() rfq: RequestForQuotation;
    @Input() quotation: Quotation;
    @Input() lastOfferQuotation: Quotation;
    @Input() frameContractQuotation: Quotation;
    @Input() frameContract: DigitalAgreement;
    @Input() frameContractNegotiation: boolean = false;
    @Input() defaultTermsAndConditions: Clause[];
    @Input() primaryTermsSource: 'product_defaults' | 'frame_contract' | 'last_offer' = 'product_defaults';
    @Input() readonly: boolean = false;
    // whether the item is deleted or not
    // if the item is deleted, then we will not show Product Defaults section since we do not have those information
    @Input() isCatalogueLineDeleted:boolean = false ;
    @Input() wrapper: NegotiationModelWrapper;
    userRole: BpUserRole;
    quotationTotalPrice: Quantity;
    config = myGlobals.config;

    CURRENCIES: string[] = CURRENCIES;

    callStatus: CallStatus = new CallStatus();

    // the copy of ThreadEventMetadata of the current business process
    processMetadata: ThreadEventMetadata;

    @ViewChild(DiscountModalComponent)
    private discountModal: DiscountModalComponent;

    getPartyId = UBLModelUtils.getPartyId;
    showFrameContractDetails: boolean = false;
    showNotesAndAdditionalFiles: boolean = false;
    showDeliveryAddress: boolean = false;
    showTermsAndConditions:boolean = false;
    selectedTCTab: 'CUSTOM_TERMS' | 'CLAUSES' = 'CUSTOM_TERMS';
    tcChanged:boolean = false;

    onClauseUpdate(event): void {
        this.tcChanged = UBLModelUtils.areTermsAndConditionListsDifferent(this.wrapper.rfq.termOrCondition, this.wrapper.newQuotation.termOrCondition);
    }

    constructor(private bpeService: BPEService,
                private bpDataService: BPDataService,
                private location: Location,
                private cookieService: CookieService,
                private translate: TranslateService,
                private router: Router) {
    }

    ngOnInit() {
        // get copy of ThreadEventMetadata of the current business process
        this.processMetadata = this.bpDataService.bpActivityEvent.processMetadata;
        this.line = this.bpDataService.getCatalogueLine();

        this.quotationTotalPrice = new Quantity(this.wrapper.quotationDiscountPriceWrapper.totalPrice, this.wrapper.quotationDiscountPriceWrapper.currency);

        this.userRole = this.bpDataService.bpActivityEvent.userRole;

        // change the selected TC tab if there is no custom trading term
        if(this.getNonFrameContractTermNumber() == 0) {
            this.selectedTCTab = 'CLAUSES';
        }

        // initialize data monitoring request based on the frame contract and last offer
        if (this.lastOfferQuotation) {
            this.quotation.dataMonitoringPromised = this.lastOfferQuotation.dataMonitoringPromised;
        } else if (this.frameContractQuotation) {
            this.quotation.dataMonitoringPromised = this.frameContractQuotation.dataMonitoringPromised;
        }
    }

    onTotalPriceChanged(totalPrice: number): void {
        this.wrapper.quotationDiscountPriceWrapper.totalPrice = totalPrice;
    }

    onTCTabSelect(event:any,id:any): void {
        event.preventDefault();
        this.selectedTCTab = id;
    }

    /*
     * Getters and Setters
     */

    isLoading(): boolean {
        return false;
    }

    isDisabled(): boolean {
        return this.isLoading() || this.readonly;
    }

    getPresentationMode(): "edit" | "view" {
        return this.isReadOnly() ? "view" : "edit";
    }

    isReadOnly(): boolean {
        return this.processMetadata == null || this.processMetadata.processStatus !== 'Started' || this.readonly;
    }

    isFrameContractPanelVisible(): boolean {
        return !UBLModelUtils.isEmptyQuantity(this.wrapper.rfqFrameContractDuration);
    }

    isDiscountIconVisibleInCustomerRequestColumn(): boolean {
        return this.wrapper.quotationDiscountPriceWrapper.appliedDiscounts.length > 0 &&
            this.wrapper.rfqTotalPriceString == this.wrapper.lineDiscountPriceWrapper.totalPriceString;
    }

    isSellerTermsVisible(): boolean {
        return !(this.quotation.documentStatusCode.name == 'Rejected' && this.isReadOnly());
    }

    isTermDropDownVisible(): boolean {
        return this.lastOfferQuotation != null || (this.frameContractQuotation != null && !this.frameContractNegotiation);
    }

    getNonFrameContractTermNumber(): number {
        let termCount: number = 0;
        for(let tradingTerm of this.wrapper.newQuotation.tradingTerms) {
            if(tradingTerm.id != 'FRAME_CONTRACT_DURATION') {
                termCount++;
            }
        }
        return termCount;
    }

    areTermsEqual(termId: string): boolean {
        let termsEqual: boolean = this.wrapper.checkTermEquivalance(this.primaryTermsSource, termId);
        if(!termsEqual) {
            this.tcChanged = true;
        }
        return termsEqual;
    }

    /*
     * Internal Methods
     */

    private openDiscountModal(): void{
        this.discountModal.open(this.wrapper.quotationDiscountPriceWrapper);
    }

    showTab(tab:boolean):boolean {
        let ret = true;
        if (tab)
            ret = false;
        this.showFrameContractDetails = false;
        this.showNotesAndAdditionalFiles = false;
        this.showDeliveryAddress = false;
        this.showTermsAndConditions = false;
        return ret;
    }

    getContractEndDate(): string {
        let rangeUnit: string;
        switch (this.wrapper.newQuotationWrapper.frameContractDuration.unitCode) {
            case "year(s)": rangeUnit = 'y'; break;
            case "month(s)": rangeUnit = 'M'; break;
            case "week(s)": rangeUnit = 'w'; break;
            case "day(s)": rangeUnit = 'd'; break;
        }
        let m:Moment = moment().add(this.wrapper.newQuotationWrapper.frameContractDuration.value, <unitOfTime.DurationConstructor>rangeUnit);
        let date: string = m.format(this.dateFormat);
        return date;
    }
}
