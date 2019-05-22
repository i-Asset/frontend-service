import { Price } from "../catalogue/model/publish/price";
import { Quantity } from "../catalogue/model/publish/quantity";
import {currencyToString, roundToTwoDecimals} from "./utils";
import { ItemPriceWrapper } from "./item-price-wrapper";
import {PriceOption} from '../catalogue/model/publish/price-option';
import {PRICE_OPTIONS} from '../catalogue/model/constants';
import {ItemProperty} from '../catalogue/model/publish/item-property';
import {Address} from '../catalogue/model/publish/address';
import {Text} from '../catalogue/model/publish/text';
import {Country} from '../catalogue/model/publish/country';
import {isNumber} from "@ng-bootstrap/ng-bootstrap/util/util";

/**
 * Wrapper around a price and a quantity, contains convenience methods to get the total price,
 * price per item and their string representations.
 *
 * This class can also be substituted for a Quantity.
 */
export class DiscountPriceWrapper {
    debugName: string;
    /** hjid field from Quantity class */
    hjid: string = null;

    itemPrice: ItemPriceWrapper;
    // the item price wrapper which is used when we pass this price wrapper as quantity to QuantityInputComponent
    // quotationLinePriceWrapper: ItemPriceWrapper;
    // these fields are used to check whether we need to update quotation price or not
    // quotationIncotermUpdated = true;
    // quotationDeliveryPeriodUpdated = true;
    // quotationPaymentMeansUpdated = true;
    // this presentation mode is used to calculate total price for quotation
    //presentationMode:string = 'edit';

    // discounted (if any) price, it's updated upon an update in an information affecting the discounts
    // discountedPerItemPrice: number;
    // this field is used to create discount-modal view
    appliedDiscounts: PriceOption[] = [];

    constructor(public initialCatalogueLinePrice: number, // immutable initial price that to be used as the starting price while calculating the discount
                public price: Price, // dynamically changing price upon the updates on the price
                public orderedQuantity: Quantity = new Quantity(1, price.baseQuantity.unitCode), // ordered quantity
                public priceOptions:PriceOption[] = [],
                public additionalItemProperties:ItemProperty[] = [],
                public incoterm:string = null,
                public paymentMeans:string = null,
                public deliveryPeriod: Quantity = null,
                public deliveryLocation: Address = null,
                // public quotationLinePrice: Price = null,
                //public useCatalogueLinePrice: boolean = true // if true, the initial catalogue line price is used as price per item while calculating discount
                //public updatePriceWithDiscount: boolean = false // controls whether the price.priceAmount.value should be updated based on the discount updates
    ) {
        this.itemPrice = new ItemPriceWrapper(price);
        // this.quotationLinePriceWrapper = new ItemPriceWrapper(this.quotationLinePrice);
        this.getDiscountedTotalPrice(); // to initialize the applied discounts list
    }

    get pricePerItem(): number {
        if(!this.hasPrice() || isNaN(this.orderedQuantity.value)) {
            return 0;
        }

        // if this PriceWrapper has a quotation price but we do not need to update it, simply return.
        // if(this.quotationLinePriceWrapper.price && !this.quotationIncotermUpdated && !this.quotationPaymentMeansUpdated && !this.quotationDeliveryPeriodUpdated){
        //     if(!this.quotationHasPrice()){
        //         return 0;
        //     }
        //     return this.quotationLinePriceWrapper.value * this.orderedQuantity.value;
        // }

        let discountedTotalPrice: number = this.getDiscountedTotalPrice();
        return discountedTotalPrice / this.orderedQuantity.value;
    }

    get totalPrice(): number {
        if(!this.hasPrice() || !this.orderedQuantity.value) {
            return 0;
        }

        const baseQuantity = this.price.baseQuantity.value || 1;
        return this.roundPrice(this.orderedQuantity.value * this.itemPrice.value / baseQuantity);
    }

    set totalPrice(price: number) {
        const quantity = this.orderedQuantity.value || 1;
        const baseQuantity = this.price.baseQuantity.value || 1;
        this.price.priceAmount.value = price / quantity * baseQuantity
    }

    get totalPriceString(): string {
        if(!this.hasPrice()) {
            return "Not specified";
        }
        return `${this.totalPrice} ${this.currency}`;
    }

    get pricePerItemString(): string {
        const qty = this.orderedQuantity;

        if(!this.hasPrice() || !qty.value) {
            return "On demand";
        }

        return `${this.itemPrice.value} ${currencyToString(this.price.priceAmount.currencyID)} per ${qty.unitCode}`;
    }

    get currency(): string {
        return currencyToString(this.price.priceAmount.currencyID);
    }

    set currency(currency: string) {
        this.price.priceAmount.currencyID = currency;
    }

    hasPrice(): boolean {
        // != here gives "not null or undefined", which is the behaviour we want.
        return this.price.priceAmount.value != null;
    }

    // quotationHasPrice() :boolean{
    //     return this.quotationLinePriceWrapper.price.priceAmount.value != null;
    // }

