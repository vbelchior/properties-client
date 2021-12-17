export class AddressModel {
  public id!: number;

  public code!: number;

  public street!: string;

  public number!: number;

  public city!: string;

  public state!: string;

  public country!: string;

  public quarter?: string;

  public extra?: string;

  constructor(json?: any) {
    if (json != undefined && json != null) {
      const keys: Array<string> = Object.keys(json);
      if (keys.includes('id')) this.id = json.id ? Number(json.id) : json.id;
      if (keys.includes('code'))
        this.code = json.code ? Number(json.code) : json.code;
      if (keys.includes('street'))
        this.street = json.street ? String(json.street) : json.street;
      if (keys.includes('number'))
        this.number = json.number ? Number(json.number) : json.number;
      if (keys.includes('city'))
        this.city = json.city ? String(json.city) : json.city;
      if (keys.includes('state'))
        this.state = json.state ? String(json.state) : json.state;
      if (keys.includes('country'))
        this.country = json.country ? String(json.country) : json.country;
      if (keys.includes('quarter'))
        this.quarter = json.quarter ? String(json.quarter) : json.quarter;
      if (keys.includes('extra'))
        this.extra = json.extra ? String(json.extra) : json.extra;
    }
  }
}
