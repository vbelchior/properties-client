import { Component, OnInit } from '@angular/core';
import { AddressModel } from './address.model';
import { PropertyModel } from './property.model';

/**
 * @title Card with multiple sections
 */
@Component({
  selector: `property`,
  template: `
    <mat-card class="example-card">
      <mat-card-header>
        <div mat-card-avatar class="example-header-image"></div>
        <mat-card-title>Shiba Inu</mat-card-title>
        <mat-card-subtitle>Dog Breed</mat-card-subtitle>
      </mat-card-header>
      <img
        mat-card-image
        src="https://material.angular.io/assets/img/examples/shiba2.jpg"
        alt="Photo of a Shiba Inu"
      />
      <mat-card-content>
        <div>
          <h3>{{ property.title }}</h3>
          <div>
            <mat-icon>place</mat-icon>{{ address.city }}, {{ address.state }}
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .example-card {
        max-width: 300px;
      }

      .example-header-image {
        background-image: url('https://material.angular.io/assets/img/examples/shiba1.jpg');
        background-size: cover;
      }
    `,
  ],
})
export class PropertyComponent implements OnInit {
  public property: PropertyModel;
  public address: AddressModel;

  constructor() {
    this.property = new PropertyModel();
    this.address = new AddressModel();
    this.property.title = 'Alugo casa no centro de BH';
    this.address.city = 'Belo Horizonte';
    this.address.state = 'Minas Gerais';
  }

  ngOnInit(): void {}
}
