'use strict';

// Development variables

export const debug = false;


// Base path variables - SRFG staging

export const base_path = "http://nimble-staging.salzburgresearch.at";
export const ub_base = "http://nimble-staging.salzburgresearch.at/search";
export const simple_search_endpoint="http://nimble-staging.salzburgresearch.at/marmotta/solr/catalogue2";
export const pw_reset_link = "http://nimble-staging.salzburgresearch.at:8080/auth/realms/master/login-actions/reset-credentials?client_id=nimble_client";


// Base path variables - SRFG productive

// export const base_path = "https://nimble-platform.salzburgresearch.at/nimble";
// export const ub_base = "https://nimble-platform.salzburgresearch.at/ub-search";
// export const simple_search_endpoint="https://nimble-platform.salzburgresearch.at/marmotta/solr/catalogue2";
// export const pw_reset_link = "https://nimble-platform.salzburgresearch.at:8080/auth/realms/master/login-actions/reset-credentials?client_id=nimble_client";


// Base path variables - SRFG K8S

// export const base_path = "https://nimble.salzburgresearch.at";
// export const ub_base = "https://hydra2.ikap.biba.uni-bremen.de:8443";
// export const simple_search_endpoint="https://nimble-platform.salzburgresearch.at/marmotta/solr/catalogue2";
// export const pw_reset_link = "https://nimble-platform.salzburgresearch.at:8080/auth/realms/master/login-actions/reset-credentials?client_id=nimble_client";


// Base path variabled - K8S domain

// export const base_path = "http://nimble.uk-south.containers.mybluemix.net";
// export const ub_base = "https://hydra2.ikap.biba.uni-bremen.de:8443";
// export const simple_search_endpoint="https://nimble-platform.salzburgresearch.at/marmotta/solr/catalogue2";
// export const pw_reset_link = "https://nimble-platform.salzburgresearch.at:8080/auth/realms/master/login-actions/reset-credentials?client_id=nimble_client";


// Base path variables - Local development via service discovery

// export const base_path = "http://localhost";
// export const ub_base = "http://localhost:8090";
// export const simple_search_endpoint="http://localhost:8082/solr/catalogue2";
// export const pw_reset_link = "http://localhost:8080/auth/realms/master/login-actions/reset-credentials?client_id=nimble_client";


// Service endpoints

export const user_mgmt_endpoint=`${base_path}/identity`;
export const catalogue_endpoint=`${base_path}/catalog`;
export const bpe_endpoint=`${base_path}/business-process`;
export const data_channel_endpoint=`${base_path}/data-channel`;
export const data_aggregation_endpoint=`${base_path}/data-aggregation`;
export const trust_service_endpoint=`${base_path}/trust`;


// BIBA endpoints

export const languageEndPoint = `${ub_base}/getSupportedLanguages`;
export const endpoint = `${ub_base}/detectMeaningLanguageSpecific`;
export const logicalViewEndpoint = `${ub_base}/getLogicalView`;
export const propertyEndPoint = `${ub_base}/getPropertyValuesDiscretised`;
export const sparqlEndPoint = `${ub_base}/executeSPARQLSelect`;
export const sparqlOptionalSelectEndPoint = `${ub_base}/executeSPARQLOptionalSelect`;
export const spqButton = `${ub_base}/getSQPFromOrangeGroup`;
export const obs_propFromConcept = `${ub_base}/getPropertyFromConcept`;
export const obs_propValueFromConcept = `${ub_base}/getPropertyValuesFromGreenGroup`;
export const referenceFromConcept = `${ub_base}/getReferencesFromAConcept`;
export const sqpOrangeConcept = `${ub_base}/getPropertyValuesFromOrangeGroup`;


// TnT Endpoints

export const tntEndpoint = `${bpe_endpoint}/t-t/epc-details`;
export const tntAnalysisEndpoint = `${base_path}/tnt/simpleTrackingAnalysis`;


// Platform Configuration

