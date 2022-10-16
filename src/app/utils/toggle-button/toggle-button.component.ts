import {Component} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ToggleButtonComponent
    }
  ]
})
export class ToggleButtonComponent implements ControlValueAccessor {

  constructor() { }

  value: boolean = false;

  onChange = (value: boolean) => {};

  onTouched = () => {};

  touched = false;

  disabled = false;

  changeValue(value: boolean) {
    this.markAsTouched();
    if (this.disabled) return;
    this.value = value;
    this.onChange(value);
  }


  ngOnInit(): void {
  }

  writeValue(value: boolean) {
    this.value = value;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

}
