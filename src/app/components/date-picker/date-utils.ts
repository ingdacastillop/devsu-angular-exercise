export enum DateListenerType {
  Select = 'DateSelect',
  Today = 'DateToday',
  Cancel = 'DateCancel'
}

export interface DateListener {
  name: DateListenerType;
  value?: Date;
}
