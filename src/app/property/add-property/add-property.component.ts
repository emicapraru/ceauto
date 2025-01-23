import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HousingService } from '../../services/housing.service';
import { IPropertyBase } from '../../model/ipropertybase';
@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  standalone: true,
  styleUrls: ['./add-property.component.css'],
  imports: [FormsModule, NgIf, CommonModule, FormsModule],
})
export class AddPropertyComponent implements OnInit {
  [x: string]: any;
  @ViewChild('Form') addPropertyForm: NgForm;

  propertyView: IPropertyBase = {
    // id: null,
    // name: '',
    // price: null,
    //  sellRent: null,
    // propertyType: null,
    //  furnishingType: null,
    // bhk: null,
    //  builtArea: null,
    city: '',
    id: 0,
    sellRent: 0,
    name: '',
    propertyType: '',
    furnishingType: '',
    price: 0,
    bhk: 0,
    builtArea: 0,
    readyToMove: false,
  };
  constructor(private router: Router, private housingService: HousingService) {}
  cityList: string[];

  ngOnInit() {
    // setTimeout is used because of NgOnInit lifycicle difference between Form; 1000 for rending a lot of components for form if they are many in the future
    // template driven forms are asyncronoes and reactive forms are syncronos
    setTimeout(() => {
      this.addPropertyForm.controls['Name'].setValue('Default Value');
    }, 1000);

    this.housingService.getAllCities().subscribe((data: any) => {
      console.log(data);
      this.cityList = data;
    });
  }

  onBack() {
    this.router.navigate(['/']);
  }

  onSubmit(Form: NgForm) {
    console.log('Congrats');
    console.log(this.addPropertyForm);
  }
}
