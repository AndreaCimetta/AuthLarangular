import {Injectable, Injector} from '@angular/core';
import {ServiceLocator} from './service-locator.service';
import {StaffService} from '../app/auth/staff.service';

@Injectable()
export class StartupService {


    constructor(private injector: Injector) {
        ServiceLocator.injector = this.injector;
    }

    // Important: It should return a Promise
    load(): Promise<any> {
        // const staffService = this.injector.get(StaffService);
        // const globalService = this.injector.get(GlobalService);

        return Promise.resolve(true);

        // try {
        //     if (staffService.isLoggedIn()) {
        //         globalService.setCompanyIdValue(staffService.getUserData().operator.companyId)
        //         return new Promise<boolean>((resolve, reject) => {
        //             this.appConfigDataservice.refreshGlobalConfig().then(result => {
        //                 resolve(result)
        //             }, error => {
        //                 staffService.invalidateSession(error);
        //                 reject(error);
        //             });
        //
        //         });
        //     } else {
        //         Promise.resolve(true);
        //     }
        // } catch (e) {
        //     Promise.resolve(true);
        // }

    }

}
