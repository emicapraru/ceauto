import { Component, OnInit } from '@angular/core';
import { PropertyCardComponent } from "../property-card/property-card.components";
import { NgFor } from '@angular/common';
import { HousingService } from '../../services/housing.service';
import { IProperty } from '../IProperty.interface';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-property-list',
  imports: [PropertyCardComponent, NgFor],
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.css',
  
})
export class PropertyListComponent  implements OnInit {
  
  SellRent=1;
  properties:Array<IProperty>;
  //properties:IProperty[];

  constructor(private route:ActivatedRoute,private housingService: HousingService) {}

  ngOnInit(): void {
    if(this.route.snapshot.url.toString()){
      this.SellRent=2; //MeANS WE ARE ON RENT PROPERTY URL ESLE WE ARE ON BASE URL
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
  }}