    isDiscountApplied(): boolean {
        return this.appliedDiscounts.length > 0;
    }

    /**
     * Getters/Setters for quantity wrapper of the total price of the quotation
     */

    /*get value(): number {
        // if presentation mode is edit, then we have to calculate total price
        if(this.presentationMode == 'edit'){
            return this.totalPrice;
        }
        return this.quotationLinePriceWrapper.value*this.orderedQuantity.value;

    }

    set value(value: number) {
        this.quotationLinePriceWrapper.value = value/this.orderedQuantity.value;
    }

    get unitCode(): string {
        return this.quotationLinePriceWrapper.currency;
    }

    set unitCode(unitCode: string) {
        this.quotationLinePriceWrapper.currency = unitCode;
    }*/

    /**
     *  Price options functions
     */
    private getDiscountedTotalPrice(): number {
        const baseQuantity = this.price.baseQuantity.value || 1;
        // use the initial price if the discounts are calculated, otherwise use the current price value
        // this is required as the price value is update in this method
        //const pricePerItem = this.useCatalogueLinePrice ? this.initialCatalogueLinePrice : this.itemPrice.value;
        const pricePerItem = this.initialCatalogueLinePrice;
        let totalPrice = this.orderedQuantity.value * pricePerItem / baseQuantity;

        let totalDiscount:number = 0;
        let totalMinimumOrderQuantityDiscount = 0;
        let minimumOrderQuantityPriceOption:PriceOption = null;
        let totalDeliveryPeriodDiscount = 0;
        let deliveryPeriodPriceOption:PriceOption = null;

        // reset appliedDiscounts
        this.appliedDiscounts = [];

        // check for price options
        for (let priceOption of this.priceOptions) {
            // check for incoterms
            if (this.incoterm && priceOption.typeID == PRICE_OPTIONS.INCOTERM.typeID && priceOption.incoterms.indexOf(this.incoterm) != -1) {
                priceOption.discount = this.calculateDiscountAmount(priceOption, totalPrice);
                totalDiscount += priceOption.discount;
                // add this discount to appliedDiscounts list

                this.appliedDiscounts.push(priceOption);
            }
            // check for paymentMeans
            else if (this.paymentMeans && priceOption.typeID == PRICE_OPTIONS.PAYMENT_MEAN.typeID && priceOption.paymentMeans[0].paymentMeansCode.value == this.paymentMeans) {
                priceOption.discount = this.calculateDiscountAmount(priceOption, totalPrice);
                totalDiscount += priceOption.discount;
                // add this discount to appliedDiscounts list
                this.appliedDiscounts.push(priceOption);
            }
            // check for minimum order quantity
            else if (priceOption.typeID == PRICE_OPTIONS.ORDERED_QUANTITY.typeID && priceOption.itemLocationQuantity.minimumQuantity.unitCode == this.orderedQuantity.unitCode
                && this.orderedQuantity.value >= priceOption.itemLocationQuantity.minimumQuantity.value) {
                let qDiscount = this.calculateDiscountAmount(priceOption, totalPrice);
                if (qDiscount > totalMinimumOrderQuantityDiscount) {
                    totalMinimumOrderQuantityDiscount = qDiscount;
                    minimumOrderQuantityPriceOption = priceOption;
                }
            }
            // check for delivery period
            else if (this.deliveryPeriod && priceOption.typeID == PRICE_OPTIONS.DELIVERY_PERIOD.typeID &&
                priceOption.estimatedDeliveryPeriod.durationMeasure.unitCode == this.deliveryPeriod.unitCode &&
                priceOption.estimatedDeliveryPeriod.durationMeasure.value <= this.deliveryPeriod.value) {

                let dpDiscount = this.calculateDiscountAmount(priceOption, totalPrice);
                if (dpDiscount > totalMinimumOrderQuantityDiscount) {
                    totalDeliveryPeriodDiscount = dpDiscount;
                    deliveryPeriodPriceOption = priceOption;
                }
            }
            // check for additional item properties
            else if (this.additionalItemProperties.length > 0 && priceOption.typeID == PRICE_OPTIONS.PRODUCT_PROPERTY.typeID) {
                for (let property of this.additionalItemProperties) {
                    // check if a property is already selected for this discount option
                    if (priceOption.additionalItemProperty.length == 0) {
                        continue;
                    }
                    if (property.id == priceOption.additionalItemProperty[0].id && this.existenceOfPriceOptionForPropertyValue(priceOption.additionalItemProperty[0].value, property.value[0])) {
                        priceOption.discount = this.calculateDiscountAmount(priceOption, totalPrice);
                        totalDiscount += priceOption.discount;
                        // add this discount to appliedDiscounts list
                        this.appliedDiscounts.push(priceOption);
                    }
                }
            }
            else if (priceOption.typeID == PRICE_OPTIONS.DELIVERY_LOCATION.typeID && this.deliveryLocation) {
                // check whether addresses are the same or not
                let checkStreetName = priceOption.itemLocationQuantity.applicableTerritoryAddress[0].streetName != "";
                let checkBuildingNumber = priceOption.itemLocationQuantity.applicableTerritoryAddress[0].buildingNumber != "";
                let checkPostalZone = priceOption.itemLocationQuantity.applicableTerritoryAddress[0].postalZone != "";
                let checkCityName = priceOption.itemLocationQuantity.applicableTerritoryAddress[0].cityName != "";
                let checkRegion = priceOption.itemLocationQuantity.applicableTerritoryAddress[0].region != "";
                let country: Country = priceOption.itemLocationQuantity.applicableTerritoryAddress[0].country;
                let checkCountryName = country && country.name.value && country.name.value != "";
                if (checkStreetName && priceOption.itemLocationQuantity.applicableTerritoryAddress[0].streetName.toLocaleLowerCase() != this.deliveryLocation.streetName.toLocaleLowerCase()) {
                    continue;
                }
                if (checkBuildingNumber && priceOption.itemLocationQuantity.applicableTerritoryAddress[0].buildingNumber != this.deliveryLocation.buildingNumber) {
                    continue;
                }
                if (checkPostalZone && priceOption.itemLocationQuantity.applicableTerritoryAddress[0].postalZone != this.deliveryLocation.postalZone) {
                    continue;
                }
                if (checkCityName && priceOption.itemLocationQuantity.applicableTerritoryAddress[0].cityName.toLocaleLowerCase() != this.deliveryLocation.cityName.toLocaleLowerCase()) {
                    continue;
                }
                if (checkRegion && priceOption.itemLocationQuantity.applicableTerritoryAddress[0].region.toLocaleLowerCase() != this.deliveryLocation.region.toLocaleLowerCase()) {
                    continue;
                }
                if (checkCountryName && priceOption.itemLocationQuantity.applicableTerritoryAddress[0].country.name.value.toLocaleLowerCase() != this.deliveryLocation.country.name.value.toLocaleLowerCase()) {
                    continue;
                }
                // the delivery location satisfies all conditions
                priceOption.discount = this.calculateDiscountAmount(priceOption, totalPrice);
                totalDiscount += priceOption.discount;
                // add this discount to appliedDiscounts list
                this.appliedDiscounts.push(priceOption);
            }
        }

        // add the individual discounts
        totalDiscount += totalMinimumOrderQuantityDiscount;
        totalDiscount += totalDeliveryPeriodDiscount;

        if(minimumOrderQuantityPriceOption != null){
            minimumOrderQuantityPriceOption.discount = totalMinimumOrderQuantityDiscount;
            this.appliedDiscounts.push(minimumOrderQuantityPriceOption);
        }
        if(deliveryPeriodPriceOption != null){
            deliveryPeriodPriceOption.discount = totalDeliveryPeriodDiscount;
            this.appliedDiscounts.push(deliveryPeriodPriceOption);
        }

        // discounts affect the itemPrice.value only if the flag is enabled, otherwise even if the price is negotiated or
        // a predefined price value is set (e.g. via frame contracts)
        /*if(this.updatePriceWithDiscount) {
            this.itemPrice.value = (totalPrice - totalDiscount) / this.orderedQuantity.value;
        */

        // if PriceWrapper has a quotation price, then we have to update it with the calculated total price
        // if(this.quotationLinePriceWrapper.price){
        //     this.quotationLinePriceWrapper.price.priceAmount.value = this.itemPrice.value;
        //
        //     this.quotationDeliveryPeriodUpdated = false;
        //     this.quotationIncotermUpdated = false;
        //     this.quotationPaymentMeansUpdated = false;
        // }

        return totalPrice - totalDiscount;
    }

