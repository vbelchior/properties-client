import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { AddressEntity, ViaCep } from '@commons/entities';
import { HttpClient } from '@angular/common/http';

/**
 * @title Card with multiple sections
 */
@Component({
  selector: `user`,
  template: `
    <mat-card>
      <mat-card-title>Usuário</mat-card-title>
      <mat-stepper orientation="vertical" #stepper>
        <mat-step [stepControl]="userGroup">
          <form [formGroup]="userGroup" fxLayout="column">
            <ng-template matStepLabel>Informações pessoais</ng-template>
            <mat-form-field appearance="outline" fxFlex="80">
              <mat-label>Nome</mat-label>
              <input matInput formControlName="name" required />
              <mat-error *ngIf="userGroup.get('name').errors?.required"
                >Nome <strong>é necessário</strong>
              </mat-error>
            </mat-form-field>
            <div class="emailAndPhone">
              <mat-form-field appearance="outline" class="email">
                <mat-label>E-mail</mat-label>
                <input matInput type="email" formControlName="email" />
              </mat-form-field>
              <mat-form-field appearance="outline" class="phone">
                <mat-label>Celular</mat-label>
                <input
                  matInput
                  formControlName="phone"
                  mask="(00) 0000-0000||(00) 0 0000-0000"
                />
                <mat-error *ngIf="userGroup.get('phone').errors?.required"
                  >Celular <strong>é necessário</strong>
                </mat-error>
              </mat-form-field>
            </div>
            <mat-form-field appearance="outline" class="cpf">
              <mat-label>CPF</mat-label>
              <input matInput formControlName="cpf" thNumber />
            </mat-form-field>
          </form>
        </mat-step>
        <mat-step [stepControl]="addressGroup">
          <form fxLayout="column" [formGroup]="addressGroup">
            <ng-template matStepLabel>Endereço</ng-template>
            <div
              fxFlex="100%"
              fxLayout="row"
              fxLayoutAlign="start center"
              fxLayoutGap="16px"
            >
              <mat-form-field fxFlex="20%" appearance="outline">
                <mat-label>CEP</mat-label>
                <input matInput formControlName="code" thCode />
              </mat-form-field>
              <mat-form-field fxFlex="40%" appearance="outline">
                <mat-label>Rua</mat-label>
                <input matInput formControlName="street" />
              </mat-form-field>
              <mat-form-field fxFlex="20%" appearance="outline">
                <mat-label>Número</mat-label>
                <input #number matInput formControlName="number" />
              </mat-form-field>
              <mat-form-field fxFlex="20%" appearance="outline">
                <mat-label>Complemento</mat-label>
                <input matInput formControlName="extra" />
              </mat-form-field>
            </div>
            <div
              fxFlex="100%"
              fxLayout="row"
              fxLayoutAlign="start center"
              fxLayoutGap="16px"
            >
              <mat-form-field fxFlex="30%" appearance="outline">
                <mat-label>Bairro</mat-label>
                <input matInput formControlName="quarter" />
              </mat-form-field>
              <mat-form-field fxFlex="30%" appearance="outline">
                <mat-label>Cidade </mat-label>
                <input matInput formControlName="city" />
              </mat-form-field>
              <mat-form-field fxFlex="20%" appearance="outline">
                <mat-label>Estado</mat-label>
                <mat-select formControlName="state">
                  <mat-option *ngFor="let state of states" [value]="state">{{
                    state
                  }}</mat-option>
                </mat-select>
              </mat-form-field>
              <mat-form-field fxFlex="20%" appearance="outline">
                <mat-label>País</mat-label>
                <input matInput formControlName="country" />
              </mat-form-field>
            </div>
          </form>
        </mat-step>
      </mat-stepper>
    </mat-card>
  `,
  styles: [
    `
      mat-card {
        width: 45%;
      }

      .userGroup {
        display: flex;
        flex-flow: column nowrap;
      }
      div.emailAndPhone {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
      }
      .email {
        flex: 0 0 50%;
      }
      .phone {
        flex: 0 0 45%;
      }
      .cpf {
        flex: 0 0 45%;
      }
    `,
  ],
})
export class UserComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  public userGroup: FormGroup;

  public addressGroup: FormGroup;

  public states: Array<string>;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) {
    this.states = AddressEntity.states;
  }

  public ngOnInit() {
    this.userGroup = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', (Validators.pattern('[- +()0-9]+'), Validators.required)],
      email: ['', [Validators.email]],
      cpf: ['', Validators.required],
      features: [''],
    });

    this.addressGroup = this.formBuilder.group({
      code: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', [Validators.required]],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['Brasil', Validators.required],
      quarter: [''],
      extra: [''],
    });
    this.userGroup.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        map((group) => {
          return {
            name: group.name,
            phone: group.phone,
            email: group.email,
            cpf: group.cpf,
          };
        })
      )
      .subscribe();
    this.addressGroup.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        map((group) => {
          return {
            code: group.code,
            street: group.street,
            number: group.number,
            city: group.city,
            state: group.state,
            country: group.country,
            quarter: group.quarter,
            extra: group.extra,
          };
        })
      )
      .subscribe();
  }

  private searchByCpf(code: string): void {
    const path: string = `https://viacep.com.br/ws/${code}/json`;
    this.httpClient.get<ViaCep>(path).subscribe((json: ViaCep) => {
      this.addressGroup.patchValue({
        street: json.logradouro,
        extra: json.complemento,
        area: json.bairro,
        city: json.localidade,
        state: json.uf,
      });
    });
  }
}
