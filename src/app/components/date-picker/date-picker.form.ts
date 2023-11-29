import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

export class DatePickerForm extends FormGroup {
  constructor(date: Date) {
    super({
      year: new FormControl(date.getFullYear()),
      day: new FormControl(date.getDate()),
      month: new FormControl(date.getMonth())
    });
  }

  get day(): FormControl {
    return this.get('day') as FormControl;
  }

  get month(): FormControl {
    return this.get('month') as FormControl;
  }

  get year(): FormControl {
    return this.get('year') as FormControl;
  }

  public daySubscribe(call: (value: any) => void): Subscription {
    return this.day.valueChanges.subscribe(call);
  }

  public monthSubscribe(call: (value: any) => void): Subscription {
    return this.month.valueChanges.subscribe(call);
  }

  public yearSubscribe(call: (value: any) => void): Subscription {
    return this.year.valueChanges.subscribe(call);
  }
}
