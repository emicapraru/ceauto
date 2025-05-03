import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(
    items: any[],
    {
      searchValue,
      propName,
      filters,
    }: { searchValue: string; propName: string; filters: any }
  ): any[] {
    if (!items || items.length === 0) return [];

    const {
      marca,
      model,
      generatie,
      tipCaroserie,
      pretDeLa,
      pretPanaLa,
      anDeLa,
      anPanaLa,
      combustibil,
      kmDeLa,
      kmPanaLa,
      stareTehnica,
      eligibilFinantare,
    } = filters;

    return items.filter((item) => {
      const valueToCheck = item[propName]?.toString().toLowerCase();
      const matchesSearch =
        !searchValue || valueToCheck?.includes(searchValue.toLowerCase());

      const matchesAdvanced =
        (!marca || item.marca?.toLowerCase().includes(marca.toLowerCase())) &&
        (!model || item.model?.toLowerCase().includes(model.toLowerCase())) &&
        (!generatie ||
          item.generatie?.toLowerCase().includes(generatie.toLowerCase())) &&
        (!tipCaroserie ||
          item.tipCaroserie
            ?.toLowerCase()
            .includes(tipCaroserie.toLowerCase())) &&
        (!pretDeLa || item.price >= pretDeLa) &&
        (!pretPanaLa || item.price <= pretPanaLa) &&
        (!anDeLa || item.year >= anDeLa) &&
        (!anPanaLa || item.year <= anPanaLa) &&
        (!combustibil ||
          item.combustibil
            ?.toLowerCase()
            .includes(combustibil.toLowerCase())) &&
        (!kmDeLa || item.km >= kmDeLa) &&
        (!kmPanaLa || item.km <= kmPanaLa) &&
        (!stareTehnica ||
          item.stareTehnica
            ?.toLowerCase()
            .includes(stareTehnica.toLowerCase())) &&
        (!eligibilFinantare || item.eligibilFinantare === eligibilFinantare);

      return matchesSearch && matchesAdvanced;
    });
  }
}
