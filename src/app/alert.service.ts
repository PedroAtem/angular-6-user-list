import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatSnackBarConfig } from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    constructor(public snackBar: MatSnackBar) { }

    showAlert(message: string, actionText: string) {
        const verticalPosition: MatSnackBarVerticalPosition = 'bottom';
        const horizontalPosition: MatSnackBarHorizontalPosition = 'center';
        const config = new MatSnackBarConfig();
        config.verticalPosition = verticalPosition;
        config.horizontalPosition = horizontalPosition;
        config.duration = 3000;
        this.snackBar.open(message, actionText, config);
    }
}
