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
import { Extension } from './extension';
import { LangString } from './langString';

export interface Referable { 
    displayNames?: Array<LangString>;
    idShort?: string;
    descriptions?: Array<LangString>;
    category?: string;
    checksum?: string;
    extensions?: Array<Extension>;
}