    private calculateDiscountAmount(priceOption:PriceOption,totalPrice:number): number{
        let discount = 0;

        // total price
        if(priceOption.itemLocationQuantity.allowanceCharge[0].amount && priceOption.itemLocationQuantity.allowanceCharge[0].amount.value){
            // unit is %
            if(priceOption.itemLocationQuantity.allowanceCharge[0].amount.currencyID == "%"){
                discount += totalPrice*priceOption.itemLocationQuantity.allowanceCharge[0].amount.value/100.0;
            }
            // unit is not %
            else {
                discount += priceOption.itemLocationQuantity.allowanceCharge[0].amount.value;
            }
        }
        // per unit
        else if(priceOption.itemLocationQuantity.allowanceCharge[0].perUnitAmount.value){
            discount += priceOption.itemLocationQuantity.allowanceCharge[0].perUnitAmount.value * this.orderedQuantity.value;
        }

        return discount;
    }

    // checks whether there's a price option for the selected property value or not
    private existenceOfPriceOptionForPropertyValue(priceOptionPropertyValues:Text[],selectedPropertyValue:Text):boolean{
        for(let property of priceOptionPropertyValues){
            if(property.value == selectedPropertyValue.value && property.languageID == selectedPropertyValue.languageID){
                return true;
            }
        }
        return false;
    }

    private roundPrice(value: number): number {
        return Math.round(value * 100) / 100;
    }
}