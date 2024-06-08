import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private _messageEvent: EventEmitter<string>;

  constructor() {
    this._messageEvent= new EventEmitter();
  }

  getMessageEvent(): EventEmitter<string> {
    return this._messageEvent;
  }

  showMessage(message: string) {
    this._messageEvent.emit(message);
  }
}
