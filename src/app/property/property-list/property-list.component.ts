import { Component, OnInit } from '@angular/core';
import { PropertyCardComponent } from '../property-card/property-card.components';
import { CommonModule, NgFor } from '@angular/common';
import { HousingService } from '../../services/housing.service';
import { IProperty } from '../IProperty.interface';
import { ActivatedRoute } from '@angular/router';
import { FilterPipe } from '../../Pipes/filter.pipe';
import { SortPipe } from '../../Pipes/sort.pipe';
import { FormsModule } from '@angular/forms';
import { DownBarComponent } from '../../down-bar/down-bar.component';

@Component({
  selector: 'app-property-list',
  imports: [
    PropertyCardComponent,
    NgFor,
    FilterPipe,
    SortPipe,
    FormsModule,
    CommonModule,
    DownBarComponent,
  ],
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.css',
})
export class PropertyListComponent implements OnInit {
  SellRent = 1;
  properties: Array<IProperty>;
  Car: string = '';
  SearchCar: any;
  SortbyParam = '';
  SortDirection: string = 'asc';
  filter = {
    marca: '',
    model: '',
    generatie: '',
    tipCaroserie: '',
    pretDeLa: null,
    pretPanaLa: null,
    anDeLa: null,
    anPanaLa: null,
    combustibil: '',
    kmDeLa: null,
    kmPanaLa: null,
    stareTehnica: '',
    searchTerm: '',
    eligibilFinantare: false,
  };
  marcas = ['BMW', 'Audi', 'Mercedes', 'Toyota'];
  models = ['X5', 'A4', 'C-Class', 'Corolla'];
  tipuriCaroserie = ['Sedan', 'SUV', 'Hatchback'];
  combustibili = ['Benzină', 'Motorină', 'Hibrid', 'Electric'];
  stariTehnice = ['Nou', 'Rulat', 'Avariat'];

  constructor(
    private route: ActivatedRoute,
    private housingService: HousingService
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.url.toString()) {
      this.SellRent = 2; //MeANS WE ARE ON RENT PROPERTY URL ESLE WE ARE ON BASE URL
    }
    this.housingService.getAllProperties(this.SellRent).subscribe({
      next: (data) => {
        this.properties = data;
        console.log('Data fetched successfully:', data);
        //console.log(this.route.snapshot.url.toString());
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
      complete: () => {
        console.log('Data fetch completed.');
      },
    });
  }
  onCarFiler() {
    this.SearchCar = this.SearchCar;
    console.log('Filters Applied:', this.filter);
  }
  onCityFilterClear() {
    this.SearchCar = '';
    this.Car = '';
  }
  onSortDirection() {
    if (this.SortDirection === 'desc') {
      this.SortDirection = 'asc';
    } else {
      this.SortDirection = 'desc';
    }
  }
}
