import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'app-turn-generate',
  templateUrl: './turn-generate.component.html',
})

export class TurnGenerateComponent {
  public turnForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _bottomSheetRef: MatBottomSheetRef<TurnGenerateComponent>
  ) {
    this.turnForm = this.createForm();
  }

  createForm() : FormGroup {
    return this.formBuilder.group({
      identification: ['', Validators.compose([Validators.required, Validators.maxLength(20), Validators.pattern('[0-9]*')])],
      name: ['', Validators.compose([Validators.required, Validators.maxLength(300)])],
    });
  }

  closeButtonSheet(): void {
    this._bottomSheetRef.dismiss();
  }

  create(event: MouseEvent) : void {
    event.preventDefault();
    event.stopImmediatePropagation();
  }
}
