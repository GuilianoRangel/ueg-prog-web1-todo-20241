import {Component, Inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardTitle} from "@angular/material/card";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from "@angular/material/dialog";
import {DataMessageConfirm} from "../data-message-confirm";

@Component({
  selector: 'app-dialog-message-confirm',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardTitle,
    MatDialogContent,
    MatDialogClose,
    MatDialogActions
  ],
  templateUrl: './dialog-message-confirm.component.html',
  styleUrl: './dialog-message-confirm.component.scss'
})
export class DialogMessageConfirmComponent {
  public dataConfirm : DataMessageConfirm;
  constructor(
    private dialogRef: MatDialogRef<DialogMessageConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) data: DataMessageConfirm)
  {
    this.dataConfirm = data;
    this.dataConfirm.message = this.dataConfirm.message.replace("\n","<br\>\n");
  }

  ok() {
    if(this.dataConfirm.okAction !== null && this.dataConfirm.okAction !== undefined){
      this.dataConfirm.okAction();
    }
    this.dialogRef.close();
  }

  cancel() {
    if(this.dataConfirm.cancelAction !== null && this.dataConfirm.cancelAction !== undefined){
      this.dataConfirm.cancelAction();
    }
    this.dialogRef.close();
  }
}
