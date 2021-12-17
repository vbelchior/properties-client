import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * @title Card with multiple sections
 */
@Component({
  selector: `user`,
  template: `
    <mat-card>
      <mat-card-title>Usuário</mat-card-title>
      <mat-stepper orientation="vertical" #stepper>
        <mat-step [stepControl]="firstFormGroup">
          <form [formGroup]="firstFormGroup">
            <ng-template matStepLabel>Fill out your name</ng-template>
            <mat-form-field appearance="fill">
              <mat-label>Name</mat-label>
              <input
                matInput
                placeholder="Last name, First name"
                formControlName="firstCtrl"
                required
              />
            </mat-form-field>
            <div></div>
          </form>
        </mat-step>
        <mat-step [stepControl]="secondFormGroup">
          <form [formGroup]="secondFormGroup">
            <ng-template matStepLabel>Fill out your address</ng-template>
            <mat-form-field appearance="fill">
              <mat-label>Address</mat-label>
              <input
                matInput
                formControlName="secondCtrl"
                placeholder="Ex. 1 Main St, New York, NY"
                required
              />
            </mat-form-field>
            <div></div>
          </form>
        </mat-step>
      </mat-stepper>
    </mat-card>
  `,
  styles: [``],
})
export class UserComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  public userGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.userGroup = this.formBuilder.group({
      name: ['', Validators.required],
      birth: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.email]],
      phone: ['', (Validators.pattern('[- +()0-9]+'), Validators.required)],
      properties: [''],
      cpf: [''],
      locale: [''],
      timezone: [''],
    });
  }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }
}
