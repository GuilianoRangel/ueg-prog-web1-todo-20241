import {EventEmitter, Injectable} from '@angular/core';
import {DataMessageConfirm} from "./data-message-confirm";

export type ActionListener = () => void;

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private _messageEvent: EventEmitter<string>;

  private _messageConfirm: EventEmitter<DataMessageConfirm>

  constructor() {
    this._messageEvent= new EventEmitter();
    this._messageConfirm = new EventEmitter();
  }

  getMessageEvent(): EventEmitter<string> {
    return this._messageEvent;
  }

  getMessageConfirm(): EventEmitter<DataMessageConfirm>{
    return this._messageConfirm;
  }

  showMessage(message: string) {
    this._messageEvent.emit(message);
  }

  showMessageConfirm(dataConfirm: DataMessageConfirm){
    if(!dataConfirm.okLabel){
      dataConfirm.okLabel='Confirmar!';
    }
    if(!dataConfirm.cancelLabel){
      dataConfirm.cancelLabel="Cancelar!";
    }
    this._messageConfirm.emit(dataConfirm);
  }
}
