import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IProperty } from '../property/IProperty.interface';
import { Observable, of } from 'rxjs';
import { ICars } from '../model/icars';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  constructor(private http: HttpClient) {}

  getAllCities(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:5000/city');
  }

  // getProperty(id: number) {
  //   return this.getAllProperties().pipe(
  //     map((propertiesArray) => {
  //       return propertiesArray.find((p) => p.id === id);
  //     })
  //   );
  // }
  getAllProperties(SellRent: number): Observable<IProperty[]> {
    return this.http
      .get<{ [key: string]: IProperty }>('/assets/properties.json')
      .pipe(
        map((data) => {
          const propertiesArray: Array<IProperty> = [];
          for (const id in data) {
            if (data.hasOwnProperty(id) && data[id].SellRent === SellRent) {
              propertiesArray.push(data[id]);
            }
          }
          return propertiesArray;
        })
      );
  }
  getAllCarsDetails(Marca: string): Observable<ICars[]> {
    return this.http
      .get<{ [key: string]: ICars }>('/assets/properties.json')
      .pipe(
        map((data) => {
          const propertiesArray: Array<ICars> = [];
          for (const id in data) {
            if (data.hasOwnProperty(id) && data[id].marca === Marca) {
              propertiesArray.push(data[id]);
            }
          }
          return propertiesArray;
        })
      );
  }
}
