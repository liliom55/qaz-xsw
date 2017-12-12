import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { FitDialogComponent } from "./../FitDialog/FitDialog.component";
import { MdDialog, MdDialogRef, MdSidenav } from "@angular/material";
import { fitEnvironment } from "./../environments/fitEnvironment";

@Component({
  selector: 'fit-mediator',
  templateUrl: './FitMediator.component.html',
  styleUrls: ['./FitMediator.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FitMediatorComponent {
  sidenavOpen: boolean;
  notificationMsg: string;
  dialogRef: MdDialogRef<FitDialogComponent>;
  @ViewChild('mediatorSidenav') public mediatorSidenav: MdSidenav;
  constructor(private dialog: MdDialog) {

  }

  ngOnInit(){
    this.dialogRef = this.dialog.open(FitDialogComponent, {
      height: fitEnvironment.store.dialogSize.height,
      width: fitEnvironment.store.dialogSize.width
    });
  }

  showFitDialog() {
    this.notificationMsg = "";
    this.mediatorSidenav.close();
    this.dialogRef = this.dialog.open(FitDialogComponent, {
      height: fitEnvironment.store.dialogSize.height,
      width: fitEnvironment.store.dialogSize.width
    });
    this.dialogRef.afterClosed().subscribe(msg => this.notify(msg));
  }

  notify(msg: string) {
    if (msg) {
      this.notificationMsg = msg;
      this.mediatorSidenav.open();
    }
  }

}
