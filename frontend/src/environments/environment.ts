// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {NgxLoggerLevel} from 'ngx-logger';

export const environment = {
  production: false,
  envName: 'dev',
  logLevel : NgxLoggerLevel.DEBUG,
  apiHost: 'http://localhost:8000/api',
  whitelistedDomains: ['localhost:8000'],
  blacklistedRoutes: ['www.test.it/api/login'],
  // VERSION: require('../../package.json').version
};

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
