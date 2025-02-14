import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], filterString: string, propName: string): any[] {
    if (!value || value.length === 0 || !filterString || !propName) {
      return value;
    }

    return value.filter(
      (item) => item[propName] && item[propName].includes(filterString)
    );
  }

  filterItems(items: any[], filters: any): any[] {
    if (!items || items.length === 0) return [];

    return items.filter((item) => {
      return (
        (!filters.marca || item.marca?.includes(filters.marca)) &&
        (!filters.model || item.model?.includes(filters.model)) &&
        (!filters.generatie || item.generatie?.includes(filters.generatie)) &&
        (!filters.tipCaroserie ||
          item.tipCaroserie?.includes(filters.tipCaroserie)) &&
        (!filters.pretDeLa || item.price >= filters.pretDeLa) &&
        (!filters.pretPanaLa || item.price <= filters.pretPanaLa) &&
        (!filters.anDeLa || item.year >= filters.anDeLa) &&
        (!filters.anPanaLa || item.year <= filters.anPanaLa) &&
        (!filters.combustibil ||
          item.combustibil?.includes(filters.combustibil)) &&
        (!filters.kmDeLa || item.km >= filters.kmDeLa) &&
        (!filters.kmPanaLa || item.km <= filters.kmPanaLa) &&
        (!filters.stareTehnica ||
          item.stareTehnica?.includes(filters.stareTehnica)) &&
        (!filters.eligibilFinantare ||
          item.eligibilFinantare === filters.eligibilFinantare)
      );
    });
  }
}
