import { FormControl } from '@angular/forms';
import { ValidationErrors } from '@angular/forms/src/directives/validators';

export class EmailValidator {
    static isValid(control: FormControl): ValidationErrors {
        const re = /([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9\-\.]+)\.([a-zA-Z]{2,5})$/.test(control.value);

        if (re) {
            return null;
        }

        return {
            invalidEmail: true
        }
    }
}