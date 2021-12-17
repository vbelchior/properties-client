export enum DO {
  RENT = 'rent',
  SALE = 'sale',
}

export enum TYPE {
  RESIDENTIAL = 'residential',
  COMMERCIAL = 'commercial',
}

export enum DWELLING {
  ROOM = 'residential',
  HOUSE = 'house',
  LOT = 'lot',
  APARTMENT = 'apartment',
  FARM = 'farm',
}
export class PropertyModel {
  public id: number;

  public userId: number;

  public addressId: number;

  public title: string;

  public do: DO;

  public value: number;

  public type: TYPE;

  public dwelling: DWELLING;

  public description: string;

  public area: number;

  public bedroom: number;

  public bathroom: number;

  public garage: number;

  constructor(json?: any) {
    if (json != undefined && json != null) {
      const keys: Array<string> = Object.keys(json);

      if (keys.includes('id')) this.id = json.id ? Number(json.id) : json.id;

      if (keys.includes('userId'))
        this.userId = json.userId ? Number(json.userId) : json.userId;

      if (keys.includes('addressId'))
        this.addressId = json.addressId
          ? Number(json.addressId)
          : json.addressId;
      if (keys.includes('title'))
        this.title = json.title ? String(json.title) : json.title;

      if (keys.includes('do')) this.do = json.do ? String(json.do) : json.do;
      if (keys.includes('value'))
        this.value = json.value ? Number(json.value) : json.value;
      if (keys.includes('type'))
        this.type = json.type ? String(json.type) : json.type;
      if (keys.includes('dwelling'))
        this.dwelling = json.dwelling ? String(json.dwelling) : json.dwelling;
      if (keys.includes('description'))
        this.description = json.description
          ? String(json.description)
          : json.description;
      if (keys.includes('area'))
        this.area = json.area ? Number(json.area) : json.area;
      if (keys.includes('bedroom'))
        this.bedroom = json.bedroom ? Number(json.bedroom) : json.bedroom;
      if (keys.includes('bathroom'))
        this.bathroom = json.bathroom ? Number(json.bathroom) : json.bathroom;
      if (keys.includes('garage'))
        this.garage = json.garage ? Number(json.garage) : json.garage;
    }
  }
}
