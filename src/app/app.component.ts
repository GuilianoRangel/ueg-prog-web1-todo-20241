import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MessageService} from "./core/message.service";
import {DialogMessageOkComponent} from "./core/dailog-message-ok/dialog-message-ok.component";
import {DataMessageConfirm} from "./core/data-message-confirm";
import {DialogMessageConfirmComponent} from "./core/dialog-message-confirm/dialog-message-confirm.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  appTitle = 'Todo APP';

  private dialogRef!: MatDialogRef<any>;

  constructor(
    private dialog: MatDialog,
    private messageService: MessageService
  ) {
  }
  ngOnInit(): void {
    this.messageService.getMessageEvent().subscribe(value => {
      this.showMessage(value);
    })
    this.messageService.getMessageConfirm().subscribe(value => {
      this.showMessageConfirm(value);
    })
  }
  private showMessage(message: string) {
    this.dialogRef = this.dialog.open(DialogMessageOkComponent, {
      minWidth: "200px",
      minHeight: "100px",
      disableClose: true,
      data: message
    });
    this.dialogRef.afterClosed().subscribe(value => {
      console.log("Botão fechar acionado");
    })
  }
  private showMessageConfirm(dataMessageConfirm: DataMessageConfirm) {
    this.dialogRef = this.dialog.open(DialogMessageConfirmComponent, {
      minWidth: "300px",
      //minHeight: "120px",
      disableClose: true,
      data: dataMessageConfirm
    });
    this.dialogRef.afterClosed().subscribe(value => {
      console.log("Botão fechar acionado");
    })
  }
}
