/**
 * the Info
 * infodescription
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { DataSpecification } from './dataSpecification';
import { Extension } from './extension';
import { LangString } from './langString';
import { Qualifier } from './qualifier';
import { Reference } from './reference';

export interface SubmodelElement { 
    dataSpecifications?: Array<Reference>;
    embeddedDataSpecifications?: Array<DataSpecification>;
    supplementalSemanticIds?: Array<Reference>;
    semanticId?: Reference;
    kind?: SubmodelElement.KindEnum;
    displayNames?: Array<LangString>;
    idShort?: string;
    descriptions?: Array<LangString>;
    category?: string;
    checksum?: string;
    extensions?: Array<Extension>;
    qualifiers?: Array<Qualifier>;
}
export namespace SubmodelElement {
    export type KindEnum = 'Instance' | 'Template';
    export const KindEnum = {
        Instance: 'Instance' as KindEnum,
        Template: 'Template' as KindEnum
    };
}