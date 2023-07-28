
import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
    
export function MatchPasswordValidator(newPasswordCtrlName: string, confirmPassCtrlName: string) : ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors | null => {
        const newPasswordFormCtrl = formGroup.controls[newPasswordCtrlName];
        const confirmPassFormCtrl = formGroup.controls[confirmPassCtrlName];

        if (confirmPassFormCtrl.errors && !confirmPassFormCtrl.errors.confirmedValidator) {
            return;
        }
        if (newPasswordFormCtrl.value !== confirmPassFormCtrl.value) {
            confirmPassFormCtrl.setErrors({ confirmedValidator: true });// you can take out this line Gosa
            return { confirmedValidator: true };
        } else {
            confirmPassFormCtrl.setErrors(null);
            return null;
        }
    }
}