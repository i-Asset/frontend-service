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
import { Reference } from './reference';

export interface SpecificAssetId { 
    name?: string;
    value?: string;
    externalSubjectId?: Reference;
    supplementalSemanticIds?: Array<Reference>;
    semanticId?: Reference;
}