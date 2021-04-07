import {FormArray, FormGroup} from '@angular/forms';
// import {TranslationService} from 'angular-l10n';
import {AppConstants} from '../../app-constants';
import {ServerAPIError} from '../../http/base-data-service';
// import {ServiceLocator} from '../../service-locator.service';

export class ViewUtils {
    // public static getFieldsError(formGroup: FormGroup|FormArray, formLabels: string[]): string {
    //     const translation = ServiceLocator.injector.get(TranslationService);
    //
    //     if (!formGroup) {
    //         return '';
    //     }
    //     let msgError = '';
    //     for (const field in formGroup.controls) { // 'field' is a string
    //         const control = formGroup.get(field); // 'control' is a FormControl
    //         if (!control.valid && !control.disabled) {
    //             if (control.errors.min) {
    //                 msgError += translation.translate('Shared.field') + ' <strong>' + formLabels[field] + '</strong> ' + translation.translate('Shared.error-validation-min-value', {minValue: control.errors.min.min}) + '<br/>';
    //             } else if (control.errors.max) {
    //                 msgError += translation.translate('Shared.field') + ' <strong>' + formLabels[field] + '</strong> ' + translation.translate('Shared.error-validation-max-value', {minValue: control.errors.max.max}) + '<br/>';
    //             } else if (control.errors.required) {
    //                 msgError += translation.translate('Shared.field') + ' <strong>' + formLabels[field] + '</strong> ' + translation.translate('Shared.error-validation-required') + '<br/>';
    //             } else if (control.errors.email) {
    //                 msgError += translation.translate('Shared.field') + ' <strong>' + formLabels[field] + '</strong> ' + translation.translate('Shared.error-validation-email') + '<br/>';
    //             } else if (control.errors.password) {
    //                 msgError += translation.translate('Shared.field') + ' <strong>' + formLabels[field] + '</strong> ' + translation.translate('Shared.error-validation-password', {minLengthPwd: AppConstants.MIN_LENGTH_PWD}) + '<br/>';
    //             } else if (control.errors.minLength) {
    //                 msgError += translation.translate('Shared.field') + ' <strong>' + formLabels[field] + '</strong> ' + translation.translate('Shared.error-validation-min-length', {minLength: control.errors.minLength.minLength}) + '<br/>';
    //             } else if (control.errors.maxLength) {
    //                 msgError += translation.translate('Shared.field') + ' <strong>' + formLabels[field] + '</strong> ' + translation.translate('Shared.error-validation-max-length', {maxLength: control.errors.maxLength.maxLength}) + '<br/>';
    //             } else {
    //                 msgError += translation.translate('Shared.field') + ' <strong>' + formLabels[field] + '</strong> ' + translation.translate('Shared.not-valid') + '<br/>';
    //             }
    //         }
    //     }
    //     return msgError;
    // }

    public static decodeApplicationError(error: ServerAPIError, formLabels?: string[]): string {
        let errorMsg = '';

        // const translation = ServiceLocator.injector.get(TranslationService); // TODO-AC: da gestire

        if (error.status > 0)
            // errorMsg += ' <strong>' + translation.translate('Shared.api-error-' + error.code) + '</strong> ' + '<br/>'; // TODO-AC: da gestire
            errorMsg += ' <strong>' + error.status + '</strong> ' + '<br/>';
        if (error.status === AppConstants.API_VALIDATION_ERROR_CODE) {
            const msg = error.getJSONMessage();
            const tmpMsgs = {};
            for (const key in msg) {
                // skip loop if the property is from prototype
                if (!msg.hasOwnProperty(key)) {
                    continue;
                }

                const message = msg[key];
                tmpMsgs[message] = message;
            }

            for (const key in tmpMsgs) {
                if (key !== '*') {
                    // if (formLabels)
                    //      errorMsg += translation.translate('Shared.field') + ' <strong>' + formLabels[key] + '</strong> ' + message + '<br/>';
                    // else
                    errorMsg += key + '<br/>';
                } else {
                    errorMsg += key + '<br/>';
                }
            }

        } else if (error.status === 0) {
            errorMsg += error.message;
        }

        return errorMsg;
    }

    public static markFormGroupTouched(formGroup: FormGroup) { // mark as Touched each field to indicate invalid date
        (<any>Object).values(formGroup.controls).forEach(control => {
            control.markAsTouched();

            if (control.controls) {
                control.controls.forEach(c => ViewUtils.markFormGroupTouched(c));
            }
        });
    }

    public static markFormGroupUntouched(formGroup: FormGroup) { // mark as Touched each field to indicate invalid date
        (<any>Object).values(formGroup.controls).forEach(control => {
            control.markAsUntouched();

            if (control.controls) {
                control.controls.forEach(c => ViewUtils.markFormGroupUntouched(c));
            }
        });
    }

    public static markFormGroupPristine(formGroup: FormGroup) { // mark as Touched each field to indicate invalid date
        (<any>Object).values(formGroup.controls).forEach(control => {
            control.markAsPristine();

            if (control.controls) {
                control.controls.forEach(c => ViewUtils.markFormGroupPristine(c));
            }
        });
    }
}
