import { FitDialogComponent } from "./../FitDialog/FitDialog.component";
import { MdDialog, MdDialogRef, MdSidenav } from "@angular/material";
export declare class FitMediatorComponent {
    private dialog;
    sidenavOpen: boolean;
    notificationMsg: string;
    dialogRef: MdDialogRef<FitDialogComponent>;
    mediatorSidenav: MdSidenav;
    constructor(dialog: MdDialog);
    showFitDialog(): void;
    notify(msg: string): void;
}
