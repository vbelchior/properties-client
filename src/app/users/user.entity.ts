import { AddressEntity } from '@commons/entites';

export class UserEntity {
  public id: number;

  public name: string;

  public phone: number;

  public email: string;

  public secret: string;

  public address: AddressEntity;

  public extra: object;

  constructor(json?: any) {
    if (json != undefined && json != null) {
      const keys: Array<string> = Object.keys(json);
      if (keys.includes('id')) this.id = json.id ? Number(json.id) : json.id;
      if (keys.includes('name'))
        this.name = json.name ? String(json.name) : json.name;
      if (keys.includes('email'))
        this.email = json.email ? String(json.email) : json.email;
      if (keys.includes('secret'))
        this.secret = json.secret ? String(json.secret) : json.secret;
      if (keys.includes('phone'))
        this.phone = json.phone ? Number(json.phone) : json.phone;
    }
  }
}
