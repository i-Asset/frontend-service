/**
 * Created by suat on 12-May-17.
 */
import {BinaryObject} from "./binary-object";
import {Code} from "./code";
import {Quantity} from "./quantity";
import { PropertyValueQualifier } from "./property-value-qualifier";

export class ItemProperty {
    constructor(
        public id: string,
        public name: string,
        public value: string[],
        public valueDecimal: number[],
        public valueQuantity:Quantity[],
        public valueBinary:BinaryObject[],
        public valueQualifier: PropertyValueQualifier,
        public itemClassificationCode: Code,
        public uri: string
    ) {  }
}
