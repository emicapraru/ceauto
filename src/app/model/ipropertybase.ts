export interface IPropertyBase {
  id: number;
  sellRent: number;
  name: string;
  propertyType: string;
  furnishingType: string;
  price: number;
  bhk: number;
  builtArea: number;
  city: string;
  readyToMove: boolean;
  photo?: string;
  estPossessionOn?: string;
  //
  // prename: string;
  // email: string;
  // phone: number;
  // buget: number;
  // varianteAuto: string;
  // cutieViteza: string;
  // regimCondus: string;
  // consideriConsultanta: string;
  // day: string;
  // informatiiUtile: string;
}
