import { TypeUtil } from '../utils';

export class AddressEntity {
  public id: number;

  public code: string;

  public street: string;

  public number: string;

  public city: string;

  public state: string;

  public country: string;

  public quarter: string;

  public extra: string;

  constructor(json?: any) {
    if (TypeUtil.exists(json)) {
      if (TypeUtil.exists(json.id)) this.id = Number(json.id);
      if (TypeUtil.exists(json.street)) this.street = String(json.street);
      if (TypeUtil.exists(json.number)) this.number = String(json.number);
      if (TypeUtil.exists(json.extra)) this.extra = String(json.extra);
      if (TypeUtil.exists(json.quarter)) this.quarter = String(json.quarter);
      if (TypeUtil.exists(json.code)) this.code = String(json.code);
      if (TypeUtil.exists(json.city)) this.city = String(json.city);
      if (TypeUtil.exists(json.state)) this.state = String(json.state);
      if (TypeUtil.exists(json.country)) this.country = String(json.country);
    }
  }
}
