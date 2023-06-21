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
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { AssetAdministrationShell } from '../model/assetAdministrationShell';
import { AssetAdministrationShellDescriptor } from '../model/assetAdministrationShellDescriptor';
import { Submodel } from '../model/submodel';
import { SubmodelDescriptor } from '../model/submodelDescriptor';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class AssetAdministrationShellDirectoryInterfaceForConnectorService {

    protected basePath = '{protocol}://{server}:{port}/{path}';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Obtain the descriptor of an Asset based on it&#x27;s identifier
     * 
     * @param aasIdentifier The Asset Administration Shell’s unique id (UTF8-BASE64-URL-encoded)
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public lookup(aasIdentifier: string, observe?: 'body', reportProgress?: boolean): Observable<AssetAdministrationShellDescriptor>;
    public lookup(aasIdentifier: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<AssetAdministrationShellDescriptor>>;
    public lookup(aasIdentifier: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<AssetAdministrationShellDescriptor>>;
    public lookup(aasIdentifier: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (aasIdentifier === null || aasIdentifier === undefined) {
            throw new Error('Required parameter aasIdentifier was null or undefined when calling lookup.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<AssetAdministrationShellDescriptor>('get',`${this.basePath}/directory/aas/${encodeURIComponent(String(aasIdentifier))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Obtain the descriptor of an Asset based on it&#x27;s identifier
     * 
     * @param aasIdentifier The Asset Administration Shell’s unique id (UTF8-BASE64-URL-encoded)
     * @param submodelIdentifier The Asset Administration Shell’s unique id (UTF8-BASE64-URL-encoded)
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public lookup1(aasIdentifier: string, submodelIdentifier: string, observe?: 'body', reportProgress?: boolean): Observable<SubmodelDescriptor>;
    public lookup1(aasIdentifier: string, submodelIdentifier: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<SubmodelDescriptor>>;
    public lookup1(aasIdentifier: string, submodelIdentifier: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<SubmodelDescriptor>>;
    public lookup1(aasIdentifier: string, submodelIdentifier: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (aasIdentifier === null || aasIdentifier === undefined) {
            throw new Error('Required parameter aasIdentifier was null or undefined when calling lookup1.');
        }

        if (submodelIdentifier === null || submodelIdentifier === undefined) {
            throw new Error('Required parameter submodelIdentifier was null or undefined when calling lookup1.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<SubmodelDescriptor>('get',`${this.basePath}/directory/aas/${encodeURIComponent(String(aasIdentifier))}/submodel/${encodeURIComponent(String(submodelIdentifier))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Regester a new AssetAdministrationShell Descriptor
     * 
     * @param body 
     * @param aasIdentifier The Asset Administration Shell’s unique id (UTF8-BASE64-URL-encoded)
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public register(body: AssetAdministrationShell, aasIdentifier: string, observe?: 'body', reportProgress?: boolean): Observable<AssetAdministrationShell>;
    public register(body: AssetAdministrationShell, aasIdentifier: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<AssetAdministrationShell>>;
    public register(body: AssetAdministrationShell, aasIdentifier: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<AssetAdministrationShell>>;
    public register(body: AssetAdministrationShell, aasIdentifier: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling register.');
        }

        if (aasIdentifier === null || aasIdentifier === undefined) {
            throw new Error('Required parameter aasIdentifier was null or undefined when calling register.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<AssetAdministrationShell>('post',`${this.basePath}/directory/aas/${encodeURIComponent(String(aasIdentifier))}`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Add a SubmodelDescriptor to an existing AssetAdministrationShell Descriptor
     * 
     * @param body 
     * @param aasIdentifier The Asset Administration Shell’s unique id (UTF8-BASE64-URL-encoded)
     * @param submodelIdentifier The Submodel&#x27;s unique id (UTF8-BASE64-URL-encoded)
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public register1(body: SubmodelDescriptor, aasIdentifier: string, submodelIdentifier: string, observe?: 'body', reportProgress?: boolean): Observable<Submodel>;
    public register1(body: SubmodelDescriptor, aasIdentifier: string, submodelIdentifier: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Submodel>>;
    public register1(body: SubmodelDescriptor, aasIdentifier: string, submodelIdentifier: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Submodel>>;
    public register1(body: SubmodelDescriptor, aasIdentifier: string, submodelIdentifier: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling register1.');
        }

        if (aasIdentifier === null || aasIdentifier === undefined) {
            throw new Error('Required parameter aasIdentifier was null or undefined when calling register1.');
        }

        if (submodelIdentifier === null || submodelIdentifier === undefined) {
            throw new Error('Required parameter submodelIdentifier was null or undefined when calling register1.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<Submodel>('post',`${this.basePath}/directory/aas/${encodeURIComponent(String(aasIdentifier))}/submodel/${encodeURIComponent(String(submodelIdentifier))}`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Remove an AssetAdministrationShell Descriptor
     * 
     * @param aasIdentifier The Asset Administration Shell’s unique id (UTF8-BASE64-URL-encoded)
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public unregister(aasIdentifier: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public unregister(aasIdentifier: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public unregister(aasIdentifier: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public unregister(aasIdentifier: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (aasIdentifier === null || aasIdentifier === undefined) {
            throw new Error('Required parameter aasIdentifier was null or undefined when calling unregister.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('delete',`${this.basePath}/directory/aas/${encodeURIComponent(String(aasIdentifier))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Delete a SubmodelDescriptor
     * 
     * @param aasIdentifier The Asset Administration Shell’s unique id (UTF8-BASE64-URL-encoded)
     * @param submodelIdentifier The id&#x27;s of the SubmodelDescriptor to unregister
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public unregister1(aasIdentifier: string, submodelIdentifier: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public unregister1(aasIdentifier: string, submodelIdentifier: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public unregister1(aasIdentifier: string, submodelIdentifier: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public unregister1(aasIdentifier: string, submodelIdentifier: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (aasIdentifier === null || aasIdentifier === undefined) {
            throw new Error('Required parameter aasIdentifier was null or undefined when calling unregister1.');
        }

        if (submodelIdentifier === null || submodelIdentifier === undefined) {
            throw new Error('Required parameter submodelIdentifier was null or undefined when calling unregister1.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('delete',`${this.basePath}/directory/aas/${encodeURIComponent(String(aasIdentifier))}/submodel/${encodeURIComponent(String(submodelIdentifier))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
