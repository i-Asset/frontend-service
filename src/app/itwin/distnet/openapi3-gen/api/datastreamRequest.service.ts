/**
 * Distribution Network Service API
 * API documentation for the Distribution Network's API.
 *
 * OpenAPI spec version: 1.0.1
 * Contact: christoph.schranz@salzburgresearcht.at
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

import { DatastreamBody } from '../model/datastreamBody';
import { Datastreams } from '../model/datastreams';
import { Status } from '../model/status';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class DatastreamRequestService {

    protected basePath = 'https://iasset.salzburgresearch.at/';
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
     * Return all datastreams that belong to a client application of a system
     * 
     * @param personId User ID from the identity service
     * @param system identifier with &#x27;_&#x27; as level separator
     * @param clientName client app name
     * @param authorization Bearer token
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public distributionnetworkDatastreamsPerClientPersonIdSystemClientNameGet(personId: number, system: string, clientName: string, authorization: string, observe?: 'body', reportProgress?: boolean): Observable<Datastreams>;
    public distributionnetworkDatastreamsPerClientPersonIdSystemClientNameGet(personId: number, system: string, clientName: string, authorization: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Datastreams>>;
    public distributionnetworkDatastreamsPerClientPersonIdSystemClientNameGet(personId: number, system: string, clientName: string, authorization: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Datastreams>>;
    public distributionnetworkDatastreamsPerClientPersonIdSystemClientNameGet(personId: number, system: string, clientName: string, authorization: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (personId === null || personId === undefined) {
            throw new Error('Required parameter personId was null or undefined when calling distributionnetworkDatastreamsPerClientPersonIdSystemClientNameGet.');
        }

        if (system === null || system === undefined) {
            throw new Error('Required parameter system was null or undefined when calling distributionnetworkDatastreamsPerClientPersonIdSystemClientNameGet.');
        }

        if (clientName === null || clientName === undefined) {
            throw new Error('Required parameter clientName was null or undefined when calling distributionnetworkDatastreamsPerClientPersonIdSystemClientNameGet.');
        }

        if (authorization === null || authorization === undefined) {
            throw new Error('Required parameter authorization was null or undefined when calling distributionnetworkDatastreamsPerClientPersonIdSystemClientNameGet.');
        }

        let headers = this.defaultHeaders;
        if (authorization !== undefined && authorization !== null) {
            headers = headers.set('Authorization', String(authorization));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Datastreams>('get',`${this.basePath}/distributionnetwork/datastreams_per_client/${encodeURIComponent(String(personId))}/${encodeURIComponent(String(system))}/${encodeURIComponent(String(clientName))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Return all datastreams that belong to a thing of a system
     * 
     * @param personId User ID from the identity service
     * @param system identifier with &#x27;_&#x27; as level separator
     * @param thingName thing name
     * @param authorization Bearer token
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public distributionnetworkDatastreamsPerThingPersonIdSystemThingNameGet(personId: number, system: string, thingName: string, authorization: string, observe?: 'body', reportProgress?: boolean): Observable<Datastreams>;
    public distributionnetworkDatastreamsPerThingPersonIdSystemThingNameGet(personId: number, system: string, thingName: string, authorization: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Datastreams>>;
    public distributionnetworkDatastreamsPerThingPersonIdSystemThingNameGet(personId: number, system: string, thingName: string, authorization: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Datastreams>>;
    public distributionnetworkDatastreamsPerThingPersonIdSystemThingNameGet(personId: number, system: string, thingName: string, authorization: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (personId === null || personId === undefined) {
            throw new Error('Required parameter personId was null or undefined when calling distributionnetworkDatastreamsPerThingPersonIdSystemThingNameGet.');
        }

        if (system === null || system === undefined) {
            throw new Error('Required parameter system was null or undefined when calling distributionnetworkDatastreamsPerThingPersonIdSystemThingNameGet.');
        }

        if (thingName === null || thingName === undefined) {
            throw new Error('Required parameter thingName was null or undefined when calling distributionnetworkDatastreamsPerThingPersonIdSystemThingNameGet.');
        }

        if (authorization === null || authorization === undefined) {
            throw new Error('Required parameter authorization was null or undefined when calling distributionnetworkDatastreamsPerThingPersonIdSystemThingNameGet.');
        }

        let headers = this.defaultHeaders;
        if (authorization !== undefined && authorization !== null) {
            headers = headers.set('Authorization', String(authorization));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Datastreams>('get',`${this.basePath}/distributionnetwork/datastreams_per_thing/${encodeURIComponent(String(personId))}/${encodeURIComponent(String(system))}/${encodeURIComponent(String(thingName))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Return all datastreams that belong to a system
     * 
     * @param personId User ID from the identity service
     * @param system identifier with &#x27;_&#x27; as level separator
     * @param authorization Bearer token
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public distributionnetworkDatastreamsPersonIdSystemGet(personId: number, system: string, authorization: string, observe?: 'body', reportProgress?: boolean): Observable<Datastreams>;
    public distributionnetworkDatastreamsPersonIdSystemGet(personId: number, system: string, authorization: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Datastreams>>;
    public distributionnetworkDatastreamsPersonIdSystemGet(personId: number, system: string, authorization: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Datastreams>>;
    public distributionnetworkDatastreamsPersonIdSystemGet(personId: number, system: string, authorization: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (personId === null || personId === undefined) {
            throw new Error('Required parameter personId was null or undefined when calling distributionnetworkDatastreamsPersonIdSystemGet.');
        }

        if (system === null || system === undefined) {
            throw new Error('Required parameter system was null or undefined when calling distributionnetworkDatastreamsPersonIdSystemGet.');
        }

        if (authorization === null || authorization === undefined) {
            throw new Error('Required parameter authorization was null or undefined when calling distributionnetworkDatastreamsPersonIdSystemGet.');
        }

        let headers = this.defaultHeaders;
        if (authorization !== undefined && authorization !== null) {
            headers = headers.set('Authorization', String(authorization));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Datastreams>('get',`${this.basePath}/distributionnetwork/datastreams/${encodeURIComponent(String(personId))}/${encodeURIComponent(String(system))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create new datastreams for a system that belongs to a person.
     * 
     * @param body An array of datastream objects to create.
     * @param authorization Bearer token
     * @param personId User ID from the identity service
     * @param system identifier with &#x27;_&#x27; as level separator
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public distributionnetworkDatastreamsPersonIdSystemPost(body: Array<DatastreamBody>, authorization: string, personId: number, system: string, observe?: 'body', reportProgress?: boolean): Observable<Datastreams>;
    public distributionnetworkDatastreamsPersonIdSystemPost(body: Array<DatastreamBody>, authorization: string, personId: number, system: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Datastreams>>;
    public distributionnetworkDatastreamsPersonIdSystemPost(body: Array<DatastreamBody>, authorization: string, personId: number, system: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Datastreams>>;
    public distributionnetworkDatastreamsPersonIdSystemPost(body: Array<DatastreamBody>, authorization: string, personId: number, system: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling distributionnetworkDatastreamsPersonIdSystemPost.');
        }

        if (authorization === null || authorization === undefined) {
            throw new Error('Required parameter authorization was null or undefined when calling distributionnetworkDatastreamsPersonIdSystemPost.');
        }

        if (personId === null || personId === undefined) {
            throw new Error('Required parameter personId was null or undefined when calling distributionnetworkDatastreamsPersonIdSystemPost.');
        }

        if (system === null || system === undefined) {
            throw new Error('Required parameter system was null or undefined when calling distributionnetworkDatastreamsPersonIdSystemPost.');
        }

        let headers = this.defaultHeaders;
        if (authorization !== undefined && authorization !== null) {
            headers = headers.set('Authorization', String(authorization));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
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

        return this.httpClient.request<Datastreams>('post',`${this.basePath}/distributionnetwork/datastreams/${encodeURIComponent(String(personId))}/${encodeURIComponent(String(system))}`,
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
     * Create or update datastreams for a system that belongs to a person.
     * 
     * @param body An array of datastream objects to create.
     * @param authorization Bearer token
     * @param personId User ID from the identity service
     * @param system identifier with &#x27;_&#x27; as level separator
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public distributionnetworkDatastreamsPersonIdSystemPut(body: Array<DatastreamBody>, authorization: string, personId: number, system: string, observe?: 'body', reportProgress?: boolean): Observable<Datastreams>;
    public distributionnetworkDatastreamsPersonIdSystemPut(body: Array<DatastreamBody>, authorization: string, personId: number, system: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Datastreams>>;
    public distributionnetworkDatastreamsPersonIdSystemPut(body: Array<DatastreamBody>, authorization: string, personId: number, system: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Datastreams>>;
    public distributionnetworkDatastreamsPersonIdSystemPut(body: Array<DatastreamBody>, authorization: string, personId: number, system: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling distributionnetworkDatastreamsPersonIdSystemPut.');
        }

        if (authorization === null || authorization === undefined) {
            throw new Error('Required parameter authorization was null or undefined when calling distributionnetworkDatastreamsPersonIdSystemPut.');
        }

        if (personId === null || personId === undefined) {
            throw new Error('Required parameter personId was null or undefined when calling distributionnetworkDatastreamsPersonIdSystemPut.');
        }

        if (system === null || system === undefined) {
            throw new Error('Required parameter system was null or undefined when calling distributionnetworkDatastreamsPersonIdSystemPut.');
        }

        let headers = this.defaultHeaders;
        if (authorization !== undefined && authorization !== null) {
            headers = headers.set('Authorization', String(authorization));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
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

        return this.httpClient.request<Datastreams>('put',`${this.basePath}/distributionnetwork/datastreams/${encodeURIComponent(String(personId))}/${encodeURIComponent(String(system))}`,
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
     * Delete datastreams from from a system
     * 
     * @param body An array of datastream shortnames to delete.
     * @param authorization Bearer token
     * @param personId User ID from the identity service
     * @param system identifier with &#x27;_&#x27; as level separator
     * @param thingName name of the thing the datastream belongs to
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public distributionnetworkDeleteDatastreamsPersonIdSystemThingNameDelete(body: Array<string>, authorization: string, personId: number, system: string, thingName: string, observe?: 'body', reportProgress?: boolean): Observable<Status>;
    public distributionnetworkDeleteDatastreamsPersonIdSystemThingNameDelete(body: Array<string>, authorization: string, personId: number, system: string, thingName: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Status>>;
    public distributionnetworkDeleteDatastreamsPersonIdSystemThingNameDelete(body: Array<string>, authorization: string, personId: number, system: string, thingName: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Status>>;
    public distributionnetworkDeleteDatastreamsPersonIdSystemThingNameDelete(body: Array<string>, authorization: string, personId: number, system: string, thingName: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling distributionnetworkDeleteDatastreamsPersonIdSystemThingNameDelete.');
        }

        if (authorization === null || authorization === undefined) {
            throw new Error('Required parameter authorization was null or undefined when calling distributionnetworkDeleteDatastreamsPersonIdSystemThingNameDelete.');
        }

        if (personId === null || personId === undefined) {
            throw new Error('Required parameter personId was null or undefined when calling distributionnetworkDeleteDatastreamsPersonIdSystemThingNameDelete.');
        }

        if (system === null || system === undefined) {
            throw new Error('Required parameter system was null or undefined when calling distributionnetworkDeleteDatastreamsPersonIdSystemThingNameDelete.');
        }

        if (thingName === null || thingName === undefined) {
            throw new Error('Required parameter thingName was null or undefined when calling distributionnetworkDeleteDatastreamsPersonIdSystemThingNameDelete.');
        }

        let headers = this.defaultHeaders;
        if (authorization !== undefined && authorization !== null) {
            headers = headers.set('Authorization', String(authorization));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            '*/*'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<Status>('delete',`${this.basePath}/distributionnetwork/delete_datastreams/${encodeURIComponent(String(personId))}/${encodeURIComponent(String(system))}/${encodeURIComponent(String(thingName))}`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
