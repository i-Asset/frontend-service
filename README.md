# Frontend Service

Frontend Services for the i-Asset Platform. Forked from nimble-platform frontend-service.

## Development

The complete frontend is developed with [Angular](https://angular.io) in TypeScript.

### With Node.js (aka. full development)

For development purposes it is advisable to set up [Node.js](https://nodejs.org/en/download/) on your machine since it delivers all possibly required functionality and provides way faster build cycles.

The following versions are used for deployment:

- Node.js: 10.16.0
- NPM: 6.9.0

In order to install all the dependencies execute

```shell
npm install
```

In order to build the resources execute

```shell
npm run build:dev
```

for the development build or

```shell
npm run build:production
```

for the production build

In order to start the webpack-dev-server (any file changes will be deployed on the fly during development) execute

```shell
npm run start
```

The port can be adapted in package.json (default is 9092).

### Without Node.js (aka. basic development / debugging only)

In case you don't want / need to set up a full-stack Node.js on your machine you can execute

```shell
mvn clean install
```

in order to install all the dependencies using a minified Node.js version pulled by Maven.

You can mount the generated WAR file on your preferred server or directly on Tomcat using Maven

```shell
mvn tomcat7:run-war
```

The port can be adapted in pom.xml (default is 9092).

## Deployment

### Local / Non-cloud

In order to install all the dependencies and build the WAR file (see target/frontend-service.war) for local deployment execute

```shell
mvn clean install
```

You can mount the WAR file on your preferred server or directly on Tomcat using Maven

```shell
mvn tomcat7:run-war
```

The port can be adapted in pom.xml (default is 9092).

### Docker / Cloud

In order to build the docker image execute

```shell
./deploy.sh docker-build
```

Alternative:

```shell
mvn clean install
docker build -t iassetplatform/frontend-service ./target
```

In order to run the docker image execute

```shell
./deploy.sh docker-run
```

Alternative:

```shell
docker run -it --rm -p 9092:8080 --name iassetplatform_frontend-service iassetplatform/frontend-service
```

### Environments

There are various environment files for different build configurations. By default src/app/globals.ts and src/global-styles.css are used.

In case you want to build using a different environment file (see src/environments/globals.[ENVIRONMENT].ts and src/environments/global-styles.[ENVIRONMENT].css) execute

```shell
mvn clean install -Denv=[ENVIRONMENT]
```

or

```shell
./deploy.sh docker-build [ENVIRONMENT]
```

## Internationalization / Localization

For Internationalization [@ngx-translate/core](https://www.npmjs.com/package/@ngx-translate/core#usage) is used.

Import the TranslateService for every component that requires translations and declare it to the constructor, e.g.

```shell
import {TranslateService} from '@ngx-translate/core';
constructor(private translate: TranslateService){}
```

Also make sure that the AppCommonModule is imported in the corresponding module.

The translations themself have to be added to src/assets/[LANG].json

### Translating text in HTML

In order to translate text in HTML files wrap the text inside a <span> (or other HTML tag) and make sure it does not contain any Angular variable bindings, e.g. convert

```shell
Hello {{user}} - Welcome to the i-Asset platform!
```

to

```shell
<span [innerHTML]="'Hello' | translate"></span> {{user}} - <span [innerHTML]="'Welcome to the i-Asset platform!' | translate"></span>
```

### Translating HTML properties

In order to translate HTML properties (e.g. titles, placeholders, ...) use the following annotation:

```shell
<span [title]="'Some title' | translate"></span>
```

### Translating dynamic values

In order to translate dynamic values or anything coming from TypeScript files use the following annotation:

```shell
this.appComponent.translate.get(['Some text']).subscribe((res: string) => {
    console.log(res);
});
```

The results is a JSON object with the provided keys and the translations as values which can then be referenced, e.g.

```shell
translation = res['Some text'];
```

Make sure the AppComponent is imported and declared for every component that requires translation of dynamic values in the TypeScript files:

```shell
import {AppComponent} from '../app.component';
constructor(private appComponent: AppComponent){}
```

## Beautifying code

For code beautification the [Atom](https://atom.io/) plugin [atom-beautify](https://atom.io/packages/atom-beautify) is used.

The config file .jsbeautifyrc can be found in the project root folder and will get applied automatically when using "Right Click > Beautify File" in Atom.

For even stricter code linting [TSLint](https://www.npmjs.com/package/tslint) can be executed by running the following command:

```shell
npm run lint
```

* * *

# Acknowledgements
The project iAsset has received funding from the BMDW and from FFG by means of the program COIN-NET.

The project is based on results from https://github.com/nimble-platform/frontend-service
