import {ActionListener} from "./message.service";

export class DataMessageConfirm {
  constructor(
    public message: string,
    public okLabel?: string,
    public okAction?: ActionListener,
    public cancelLabel?: string,
    public cancelAction?: ActionListener
  ) {
  }
}
