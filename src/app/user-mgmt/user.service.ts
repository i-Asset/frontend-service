import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as myGlobals from '../globals';
import {Party} from "../catalogue/model/publish/party";
import { CompanySettings } from './model/company-settings';
import { UserRegistration } from './model/user-registration';
import { CompanyRegistration } from './model/company-registration';
import {UBLModelUtils} from "../catalogue/model/ubl-model-utils";

@Injectable()
export class UserService {

	private headers = new Headers({'Content-Type': 'application/json'});
	private url = myGlobals.user_mgmt_endpoint;

	userParty: Party;

	constructor(private http: Http) { }

	registerUser(user: UserRegistration): Promise<any> {
		const url = `${this.url}/register/user`;
		return this.http
		.post(url, JSON.stringify(user), {headers: this.headers, withCredentials: true})
		.toPromise()
		.then(res => res.json())
		.catch(this.handleError);
	}

	registerCompany(company: CompanyRegistration, token:string) {
		const url = `${this.url}/register/company`;
		const headers_token = new Headers({'Content-Type': 'application/json', 'Authorization': token});
		const options = new RequestOptions({headers: headers_token, withCredentials: true});
		return this.http
            .post(url, JSON.stringify(company), options)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
	}

	getParty(partyId:string):Promise<Party> {
		const url = `${this.url}/party/${partyId}`;
		return this.http
            .get(url, {headers: this.headers, withCredentials: true})
			.toPromise()
            .catch(err => {
            	if(err.status == 302) {
					let party:Party = err.json();
					UBLModelUtils.removeHjidFieldsFromObject(party);
					return Promise.resolve(party);
				} else {
            		return this.handleError(err);
				}
            });
	}

	getUserParty(userId: string): Promise<Party> {
		if(this.userParty != null) {
			return Promise.resolve(this.userParty);
		}
		const url = `${this.url}/party_by_person/${userId}`;
		return this.http
		.get(url, {headers: this.headers, withCredentials: true})
		.toPromise()
		.then(res => {
			this.userParty = res.json()[0];
			UBLModelUtils.removeHjidFieldsFromObject(this.userParty);
			return Promise.resolve(this.userParty);
		})
		.catch(this.handleError);
	}

    getSettings(userId: string): Promise<CompanySettings> {

        return this.getUserParty(userId).then(party => {
            const url = `${this.url}/company-settings/${party.id}`;
            return this.http
                .get(url, {headers: this.headers, withCredentials: true})
                .toPromise()
                .then(response => response.json() as CompanySettings)
                .catch(this.handleError)
        });
    }

	putSettings(settings: CompanySettings, userId: string): Promise<any> {
		return this.getUserParty(userId).then(party => {
			const url = `${this.url}/company-settings/${party.id}`;
			return this.http
                .put(url, settings, {headers: this.headers, withCredentials: true})
                .toPromise()
                .then(response => response.json())
                .catch(this.handleError)
		});
	}

	resetData():void {
		this.userParty = null;
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}

}