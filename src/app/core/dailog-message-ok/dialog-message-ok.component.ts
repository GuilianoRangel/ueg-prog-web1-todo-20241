import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from "@angular/material/dialog";
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-dailog-message-ok',
  standalone: true,
  imports: [
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardTitle,
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent
  ],
  templateUrl: './dialog-message-ok.component.html',
  styleUrl: './dialog-message-ok.component.scss'
})
export class DialogMessageOkComponent {

  public message : string;
  constructor(
    private dialogRef: MatDialogRef<DialogMessageOkComponent>,
    @Inject(MAT_DIALOG_DATA) data: string)
  {
    this.message = data;
    this.message = this.message.replace("\n","<br\>\n");
  }

  ok() {
    this.dialogRef.close();
  }
}
