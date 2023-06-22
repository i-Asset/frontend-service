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
import { AdministrativeInformation } from './administrativeInformation';
import { Endpoint } from './endpoint';
import { Extension } from './extension';
import { LangString } from './langString';
import { Reference } from './reference';
import { SpecificAssetId } from './specificAssetId';
import { SubmodelDescriptor } from './submodelDescriptor';

export interface AssetAdministrationShellDescriptor { 
    submodelDescriptors?: Array<SubmodelDescriptor>;
    globalAssetId?: Reference;
    specificAssetId?: SpecificAssetId;
    endpoints?: Array<Endpoint>;
    id?: string;
    administration?: AdministrativeInformation;
    displayNames?: Array<LangString>;
    idShort?: string;
    descriptions?: Array<LangString>;
    category?: string;
    checksum?: string;
    extensions?: Array<Extension>;
}