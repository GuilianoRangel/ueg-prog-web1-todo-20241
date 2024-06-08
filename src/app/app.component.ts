import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MessageService} from "./core/message.service";
import {DialogMessageOkComponent} from "./core/dailog-message-ok/dialog-message-ok.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
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
}