export const config = {
  "companyRegistrationRequired": false,
  "categoryFilter": {
    "eClass": {
      "hiddenCategories": [],
      "logisticsCategory": "14000000",
      "ontologyPrefix": "http://www.nimble-project.org/resource/eclass/"
    },
    "FurnitureOntology": {
      "hiddenCategories": ["Catalogue","Company","ContactPerson","Guarantee","Price","Process","Standard","Style","Technique"],
      "logisticsCategory": "LogisticsService",
      "ontologyPrefix": "http://www.aidimme.es/FurnitureSectorOntology.owl#"
    }
  },
  "imprint": "<u>Platform Owner & Provider</u><br/><b>Salzburg Research Forschungsgesellschaft m.b.H.</b><br/>Jakob Haringer Straße 5/3<br/>5020 Salzburg, Austria<br/>Phone: +43.662.2288.200<br/>Fax: +43.662.2288.222<br/>E-Mail: <a href='mailto:info@salzburgresearch.at'>info@salzburgresearch.at</a><br/>Internet: <a href='https://www.salzburgresearch.at' target='_blank'>www.salzburgresearch.at</a><br/>Managing Director: Siegfried Reich<br/>Registry Number: LG Salzburg (FN 149016 t)<br/>UID: ATU 41145408<br/>Content Officer: Siegfried Reich<br/>Owner: State of Salzburg (100%)",
  "logoPath": "./assets/logo_mvp.png",
  "logoRequired": false,
  "requiredAgreements": [
    {
      "title":"End-User License Agreement (EULA)",
      "src":"./assets/eula.pdf"
    }
  ],
  "showCompanyMembers": false,
  "showExplorative": true,
  "showPPAP": true,
  "showTrack": true,
  "showTrade": true,
  "showVerification": true,
  "standardTaxonomy": "All",
  "supportedActivitySectors": {
  	"": [],
  	"Logistics Provider": [],
  	"Manufacturer": [],
  	"Service Provider": [],
  	"Other": []
  },
  "supportedBusinessTypes": [
  	"",
  	"Logistics Provider",
  	"Manufacturer",
  	"Service Provider",
  	"Other"
  ],
  "supportedCertificates": [
      "Appearance Approval Report",
      "Checking Aids",
      "Control Plan",
      "Customer Engineering Approval",
      "Customer Specific Requirements",
      "Design Documentation",
      "Design Failure Mode and Effects Analysis",
      "Dimensional Results",
      "Engineering Change Documentation",
      "Initial Process Studies",
      "Master Sample",
      "Measurement System Analysis Studies",
      "Part Submission Warrant",
      "Process Failure Mode and Effects Analysis",
      "Process Flow Diagram",
      "Qualified Laboratory Documentation",
      "Records of Material / Performance Tests",
      "Sample Production Parts",
      "Other"
  ],
  "supportedRoles": [
      "company_admin",
      "external_representative",
      "legal_representative",
      "monitor",
      "publisher",
      "purchaser",
      "sales_officer"
  ],
  "supportMail": "nimble-support@salzburgresearch.at"
};


// Catalogue format variables

export const product_name = "item_name";
export const product_vendor_id = "item_manufacturer_id";
export const product_vendor_name = "item_manufacturer_name";
export const product_vendor_rating = "trust_company_rating";
export const product_vendor_rating_seller = "trust_company_seller_communication";
export const product_vendor_rating_fulfillment = "trust_company_fulfillment_of_terms";
export const product_vendor_rating_delivery = "trust_company_delivery_packaging";
export const product_vendor_trust = "trust_company_trust_score";
export const product_img = "item_image";
export const product_price = "item_price";
export const product_currency = "item_price_currency";
export const product_cat = "item_commodity_classification";
export const product_cat_mix = "item_commodity_classification_mix";
export const product_filter_prod = ["item_free_of_charge_indicator","item_certificate","item_applicable_countries"];
export const product_filter_comp = ["item_manufacturer_name","item_manufacturer_origin","manufacturer_certificate","manufacturer_ppap_compliance_level","manufacturer_ppap_document"];
export const product_filter_trust = ["trust_company_trust_score","trust_company_rating","trust_company_seller_communication","trust_company_fulfillment_of_terms","trust_company_delivery_packaging"];
export const product_filter_mappings = {
  "item_price": "Price",
  "item_currency": "Currency",
  "item_free_of_charge_indicator": "Free Sample",
  "item_certificate": "Product / Service Certificate",
  "item_applicable_countries": "Destination Country",
  "item_manufacturer_name": "Vendor Name",
  "item_manufacturer_origin": "Vendor Origin",
  "manufacturer_certificate": "Vendor Certificate",
  "manufacturer_ppap_compliance_level": "PPAP Compliance Level",
  "manufacturer_ppap_document": "PPAP Document",
  "trust_company_trust_score": "Trust Score",
  "trust_company_rating": "Overall Rating",
  "trust_company_seller_communication": "Seller Communication",
  "trust_company_fulfillment_of_terms": "Fulfillment of Terms",
  "trust_company_delivery_packaging": "Delivery & Packaging"
};
export const product_nonfilter_full = ["id","_version_","item_description","item_price","item_price_currency","item_commodity_classification_code","item_commodity_classification_uri","item_properties"];
export const product_nonfilter_regex = ["lmf.","_id"];
export const product_configurable = [];
export const product_default = {};
export const facet_min = 1;
export const negotiatables = ["size", "duration"];
