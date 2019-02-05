import { Address } from './address';

export class CompanyDetails {
    constructor(
      public address: Address,
      public businessKeywords: string[],
      public businessType: string,
      public legalName: string,
      public industrySectors: string[],
      public vatNumber: string,
      public verificationInformation: string,
      public yearOfCompanyRegistration: number
    ) {  }
}
