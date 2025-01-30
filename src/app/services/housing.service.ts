import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IProperty } from '../property/IProperty.interface';
import { Observable, of } from 'rxjs';

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
}
