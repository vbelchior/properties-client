export class BinaryModel {
  public id: number;

  public propertyId: number;

  public name: string;

  public sha1: string;

  public size: number;

  public data: string;

  constructor(json?: any) {
    if (json != undefined && json != null) {
      const keys: Array<string> = Object.keys(json);
      if (keys.includes('id')) this.id = json.id ? Number(json.id) : json.id;
      if (keys.includes('propertyId'))
        this.propertyId = json.propertyId
          ? Number(json.propertyId)
          : json.propertyId;
      if (keys.includes('name'))
        this.name = json.name ? String(json.name) : json.name;
      if (keys.includes('sha1'))
        this.sha1 = json.sha1 ? String(json.sha1) : json.sha1;
      if (keys.includes('size'))
        this.size = json.size ? String(json.size) : json.size;
      if (keys.includes('data'))
        this.data = json.data ? String(json.data) : json.data;
    }
  }
}
